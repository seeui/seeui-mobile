/**
 * @file webpack 开发配置
 * @author cgzero(cgzero@cgzero.com)
 */

import path from 'path';
import webpack from 'webpack';
import nib from 'nib';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    // 页面入口文件配置
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, '../example/index.js')
    ],
    // output 项告诉 webpack 怎样存储输出结果以及存储到哪里
    output: {
        // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        // path 仅仅告诉 Webpack 结果存储在哪里
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:8].js',
        // 构建后在 html 里的路径，一般也是用这个来指定上线后的cdn域名
        // http://webpack.github.io/docs/configuration.html#output-publicpath
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.html(\?.*)?$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'stylus-loader?paths=node_modules&resolve url&include css'],
                    // 覆盖上面的publicPath，这里用了相对路径，专门针对字体和背景图片的加载（暂时的方案）
                    // 因为如果用 {后端传的静态资源地址}/mobile/dist/ 则解析不了
                    // 因为使用了 ExtractTextPlugin 将 css 拆出来了，所以无法获取 runtime 中的的 publicPath
                    // https://github.com/webpack-contrib/sass-loader/issues/121
                    publicPath: './'
                })
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: ['url-loader?limit=100000&name=img/[name].[hash:8].[ext]']
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: ['file-loader?name=font/[name].[hash:8].[ext]']
            },
            {
                test: /\.md(\?.*)?$/,
                loader: ['html-loader', 'markdown-loader']
            }
        ]
    },
    plugins: [
        // stylus 引入 nib 库
        // 文档：http://tj.github.io/nib/
        // 代码：https://github.com/tj/nib
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    'use': [nib()],
                    // ~ resolves to node_modules
                    'import': ['~nib/lib/nib/index.styl']
                }
            }
        }),
        // 将 css 从 js 抽取出来，不杂糅在 js 中
        new ExtractTextPlugin('[name].[hash:8].css')
    ]
};

