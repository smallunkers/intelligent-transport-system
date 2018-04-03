let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCss = new ExtractTextPlugin("css/[name].css");//这里的参数是配置编译后的css路径和文件名,相对于output里的path选项
// let CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
let publicSrcPath = './public/src';

let utils = require('./utils');
let webpackBaseConfig  = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        main: [path.resolve(__dirname,  publicSrcPath+'/main.js'),hotMiddlewareScript]
    },
    externals: {
        "BMap": "BMap"
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'moment': "moment/min/moment-with-locales.min.js",
            '@': path.resolve(__dirname, publicSrcPath),
            'src': path.resolve(__dirname,publicSrcPath),
            'assets': path.resolve(__dirname, publicSrcPath+'/assets'),
            'components': path.resolve(__dirname,publicSrcPath+ '/components'),
            'views': path.resolve(__dirname, publicSrcPath+'/views'),
            'styles': path.resolve(__dirname, publicSrcPath+'/styles'),
            'api': path.resolve(__dirname, publicSrcPath+'/api'),
            'utils': path.resolve(__dirname, publicSrcPath+'/utils'),
            'store': path.resolve(__dirname, publicSrcPath+'/store'),
            'router': path.resolve(__dirname, publicSrcPath+'/router'),
            'vendor': path.resolve(__dirname, publicSrcPath+'/vendor'),
            'static': path.resolve(__dirname, publicSrcPath+'/static'),
            'fonts':path.resolve(__dirname, publicSrcPath+"/assets/custom-theme/fonts"),
            'img': path.resolve(__dirname,publicSrcPath+'/assets/img')
        }
    },
    module: {
        noParse: [/moment-with-locales/],
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    loaders:utils.cssLoaders({
                        sourceMap:true,
                        extract: false
                    })
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015',
                exclude: /node_modules/
            },
            //.css 文件使用 style-loader 和 css-loader 来处理
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            {
                test: /\.stylus$/,
                exclude: /node_modules/,
                loader:extractCss.extract(['css','stylus'])
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: path.resolve(__dirname,publicSrcPath,'/icons'),
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=8192',
                exclude: path.resolve(__dirname,publicSrcPath,'/icons')
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    devtool:  '#source-map',
    plugins: [
        // new webpack.BannerPlugin("Copyright Closeli Technology Co., Ltd."),//在这个数组中new一个就可以了
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(__dirname, publicSrcPath+'/index.html'),
            inject: true,
            chunks: ['main']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
Object.keys(webpackBaseConfig.entry).forEach(function (name) {
    let extras = ['webpack-hot-middleware/client?reload=1'];
    webpackBaseConfig.entry[name] = extras.concat(webpackBaseConfig.entry[name]);
});

module.exports = webpackBaseConfig;