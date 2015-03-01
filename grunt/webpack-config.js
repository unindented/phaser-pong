'use strict';

var webpack = require('webpack');

module.exports = function (options) {
  return {
    entry: './src/index.js',

    output: {
      path: './dist/',
      filename: 'index.js'
    },

    resolve: {
      modulesDirectories: [
        'src/',
        'res/',
        'web_modules',
        'node_modules'
      ]
    },

    resolveLoader: {
      modulesDirectories: [
        'loaders',
        'web_modules',
        'node_modules'
      ]
    },

    module: {
      noParse: [
        /node_modules\/phaser\/.*$/
      ],

      loaders: [
        {
          test: /\.(png|svg|html|xml)$/,
          exclude: /node_modules/,
          loader: 'file?name=[name].[ext]'
        },
        {
          test: /\.ejs$/,
          exclude: /node_modules/,
          loader: 'file?name=[name]!package'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        },
        {
          test: /node_modules\/phaser\/build\/.*\.js$/,
          loader: 'imports?this=>window,exports=>undefined!exports?Phaser'
        }
      ]
    },

    package: options.package,

    progress: true,

    stats: {
      colors: true,
      modules: true,
      reasons: true
    }
  };
};
