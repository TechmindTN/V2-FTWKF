const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://39bb-197-14-10-36.eu.ngrok.io',
      changeOrigin: true,
    })
  );
};