var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const cleanWebpackPlugin = require('clean-webpack-plugin');
const progressbarWebpack = require('progress-bar-webpack-plugin');

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    devtool: "eval",
    // entry:'./app/index.js',
    entry: {
        app: './app/index.js',
        vendors: ['react',
            'react-dom',
            'redux',
            'react-redux'],
        ol: 'ol',
        echarts: "echarts",
        myAntd: './app/components/Antd.js',
        polyfill: 'babel-polyfill'
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "js/[name].[chunkHash:5].js",
        publicPath: '',
        chunkFilename: "js/[name].[chunkHash:5].js",
    },
    module: {
        rules: [{
            test: /\.js?$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env', 'react', 'stage-1'],
                plugins: [
                    "transform-runtime",
                    //["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }], // `style: true` 会加载 less 文件
                    ["transform-decorators-legacy"]
                ]
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader!postcss-loader!sass-loader"
            })
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: ("img/[name].[hash:5].[ext]")
            }
        }, {
            test: /\.(woff|woff2|svg|eot|ttf)$/,
            loader: 'file-loader?',
            options: {
                name: ("font/[name].[hash:5].[ext]"),
                publicPath: "../"
            }
        }]
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
            // 'process.env.NODE_ENV': JSON.stringify('production'),
            DEV: JSON.stringify(false),
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: true,
            // 删除所有的注释
            comments: true,
            output: {
                comments: false, // remove all comments
            },
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: false,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
        new HtmlWebpackPlugin({
            title: "超市管理系统",
            template: "./index.html",
            favicon: "./favicon.png"
        }),
        new ExtractTextPlugin("css/[name].[chunkHash:5].css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments:{removeAll: true}},
            canPrint: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['myAntd', 'ol','echarts', 'vendors', 'polyfill'],
            minChunks: 2
        }),
        new cleanWebpackPlugin([path.join(__dirname, "build")]), // 打包前清空打包文件
        new progressbarWebpack() //显示进度
    ],
};