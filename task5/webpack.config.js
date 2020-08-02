//resolve用于凭借绝对路劲的方法
const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

//压缩css   optimize-css-assets-webpack-plugin
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//设置node.js环境变量
// process.env.NODE_ENV = 'development';


module.exports = {
    //webpack配置
    
    //入口起点
    // entry: './src/index.js',
    //将多个js文件合并成一个js文件
    entry: [
        './src/index.js',
        './src/a.js',
        './src/b.js'
    ],

    output: {
        //输出文件名
        filename: 'js/built.js',
        //输出路径
        //__dirname是nodejs的变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname,'build')
    },

    module: {
        rules: [
            //详细loader配置
            {
                test: /\.css$/,
                use: [
                    //use数组中loader执行顺序：右——>左，下——>上
                    //创建style标签，将js中的样式资源插入进行，添加到head中生效
                    // 'style-loader',

                    //miniCssExtractPlugin.loader提取css为单独文件
                    //此处若写miniCssExtractPlugin.loader,会出现图片加载出错（页面提示找不到图片）
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },

                    //将css文件编程common.js模块加载js中，里面的内容是样式字符串
                    'css-loader',

                    /*
                    css兼容性处理：postcss ——> postcss-loader postcss-preset-env
                    */
                   //配置写法：
                   //loader的默认配置'postcss-loader',
                   //修改loader的配置
                   {
                       loader: 'postcss-loader',
                       options: {
                           ident: 'postcss',
                           plugins: () => [
                            /*
                            postcss插件,此插件帮助postcss找到package.json中browserslist里面的配置，通过配置加载指定css兼容性样式
                            "browserslist": {
                                设置node环境变量，process.env.NODE_ENV = 'development';
                                "development": [
                                  "last 1 chrome version",
                                  "last 1 firefox version",
                                  "last 1 safari version"
                                ],
                                默认看生产环境
                                "production": [
                                  ">0.01%",
                                  "not dead",
                                  "not op_mini all"
                                ]
                              }
                            */
                               require('postcss-preset-env')()
                           ]
                       }
                   }

                ]
            },
            {
                //处理不了html中直接引用的图片
                test: /\.(jpg|png|gif)$/,
                //下载url-loader和file-loader
                loader: 'url-loader',
                options: {
                    //图片大小下雨8kb，就会被base64处理
                    //有点：减少请求数量（减轻服务器压力）
                    //缺点：图片体积更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    outputPath: 'imgs'
                }
            },
        ]
    },

    plugins: [
        //详细plugins的配置
        //功能：默认会创建一个空的html，自动引入打包输出的所有资源（js，css）
        //需求：需要有结构的html文件
        new htmlWebpackPlugin(
            {
                ///复制./src/index.html文件，并自动引入所有资源（js，css）
                template: './src/index.html',
                //压缩html代码
                minify: {
                    //移除空格
                    collapseWhitespace: true,
                    //移除注释
                    removeComments: true
                }
            }
        ),
        new miniCssExtractPlugin(
            {
                filename: 'css/built.css'
            }
        ),
        //压缩js文件，也可以使用producttion生产模式，生产模式下自动压缩js文件
        new uglifyJsPlugin(),
        new optimizeCssAssetsWebpackPlugin()
    ],

    //模式
    mode: 'development',
    // mode: 'production'

}