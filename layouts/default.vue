<template>
<v-app>
	<v-navigation-drawer
		app
		right
		temporary
		v-model="drawer"
	>
		<div class="menu-top-bar">
			<img
				src="~assets/images/bitcoin-barber-head-grayscale-logo.svg"
				style="height: 60px; display: block; margin: 0 auto; padding: 8px"
			>
		</div>
		<v-list
			class="pt-0"
			dense
		>
			<v-list-tile
				:key="item.name"
				@click="$router.push(item.path)"
				v-for="item in $router.options.routes"
			>
				<v-list-tile-content>
					<v-list-tile-title>
						{{item.meta.label}}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-navigation-drawer>
	<v-toolbar
		app
		clipped-left
		fixed
		flat
	>
		<v-toolbar-title
			class="hidden-xs-only"
		>
		<img
			src="~assets/images/bitcoin-barber-text.svg"
			style="width: 230px;"
		>
		</v-toolbar-title>
		<img
			class="hidden-sm-and-up"
			@click="$router.push('/')"
			src="~assets/images/bitcoin-barber-text.svg"
			style="flex-basis:0; height: calc(80% - 18px); cursor: pointer;"
		>
		<v-spacer></v-spacer>
		<v-toolbar-side-icon
			class="hidden-sm-and-up"
			@click.stop="drawer = !drawer"
		/>
		<v-toolbar-items
			style="align-items: center"
		>
		<v-btn
			:key="item.name"
			@click="$router.push(item.path)"
			class="hidden-xs-only"
			flat
			v-for="item in $router.options.routes"

		>{{item.meta.label}}</v-btn>
		</v-toolbar-items>
	</v-toolbar>
	<v-content>
		<v-container
			fill-height
			fluid
		>
			<v-layout
				justify-center
				row
				wrap
			>
				<nuxt/>
			</v-layout>
		</v-container>
	</v-content>
	<v-footer height="auto">
		<v-container
			class="py-0"
			fluid
			grid-list-lg
		>
			<v-form
				ref="form"
				v-model="valid"
			>
				<v-layout
					align-center
					class="my-0"
					justify-center
					row
					wrap
				>
					<v-flex xs12 sm12 md4>
						<span>Enter your email to get updates.</span>
					</v-flex>
					<v-flex xs12 sm8 md4>
						<v-text-field
							:rules="emailRules"
							label="E-mail"
							required
							prepend-icon="email"
							v-model="form.email"
						/>
					</v-flex>
					<v-flex xs12 sm4 md4>
						<v-btn
							@click="subscribe"
							block
							color="primary"
						>Subscribe</v-btn>
					</v-flex>
				</v-layout>
			</v-form>
		</v-container>
	</v-footer>
	<v-snackbar
		:color="responseType"
		:value="serverResponded"
	>{{serverResponse.message}}</v-snackbar>
</v-app>
</template>

<script>
import axios from 'axios'
import {sortBy} from 'lodash'

export default {
	created() {
		const {routes} = this.$router.options
		const meta = {
			index: {
				label: 'Home'
				, order: 1
			}
			, support: {
				label: 'Tech Support'
				, order: 4
			}
			, locations: {
				label: 'Locations'
				, order: 2
			}
			, help: {
				label: 'How does it work?'
				, order: 3
			}
			, contact: {
				label: 'Contact Us'
				, order: 5
			}
		}

		routes.forEach(route => {
			route.meta = meta[route.name]
		})

		this.$router.options.routes = sortBy(routes, [o => o.meta.order])
	}
	, computed: {
		serverResponded() {
			return this.serverResponse.isError || this.serverResponse.isSuccess
		}
		, responseType() {
			if (this.serverResponse.isError === true) {
				return 'error'
			}
			if (this.serverResponse.isSuccess === true) {
				return 'success'
			}
			return 'info'
		}
	}
	, data() {
		const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
		return {
			drawer: false
			, emailRules: [
				v => emailRegex.test(v) || 'E-mail must be valid'
			]
			, form: {
				email: null
			}
			, navItems: []
			, serverResponse: {
				isError: false
				, isSuccess: false
				, message: null
			}
			, valid: false
		}
	}
	, methods: {
		async subscribe() {
			const isValid = this.$refs.form.validate()

			if (!isValid) {
				return
			}

			try {
				const {data} = await axios.post('/api/subscribe', this.form)
				this.serverResponse.isSuccess = true
				this.serverResponse.message = data.message
				this.$refs.form.reset()
			}
			catch (error) {
				console.log(error)
				const {data} = error
				this.serverResponse.isError = true
				const {errors} = data
				if (Array.isArray(errors)) {
					this.serverResponse.message = errors[0].message
					return
				}
				this.serverResponse.message = 'Server error'
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/theme.styl'

.menu-top-bar
	background-color: $grey.lighten-3
</style>
