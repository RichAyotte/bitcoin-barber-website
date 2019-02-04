/**
 * @overview    Koa entry point
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-01 20:20:45
 * @license     GNU GPL-3.0
 */

const config = require('config')
const consola = require('consola')
const {
	Nuxt
	, Builder
} = require('nuxt')

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
const app = require('./app')

nuxtConfig.dev = !(app.env === 'production')

const main = async () => {
	// Instantiate nuxt.js
	const nuxt = new Nuxt(nuxtConfig)

	// Build in development
	if (nuxtConfig.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	}

	app.use(ctx => {
		ctx.status = 200

		return new Promise((resolve, reject) => {
			ctx.res.on('close', resolve)
			ctx.res.on('finish', resolve)
			nuxt.render(ctx.req, ctx.res, promise => {
				// nuxt.render passes a rejected promise into callback on error.
				promise
				.then(resolve)
				.catch(reject)
			})
		})
	})

	const host = config.location.ip || config.location.hostname
	const {port} = config.location

	app.listen(port, host)
	consola.ready({
		message: `Server listening on http://${host}:${port}`
		, badge: true
	})
}

main()
