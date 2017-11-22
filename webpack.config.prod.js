const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.config.common');

module.exports = merge.smart(common, {
  entry: [
    './src/app.js',
  ],

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },

  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: { ecma: 8 },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin('[name].css'),
  ],
});
