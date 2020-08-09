const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

//压缩css   optimize-css-assets-webpack-plugin
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //详细loader配置
            {
                test: /\.css$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                   {
                       loader: 'postcss-loader',
                       options: {
                           ident: 'postcss',
                           plugins: () => [
                               require('postcss-preset-env')()
                           ]
                       }
                   }

                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    outputPath: 'imgs',
                    esModule: false
                }
            },
        ]
    },

    plugins: [
        new htmlWebpackPlugin(
            {
                template: './src/index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            }
        ),
        new miniCssExtractPlugin(
            {
                filename: 'css/built.css'
            }
        ),
        new uglifyJsPlugin(),
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}