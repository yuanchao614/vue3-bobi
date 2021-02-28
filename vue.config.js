module.exports = {
  devServer: {
      proxy: {
          '/': {
              target: 'http://localhost:3000',  //  重新映射的新地址 
              // port: 3000,
              ws: true,  // 是否启用websockets
              secure: false,
              changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              // pathRewrite: {'^/': '/'} // 去掉接口地址中的api字符串
          }
          }
}
}