/*
 * @Description: 
 * @Author: eddie
 * @Date: 2019-12-18 18:10:08
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)

module.exports = env => {

  // 解析path参数的文件名
  const _filename = env.path.slice(env.path.lastIndexOf('/') + 1, env.path.length)

  return {
    entry: {
      [_filename]: resolve(`src/${env.path}/demo`)
    },
    output: {
      path: resolve('dist/' + _filename),
      filename: '[name].[hash].js'
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        // ES6+语法转ES5
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/transform-runtime']
            }
          }
        }
      ]
    },
    plugins: [
      // 生成html引入打包后的入口js
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolve(`src/${env.path}/demo/index.html`),
      })
    ],
    devtool: 'source-map',
    // 开发服务配置
    devServer: {
      // 配置 服务器文件根目录 (用于访问本地文件)
      // contentBase: path.join(__dirname, 'public'),
      // 服务监听的地址
      host: '127.0.0.1',
      // 监听端口
      port: 8888,
      // 模块热更新
      hot: true,
      // URL路由重定向
      historyApiFallback: {
        rewrites: [
          // { from: /^\/demo1/, to: '/demo1.html' },
        ]
      },
      // 配置是否启用 gzip 压缩
      compress: true,
      // 自动打开默认浏览器
      open: true
    },
  }
}
