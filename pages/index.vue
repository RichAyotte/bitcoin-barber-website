<template functional>
<div>
	<img
		class="logo"
		src="~assets/images/bitcoin-barber-head-logo.svg"
	>
	<h2>Trade cash for Bitcoin</h2>
	<div class="announce">
		<p>Our BTM is currently offline. The old software and hardware just
		wasn't cutting it anymore so we've decided to scrap it and <strong>build a new
		faster and more reliable BTM!</strong></p>

		<p>Developing good software/hardware takes time so bear with us as we
		make the best BTM possible.</p>
		--
		<br>
		Rich
		<br>
		<a href="mailto:rich@bitcoinbarber.ca">rich@bitcoinbarber.ca</a>
	</div>
</div>
</template>

<style lang="stylus" scoped>
@import '~assets/style/theme.styl'

.logo
	display: block
	margin: 2vh auto
	max-width: 400px
	width: 40vmin

h2
	text-align: center
	margin: 2vh auto

.buttons-container
	margin: 0 auto
	text-align: center
	width: 100%

.announce
	border: 1px solid $theme.primary
	margin: 2vh auto
	max-width: 500px
	padding: 28px
</style>
