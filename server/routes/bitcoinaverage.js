/**
 * @overview    Bitcoin price
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-02 15:55:35
 * @license     GNU GPL-3.0
 * @flow
 */

const axios = require('axios')
const {get} = require('lodash')

let btcPrice = null

module.exports = async context => {
	const lastCheck = Number.parseInt(get(btcPrice, 'BTCCAD.timestamp'), 10)
	const now = Number.parseInt(Date.now() / 1000, 10)

	// Wait a minimum of 5 minutes between checks
	if (Number.isNaN(lastCheck) || now - lastCheck > 60 * 5) {
		try {
			const {data} = await axios.get('https://apiv2.bitcoinaverage.com/indices/global/ticker/short?crypto=BTC&fiat=CAD')
			btcPrice = data
			context.body = data
		}
		catch (error) {
			btcPrice = null
			context.body = null
			console.log(error.response.body)
		}
		return
	}
	context.body = btcPrice
}
