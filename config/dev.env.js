'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: 'development',
  // BASE_API: 'https://nei.netease.com/api/apimock-v2/e87739b244ae3706efa082ed6c8070b0'
})
