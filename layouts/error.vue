<template>
<section class="container">
	<img
		class="logo"
		src="~assets/images/bitcoin-barber-logo.svg"
	>
	<h1>
		{{ error.statusCode }}
	</h1>

	<v-alert
		secondary
		value="true"
		style=""
	>
	<h4>{{ error.message }}</h4>
	</v-alert>
	<br>
	<v-btn
		primary
		style="margin-top: 30px; font-weight: bold"
		href="/"
	>Take me to the home page.</v-btn>
</section>
</template>
<script>
export default {
	props: [
		'error'
	]
}
</script>

<style lang="scss" scoped>
.container {
	margin: 5vh auto;
	text-align: center;
}

h1 {
	margin: 5vh;
}

.logo {
	width: 80vw;
	max-width: 300px;
}
</style>
