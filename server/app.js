/**
 * @overview    Koa app
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-09 17:33:45
 * @license     GNU GPL-3.0
 * @flow
 */

const path = require('path')
const Koa = require('koa')
const app = new Koa()

const routesMiddleware = require(`./routes`)
routesMiddleware.forEach(app.use, app)

global.appRoot = path.resolve(__dirname)

/**
 * Export Koa app
 * @type {[type]}
 */
module.exports = app
