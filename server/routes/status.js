/**
 * @overview    Location status
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-02 15:55:35
 * @license     GNU GPL-3.0
 * @flow
 */

module.exports = async context => {
	context.body = {
		code: 'offline'
		, message: `Sorry, we're currently offline.`
	}
	// context.body = {
	// 	code: 'online'
	// 	, message: `Online.`
	// }
}
