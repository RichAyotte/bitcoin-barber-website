
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
	theme: {
		// a color that is not in the material colors palette
		primary: '#f68a31'
		, accent: colors.grey.darken3
		, secondary: colors.amber.darken3
		, info: colors.teal.lighten1
		, warning: colors.amber.base
		, error: colors.deepOrange.accent4
		, success: colors.green.accent3
	}
})

