let path = require('path')
//安装html-webpack-plugin: npm install html-webpack-plugin
let htmlwebpackplugin = require('html-webpack-plugin')
module.exports = {
    //入口文件
    entry:'./src/index.js',
    output:{
        //输出文件名称
        filename:"bundle.js",
        //输出的路径  绝对路径
        path:path.resolve(__dirname,'dist'),
    },
    //开发模式
    mode:'development',
    //loader的配置
    module:{
        //对某个格式的文件进行转换
        rules:[
            {
                test:/\.css$/,
                use:[
                    //use数组里面loader顺序是从下到上，逆序执行
                    //将js的样式内容插入到style标签
                    "style-loader",
                    //将css内转换为js
                    'css-loader'
                ]
            },
            {
                //匹配图片文件
                test:/\.png|gif|jpg$/,
                loader:'url-loader',
                //图片小于8k，base64处理，优点：减少请求数量，缺点：体积更大
                options:{
                    limit:8*1024,
                    module:false,
                    //图片打包名：[hash:10]:取图片hash的前10位，[ext]:取图片的扩展名
                    name:'[hash:5].[ext]'
                }
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            }

        ]
    },
    // plugins配置
    plugins:[
        new htmlwebpackplugin({
            template:'./src/index.html'
        })
    ],
    devServer:{
        //项目构建路径
        contentBase:path.resolve(__dirname,"dist"),
        //启动gzip压缩
        compress:true,
        //端口号
        port:3000,
        //自动打开浏览器
        open:true
    }
  

}

//cnpm install url-loader html-loader --save-dev
//cnpm install
//cnpm install file-loader
//webpack
//热加载
//cnpm install webpack-dev-server -g全局安装
//cnpm install
//webpack-dev-server