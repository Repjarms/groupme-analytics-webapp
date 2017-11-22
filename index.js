require('dotenv').config({ silent: true });
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const api = require('./routes/api');

const app = express();
app.use('/api', api);

const config = require('./webpack.config.dev.js');

const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    reload: true,
  }));
} else {
  app.use(express.static(`${__dirname}/dist`));
}

const PORT = 3000;

app.listen(PORT, () => {
  console.log('example app listening on port %s', PORT);
});
