/**
 * @overview    API Tests
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-08 18:33:37
 * @license     GNU GPL-3.0
 * @flow
 */

const http = require('http')
const axios = require('axios')
const app = require(`${appRoot}/server/app`)
const {registerSuite} = intern.getPlugin('interface.object')
const {assert} = intern.getPlugin('chai')

registerSuite('API', () => {
	const server = http.createServer(app.callback())
	const host = '127.0.0.1'
	const port = 3000
	const request = axios.create({
		baseURL: `http://${host}:${port}/api`
	})

	return {
		async before() {
			await new Promise((resolve, reject) => {
				server.on('listening', resolve)
				server.on('error', reject)
				server.listen({
					host
					, port
				})
			})
		}
		, async after() {
			await new Promise((resolve, reject) => {
				server.on('close', resolve)
				server.on('error', reject)
				server.close()
			})
		}
		, tests: {
			subscribe: {
				async 'incomplete post should return error'() {
					const response = await request.post('/subscribe')
					assert.strictEqual(200, response.status)
					assert.isNotEmpty(response.data.errors)
				}
				, async 'valid post should return message'() {
					const response = await request.post('/subscribe', {
						email: 'rich.ayotte@gmail.com'
					})
					assert.strictEqual(200, response.status)
					assert.notExists(response.data.errors)
					assert.isString(response.data.message)
				}
			}
			, 'contact-form': {
				async 'incomplete post should return error'() {
					const response = await request.post('/contact-form')
					assert.strictEqual(200, response.status)
					assert.isNotEmpty(response.data.errors)
				}
				, async 'valid post should return message'() {
					const response = await request.post('/contact-form', {
						email: `email`
						, message: `message`
						, name: `name`
						, subject: `subject`
					})
					assert.strictEqual(200, response.status)
					assert.notExists(response.data.errors)
					assert.isString(response.data.message)
				}
			}
			, bitcoinaverage: {
				async 'should return a valid BTCCAD object'() {
					const response = await request.get('/bitcoinaverage')
					const {data} = response
					assert.strictEqual(200, response.status)
					assert.property(data, 'BTCCAD')
					assert.isNumber(data.BTCCAD.last)
					assert.isNumber(data.BTCCAD.bid)
					assert.isNumber(data.BTCCAD.ask)
				}
			}
			, status: {
				async 'should return the location status'() {
					const response = await request.get('/status')
					assert.strictEqual(200, response.status)
				}
			}
		}
	}
})
