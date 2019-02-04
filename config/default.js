/**
 * @overview    Default config
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-01 22:24:46
 * @license     GNU GPL-3.0
 * @flow
 */

const domain = ''

const config = {
	email: {
		registration: `registration@${domain}`
		, support: `support@${domain}`
	}
	, isDebug: false
	, location: {
		hostname: domain
		, port: null
		, protocol: 'http'
		, get url() {
			return `${this.protocol}://${this.hostname}:${this.port}`
		}
	}
	, nodemailer: {
		auth: {
			user: null
			, pass: null
		}
		, host: null
		, port: null
	}
}

module.exports = config
