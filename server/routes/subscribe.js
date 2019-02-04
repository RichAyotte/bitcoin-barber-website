/**
 * @overview    Subscribe
 * @author      Richard Ayotte
 * @copyright   Copyright © 2018 Richard Ayotte
 * @date        2018-11-02 16:00:07
 * @license     GNU GPL-3.0
 * @flow
 */

const {promisify} = require('util')

const config = require('config')
const nodemailer = require('nodemailer')
const {get} = require('lodash')

const smtpTransport = nodemailer.createTransport(config.nodemailer)
const sendMail = promisify(smtpTransport.sendMail).bind(smtpTransport)

module.exports = context => {
	const form = get(context, 'request.body')
	if (!form || !form.email) {
		context.body = {
			errors: [
				{
					message: 'Invalid form data'
				}
			]
		}
		return
	}

	context.body = {
		message: `Thank you! We'll be in contact with you shortly.`
	}

	sendMail({
		from: '"Bitcoin Barber Website" <rich@bitcoinbarber.ca>'
		// , replyTo: `"${form.name}" <${form.email}>`
		, subject: `Email Subscription`
		, text: form.email
		, to: 'rich@bitcoinbarber.ca'
	})
	.catch(error => {
		console.log('sendMail:', error)
	})
}
