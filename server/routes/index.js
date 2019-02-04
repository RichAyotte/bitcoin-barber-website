/**
 * @overview    Routes
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-01 20:49:07
 * @license     GNU GPL-3.0
 * @flow
 */

const koaBodyParser = require('koa-bodyparser')
const KoaRouter = require('koa-router')

const router = new KoaRouter()

const bitcoinaverage = require('./bitcoinaverage')
const contactForm = require('./contact-form')
const status = require('./status')
const subscribe = require('./subscribe')

router.get('/api/bitcoinaverage', bitcoinaverage)
router.post('/api/contact-form', contactForm)
router.get('/api/status', status)
router.post('/api/subscribe', subscribe)

/**
 * Export array of middleware
 * @type {Array}
 */
module.exports = [
	koaBodyParser()
	, router.routes()
	, router.allowedMethods()
]
