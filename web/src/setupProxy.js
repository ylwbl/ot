const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/yst-tms', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      changeOrigin: true,
      secure: false
    }),
    createProxyMiddleware('/yst-pur', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      changeOrigin: true,
      secure: false
    }),
    createProxyMiddleware('/yst-inv', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      changeOrigin: true,
      secure: false
    }),
    createProxyMiddleware('/yst-b2c', {
      target: process.env.REACT_APP_SERVER_HOST, // 测试环境
      changeOrigin: true,
      secure: false
    }),
    createProxyMiddleware('/yst-order', {
      // target: process.env.REACT_APP_SERVER_HOST, // 测试环境
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      // target: 'http://192.168.1.18:8081',//jia
      // target: 'http://192.168.1.165:8081', //wang
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yst-order': ''
      }
    }),
    createProxyMiddleware('/yst-fin', {
      // target: process.env.REACT_APP_SERVER_HOST, // 测试环境
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      // target: 'http://192.168.1.172:8080', //dong
      // target: 'http://192.168.1.71:8080', //昊阳
      changeOrigin: true,
      secure: false
    }),
    createProxyMiddleware('/coordinator', {
      //      target: 'http://ec2-161-189-162-244.cn-northwest-1.compute.amazonaws.com.cn:30032', // 压测环境
      target: 'https://nrp-dev.elitescloud.com', // 开发环境
      changeOrigin: true,
      secure: false
    }),
    createProxyMiddleware('/yst-workflow', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      changeOrigin: true,
      secure: false
      // pathRewrite: {
      //   '^/yst-workflow': '/yst-workflow-demo'
      // }
    }),
    // createProxyMiddleware('/oauth2', {
    //   target: 'https://nrp-dev.elitescloud.com', // 测试环境
    //   changeOrigin: true,
    //   secure: false
    // }),
    createProxyMiddleware('/sync-svr', {
      // target: 'http://192.168.0.210:9001', // 测试环境
      // target: 'http://106.14.161.157:30312', // 测试环境
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/sync-svr': '/yst/sync-svr'
      }
    }),
    createProxyMiddleware('/auth', {
      // target: 'http://192.168.0.210:9001', // 测试环境
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      // target: 'http://localhost:9001', // 本地
      changeOrigin: true,
      secure: false
      // pathRewrite: {
      //   '^/auth': ''
      // }
    }),
    // 系统域
    createProxyMiddleware('/yst-system', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      // target: 'http://localhost:9010', // 本地
      changeOrigin: true,
      secure: false
      // pathRewrite: {
      //   '^/yst-system': ''
      // }
    }),
    createProxyMiddleware('/yst-metadata', {
      target: 'http://106.14.161.157:30088', // 测试环境
      // target: 'http://localhost:9010', // 本地
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yst-metadata': ''
      }
    }),
    createProxyMiddleware('/yst-infoschema', {
      target: 'http://106.14.161.157:30098', // 测试环境
      // target: 'http://localhost:9010', // 本地
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/yst-infoschema': ''
      }
    }),
    // 元数据域
    createProxyMiddleware('/yst-meta', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      // target: 'http://localhost:9010', // 本地
      changeOrigin: true,
      secure: false
      // pathRewrite: {
      //   '^/yst-system': ''
      // }
    }),
    // 数据库结构域
    createProxyMiddleware('/yst-infoschema', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      // target: 'http://localhost:9010', // 本地
      changeOrigin: true,
      secure: false
      // pathRewrite: {
      //   '^/yst-system': ''
      // }
    }),
    createProxyMiddleware('/yst-support', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      // target: 'http://172.16.4.30:8080', //本地
      changeOrigin: true,
      secure: false
    }),
    createProxyMiddleware('/yst-sale', {
      target: 'https://nrp-dev.elitescloud.com', // 测试环境
      changeOrigin: true,
      secure: false
      // pathRewrite: {
      //   '^/yst-sale': ''
      // }
    })
  );
};

/**
 * 测试环境swagger: http://192.168.1.50:8080/yst-b2c/doc.html
 * 注意修改target后需要重新yarn start
 *     createProxyMiddleware('/yst-tms', {
      target: 'http://26dcc524.cpolar.cn', // 测试环境
      changeOrigin: true, //跨域
      secure: false // 校验https证书
      // pathRewrite: { '': '' },
      // pathRewrite: {
      // '^/yst-fc': ''
      // }
    }),
 */
