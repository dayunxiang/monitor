var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: "cheap-eval-source-map",
    entry: './app/index.js',
    output: {
        path: path.join(__dirname, "build"),
        filename: "app.build.js",
        publicPath: '/',
        chunkFilename: "app.build.[name].js",
    },
    module: {
        rules: [{
            test: /\.js?$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env', 'react', 'stage-1'],
                plugins: [
                    //"transform-runtime",
                    //["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }], // `style: true` 会加载 less 文件
                    ["transform-decorators-legacy"]
                ],
                cacheDirectory: true,

            },
        //       options: {
        //       presets: ['env']
        // }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader',


        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: path.join("img", "[name].[hash:5].[ext]")
            }
        },
        {
            test: /\.(woff|woff2|svg|eot|ttf)$/,
            loader: 'file-loader',
            query: {
                name: ("font/[name].[hash:5].[ext]")
            }
        }
        ]
    },
    // "plugins": [
    //     ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
    //   ]

    // resolve:{
    //     extensions: ['', '.js', '.jsx', '.json', '.css'],
    //        root: ['./node_modules']
    //   },
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify(true)
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: "超市管理系统",
            template: "./index.html",
            favicon: "./favicon.png"
        })

    ],
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8085',
                // pathRewrite: {'^/api' : 'api'},
                secure: false,
                changeOrigin: true,
            }
        },
    // historyApiFallback: true,
    //   hot: true,
    // inline: true,
    // stats: { colors: true },
    //      port: 8080,
    // host: 'localhost'
    // contentBase: "/", //本地服务器所加载的页面所在的目录
    // colors: true, //终端中输出结果为彩色
    // historyApiFallback: true, //不跳转÷
    // inline: true, //实时刷新
    // hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
};