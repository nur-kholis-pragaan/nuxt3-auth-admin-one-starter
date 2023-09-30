import { defineStore } from 'pinia';

// interface UserPayloadInterface {
//   username: string;
//   password: string;
// }

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authenticated: false,
		loading: false,
	}),

	actions: {
		async authenticateUser(credential) {
			try {
				const config = useRuntimeConfig();
				const { data, pending } = await useFetch(`${config.public.apiBase}/api/v1/auth/login`, {
					key: 'auth-login-' + `${Math.random()}`,
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: {
						email: credential.email,
						password: credential.password,
					},

				});
				this.loading = pending;

				if (data.value) {
					const token = useCookie('token');
					const permissions = useCookie('permissions');
					token.value = data?.value?.data.token;
					permissions.value = JSON.stringify(data?.value?.data.permissions);
					console.log(token.value);
					console.log(permissions.value);
					this.authenticated = true; // set authenticated  state value to true
				}
			} catch (error) {
				console.log(error);
			}
		},

		logUserOut() {
			const token = useCookie('token'); // useCookie new hook in nuxt 3
			this.authenticated = false; // set authenticated  state value to false
			token.value = null; // clear the token cookie
		},
	},
});