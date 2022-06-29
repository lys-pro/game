// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const { name } = require('./package')
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 8888 // TODO: get this variable from setting.ts
const mockServerPort = 8888 // TODO: get this variable from setting.ts
const title = '小游戏' // TODO: get this variable from setting.ts

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: process.env.NODE_ENV != 'development',
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    progress: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // [process.env.VUE_APP_BASE_API]: {
      //     target: 'http://192.168.55.211/api/',
      //     changeOrigin: true, // needed for virtual hosted sites
      //     ws: true, // proxy websockets
      //     pathR        ewrite: {
      //         ['^' + process.env.VUE_APP_BASE_API]: ''
      //     }
      // }
      '/hrpapi': {
        // target: 'http://192.168.1.39:8089', // 尹阳
        // target: 'http://192.168.1.22:8089', // 田俊豪
        // target: 'http://z84wb7.natappfree.cc', // 罗铭
        // target: 'http://192.168.1.8:8089', // 蒋伟
        // target: 'http://ijv25b.natappfree.cc/', // 蒋伟
        target: 'http://220.196.249.17:8084/hrpapi', // 线上,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/hrpapi': '',
        },
      },
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
 
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/styles/_variables.scss'), path.resolve(__dirname, 'src/styles/_mixins.scss')],
    },
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', title)

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-eval-source-map'))

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
      {
        format: 'compact',
      },
    ])
  
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
         
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
}
