'use strict';

module.exports = {
  'build': ['webpack:build'],
  'optim': ['webpack:optim'],
  'watch': ['webpack:watch'],
  'serve': ['webpack-dev-server:start'],

  'clear': [
    'clean'
  ],

  'default': ['build']
};
