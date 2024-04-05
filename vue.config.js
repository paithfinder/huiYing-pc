// 使用vue-cli创建出来的vue工程, Webpack的配置是被隐藏起来了的
// 如果想覆盖Webpack中的默认配置,需要在项目的根路径下增加vue.config.js文件
module.exports = {
  devServer: {
    port: 8999, // 端口号的配置
    open: true, // 自动打开浏览器
    proxy: {
      '/api/': {
        target: 'http://47.108.168.173:8081/', // 你请求的第三方接口
        changeOrigin: true /* 在本地会创建一个虚拟服务端，然后发送请求的数据，        并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题 */,
        pathRewrite: {
          // 路径重写，
          /* 替换target中的请求地址，比如请求 /api/some_endpoint，它会被代理到 http://47.108.168.173:8081/some_endpoint */
          '^/api/': ''
        }
      }
    }
  }
}
