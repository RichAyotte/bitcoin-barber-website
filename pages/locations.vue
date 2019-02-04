<template>
<v-flex xs12 sm8 md6>
	<h1 class="display-3">Locations</h1>
	<v-layout>
		<v-flex>
			<v-card>
				<v-card-title
					class="text-xs-center"
					primary-title
					style="display: block;"
				>The Head Shop Barbershop</v-card-title>
				<v-alert
					class="ma-0"
					:type="statusType"
					:value="true"
				>{{statusOrPrice}}</v-alert>
				<v-img
					:src="require('~/assets/images/the-head-shop.jpg')"
					height="230px"
				/>
				<v-card-text>
				20 Hartzel Road
				<br>
				St. Catharines, Ontario
				<br>
				Hours Tues-Sat 9am-6pm
				</v-card-text>
				<v-card-actions>
					<v-btn
						class="primary--text"
						flat
						tag
						href="http://www.theheadshop.ca/"
					>Website</v-btn>
					<v-btn
						class="primary--text"
						flat
						tag
						href="https://www.google.ca/maps/dir//20+Hartzel+Rd,+St.+Catharines"
					>Directions</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</v-flex>
</template>

<script>
import axios from 'axios'
import {get} from 'lodash'

const markup = 1.10
const getBtcPrice = async () => axios.get('/api/bitcoinaverage')
.then(
	response => (Number.parseInt(
		get(response, 'data.BTCCAD.last')
		, 10
	) * markup).toFixed(2)
)

const getStatus = async () => axios.get('/api/status')
.then(
	response => get(response, 'data')
)

const alertTypes = {
	online: 'success'
	, offline: 'error'
}

export default {
	async beforeCreate() {
		try {
			this.price = await getBtcPrice()
			this.status = await getStatus()
		}
		catch (error) {
			// console.log(error)
		}

		this.checkInterval = setInterval(async () => {
			try {
				this.price = await getBtcPrice()
				this.status = await getStatus()
				// console.log(this.status)
			}
			catch (error) {
				// console.log(error)
			}
		}, 60000 * 60)
	}
	, beforeDestroy() {
		clearInterval(this.checkInterval)
	}
	, data() {
		return {
			price: {}
			, status: {
				code: 'offline'
			}
		}
	}
	, computed: {
		statusOrPrice() {
			if (this.status.code === 'offline') {
				return this.status.message
			}

			if (isNaN(this.price)) {
				return 'Fetching price...'
			}

			return `${this.status.message} Price: $${this.price}`
		}
		, statusType() {
			if (!(this.status.code in alertTypes)) {
				return 'info'
			}

			return alertTypes[this.status.code]
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/theme.styl'
</style>
