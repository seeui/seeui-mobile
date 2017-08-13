/**
 * @file webpack 开发配置
 * @author cgzero(cgzero@cgzero.com)
 */

import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import commonConf from './webpack.common.babel';

// 获取本地ip地址
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();

    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i = 0;i < iface.length; i++){
               var alias = iface[i];

               if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                     return alias.address;
               }
          }
    }
}

export default merge(commonConf, {
    plugins: [
        // 生成 html 文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../example/index.html'),
            // alwaysWriteToDisk: true,
            inject: true
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        compress: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 8484,
        publicPath: '/dist/',
        setup(app) {
            // 根目录展示 example 首页
            app.all('/', (req, res, next) => {
                req.url = '/dist/';
                next();
            });
        }
    },
    devtool: 'source-map'
});
