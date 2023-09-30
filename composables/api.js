export const useApi = async (url, params) => {
	const token = useCookie('token');
	// console.log('api.js', url);

	const cookie = useCookie('token')

	const config = useRuntimeConfig()

	const opts = {
		// key: url + `${Math.random()}`,
		// baseURL: config.baseURL,
		initialCache: false,

		async onRequest({ options }) {

			options.headers = options.headers || {}

			if (cookie.value) {
				options.headers['Authorization'] = `Bearer ${cookie.value}`
			}
		},

		async onRequestError({ error }) {
			
			console.log(error.message)
		},

		async onResponseError({ response }) {
			console.log(response._data.message)
		},

		...params

	}



	// const { data, pending, error, execute } = await useFetch(url, opts)

	const { data, pending, error, refresh } = await useFetch(url, opts)

	return {
		data, pending, error, refresh
	}

}