var http = require('http');
var express = require('express');
var path = require('path');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(webpackConfig);
var middleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
})
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/:appName', function (req, res) {
  var result = '';
  var htmlPath = path.join(__dirname, webpackConfig.output.path + req.params.appName + '/index.html');
  console.log(htmlPath);
  try {
    result = middleware.fileSystem.readFileSync(htmlPath);
  } catch (err) {
    result = err.toString();
  }
  res.write(result);
  res.end();
})