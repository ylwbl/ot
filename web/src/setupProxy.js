const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/ws', {
      target: 'http://localhost:9000', // 测试环境
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/ws': ''
      }
    })
  );
};

