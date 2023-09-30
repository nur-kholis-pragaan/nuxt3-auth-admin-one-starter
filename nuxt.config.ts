// import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: [
		'@pinia/nuxt',
		// 'vue-sweetalert2/nuxt',

	],
	// sweetalert: {
	// 	confirmButtonColor: '#41b882',
	// 	cancelButtonColor: '#ff7674'
	// },
	runtimeConfig: {
		public: {
			apiBase: process.env.API_BASE,
			// apiBase: 'http://localhost:8000',
		}
	},
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
		],
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	css: [
		'@/assets/css/main.css',
	]
})