const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭语法检查
  devServer: {
    proxy: {
      '/api': {
        //目标服务器的url
        target: 'http://gmall-h5-api.atguigu.cn',
        ws: true,
        changeOrigin: true
      }
    }
  }

})
