const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // devServer: {
  //   //配置代理跨域
  //   proxy: {
  //     '/dev-api': {
  //       type: 'post',
  //       target: 'http://gmall-h5-api.atguigu.cn',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: { '^/dev-api': '' }
  //     }
  //   },
  // },
})
