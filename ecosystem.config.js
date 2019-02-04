/**
 * @overview    PM2 ecosystem configuration
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-04 14:54:12
 * @license     GNU GPL-3.0
 */

/* eslint-disable camelcase */
module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		{
			name: 'bitcoinbarber'
			, cwd: '/opt/bitcoinbarber/current'
			, env: {
				NODE_APP_INSTANCE: 'production'
				, NODE_CONFIG_DIR: '/opt/bitcoinbarber/current/config'
				, NODE_ENV: 'production'
				, NODE_PATH: '/opt/bitcoinbarber/current'
			}
			, interpreter_args: '--harmony'
			, script: 'server/index.js'
			, watch: false
		}
	]
}
