const config = require('config')
const nodeExternals = require('webpack-node-externals')
const rucksackCss = require('rucksack-css')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const pkg = require('./package')

module.exports = {
	mode: 'universal'

	/*
	 ** Headers of the page
	 */
	, head: {
		title: `Richard Ayotte`
		, meta: [
			{
				charset: 'utf-8'
			}
			, {
				name: 'viewport'
				, content: 'width=device-width, initial-scale=1'
			}
			, {
				name: 'description'
				, hid: 'description'
				, content: pkg.description
			}
			, {
				name: 'msapplication-TileColor'
				, content: '#f68a31'
			}
			, {
				name: 'theme-color'
				, content: '#f68a31'
			}

		]
		, link: [
			/**
			 * Icons
			 */
			{
				href: '/apple-touch-icon.png'
				, rel: 'apple-touch-icon'
				, sizes: '180x180'
			}
			, {
				href: '/favicon-16x16.png'
				, rel: 'icon'
				, sizes: '16x16'
				, type: 'image/png'
			}
			, {
				href: '/favicon-32x32.png'
				, rel: 'icon'
				, sizes: '32x32'
				, type: 'image/png'
			}
			// , {
			// 	href: '/site.webmanifest'
			// 	, rel: 'manifest'
			// }
			, {
				rel: 'stylesheet'
				, href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
			}
			, {
				color: '#f68a31'
				, href: '/safari-pinned-tab.svg'
				, rel: 'mask-icon'
			}
		]
	}

	/*
	 ** Customize the progress-bar color
	 */
	, loading: {
		// brand orange
		color: '#f68a31'
	}


	/*
	** Plugins to load before mounting the App
	*/
	, plugins: [
		'@/plugins/vuetify'
	]

	/*
	** Nuxt.js modules
	*/
	, modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios'
	]

	/**
	 * Server
	 * @type {Object}
	 */
	, server: {
		host: config.location.ip || config.location.hostname
		, port: config.location.port
	}

	/*
	 ** Global CSS
	 */
	, css: [
		{
			lang: 'stylus'
			, src: 'assets/style/app.styl'
		}
	]

	/*
	 ** Build configuration
	 */
	, build: {
		/*
		 ** You can extend webpack config here
		 */
		// Caching doesn't seem to work. I must have broke it somewhere...
		cache: false
		, extend(wpConfig, {isDev, isClient}) {
			// Run ESLint on save
			if (isDev && isClient) {
				wpConfig.module.rules.push({
					enforce: 'pre'
					, test: /\.(js|vue)$/
					, loader: 'eslint-loader'
					, exclude: /(node_modules)/
				})
			}

			if (process.server) {
				wpConfig.externals = [
					nodeExternals({
						whitelist: [/^vuetify/]
					})
				]
			}
		}
		, optimizeCSS: true
		, parallel: true
		, postcss: [
			rucksackCss
		]
		, terser: {
			parallel: true
			, cache: true
			, sourceMap: false
			, extractComments: {
				filename: 'LICENSES'
			}
			, terserOptions: {
				output: {
					comments: /^\**!|@preserve|@license|@cc_on/
				}
			}
		}
		, transpile: [/^vuetify/]
		, plugins: [
			new VuetifyLoaderPlugin()
		]
	}
}
