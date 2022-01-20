module.exports = {
  // 暂时关闭eslint
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/apis': {
        // target: 'http://192.168.120.150:50000',
        target: "https://scan.alaya.network/",
        secure: false,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': '/browser-server'
        }
      }
    }
  },
  transpileDependencies:['vue-particles']
}
