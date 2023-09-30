<script setup>
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '@/stores/auth';

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore());

const user = ref({
	email: null,
	password: null,
	remember: true,
});

const router = useRouter();


const submit = async () => {
	console.log(user.value);
	await authenticateUser(user.value); // call authenticateUser and pass the user object
	// redirect to homepage if user is authenticated
	if (authenticated) {
		router.push('/');
	}
};
</script>

<template>
	<div>
		<NuxtLayout>
			<SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
				<CardBox :class="cardClass" is-form>
					<FormField label="Login" help="Please enter your login">
						<FormControl v-model="user.email" :icon="mdiAccount" name="login" autocomplete="username" />
					</FormField>

					<FormField label="Password" help="Please enter your password">
						<FormControl v-model="user.password" :icon="mdiAsterisk" type="password" name="password"
							autocomplete="current-password" />
					</FormField>

					<FormCheckRadio v-model="user.remember" name="remember" label="Remember" :input-value="true" />

					<template #footer>
						<BaseButtons>
							<BaseButton type="button" @click="submit" color="info" label="Login" />
							<BaseButton to="/dashboard" color="info" outline label="Back" />
						</BaseButtons>
					</template>
				</CardBox>
			</SectionFullScreen>
		</NuxtLayout>
	</div>
</template>
