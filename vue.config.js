const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //配置代理跨域
    proxy: {
      '/dev-api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/dev-api': '' }
      }
    },
  },
})
