/**
 * Created by qinlifang on 2017/7/4.
 */
'use strict';
const env       = process.env.NODE_ENV || 'development';
const configDefault   = require('./config.default');
const configLocal = require('./config.local');
const configProd = require('./config.prod');

let configs = {
  development: configLocal,
  production: configProd
};

let config = configs[env];
if (config === undefined) {
  config = configLocal
}

module.exports = config
module.exports = Object.assign(config, configDefault);
