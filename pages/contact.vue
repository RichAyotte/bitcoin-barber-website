<template>
<v-flex xs12 sm8 md6>
	<h1 class="display-3">Contact Us</h1>
	<v-form
		ref="form"
		v-model="valid"
	>
		<v-text-field
			:rules="nameRules"
			label="Name"
			required
			v-model="form.name"
		/>
		<v-text-field
			:rules="emailRules"
			label="E-mail"
			required
			v-model="form.email"
		/>
		<v-select
			:items="subjects"
			:rules="[v => Boolean(v) || 'Subject is required']"
			label="Subject"
			required
			v-model="form.subject"
		/>
		<v-textarea
			:rules="messageRules"
			label="Message"
			required
			v-model="form.message"
		/>
		<v-btn
			@click="resetAll"
		>Clear</v-btn>
		<v-btn
			class="primary"
			@click="sendMessage"
		>Send</v-btn>
	</v-form>
	<v-alert
		:type="responseType"
		:value="serverResponded"
	>
	{{serverResponse.message}}
	</v-alert>
</v-flex>
</template>

<script>
import axios from 'axios'
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export default {
	data() {
		return {
			form: {
				name: null
				, email: null
				, subject: null
				, message: null
			}
			, emailRules: [
				v => Boolean(v) || 'E-mail is required'
				, v => emailRegex.test(v) || 'E-mail must be valid'
			]
			, nameRules: [
				v => Boolean(v) || 'Name is required'
				, v => (v && v.length <= 50) || 'Name must be less than 10 characters'
				, v => (v && v.length >= 3) || 'Name must be more than 3 characters'
			]
			, messageRules: [
				v => Boolean(v) || 'Message is required'
				, v => (v && v.length <= 1000) || 'Message must be less than 1000 characters'
				, v => (v && v.length >= 10) || 'Message must be more than 10 characters'
			]
			, serverResponse: {
				isError: false
				, isSuccess: false
				, message: null
			}
			, subjects: [
				'Inquiry'
				, 'Tech Support'
				, 'Other'
			]
			, valid: false
		}
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
	, methods: {
		resetAll() {
			this.$refs.form.reset()
			this.serverResponse = {
				isError: false
				, isSuccess: false
				, message: null
			}
		}
		, async sendMessage() {
			const isValid = this.$refs.form.validate()

			if (!isValid) {
				return
			}

			try {
				const {data} = await axios.post('/api/contact-form', this.form)
				this.serverResponse.isSuccess = true
				this.serverResponse.message = data.message
				this.$refs.form.reset()
			}
			catch ({data}) {
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
