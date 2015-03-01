'use strict';

var webpack = require('webpack');
var config = require('./webpack-config');

module.exports = function (grunt, options) {
  var common = config(options);

  return {
    options: common,

    build: {
      debug: true,
      devtool: 'eval',

      failOnError: true,

      plugins: [
        new webpack.DefinePlugin({DEBUG: true})
      ]
    },

    optim: {
      debug: false,
      devtool: null,

      failOnError: true,

      plugins: [
        new webpack.DefinePlugin({DEBUG: false}),

        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
      ]
    },

    watch: {
      debug: true,
      devtool: 'eval',

      failOnError: false,

      watch: true,
      keepalive: true,

      plugins: [
        new webpack.DefinePlugin({DEBUG: true})
      ]
    }
  };
};
