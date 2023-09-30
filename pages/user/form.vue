<script setup>
import { mdiAccount, mdiAccountCircle, mdiArrowLeft, mdiShield } from '@mdi/js';

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const title = ref('Create User');
const loading = ref(false);
const formError = ref({});
const payload = ref({
	email: null,
	name: null,
	role_id: null,
});

onMounted(async () => {
	if (route.query.id) {
		getUpdateData();
		title.value = 'Update User';
	}
})

const { data: roles } = await useApi(`${config.public.apiBase}/api/v1/role`, {
	transform: (roles) => {
		roles.data = roles.data.map(role => ({
			id: role.id,
			label: role.name
		}));
		return roles
	}
});

async function submit() {
	loading.value = true;
	const _id = route.query.id;
	const { data, pending, error, refresh } = await useApi(`${config.public.apiBase}/api/v1/user${_id ? `/${_id}` : ''}`, {
		method: 'post',
		body: {
			name: payload.value.name,
			email: payload.value.email,
			role_id: payload.value.role_id,
			_method: _id ? 'put' : 'post',
		},
	});
	loading.value = pending.value;
	if (data.value) {
		useToast({ title: data.value.message });
		router.push('/user');
	} else {
		formError.value = get422Error(error);
		useToast({ title: error.value.data.message, type: 'error' });
	}
}

async function getUpdateData() {
	useApi(`${config.public.apiBase}/api/v1/user/show/${route.query.id}`);
	const { data: updatedData, pending, error, refresh } = await useApi(`${config.public.apiBase}/api/v1/user/show/${route.query.id}`);
	if (updatedData.value) {
		payload.value.name = updatedData.value.data.name;
		payload.value.email = updatedData.value.data.email;
		payload.value.role_id = updatedData.value.data.roles[0].id;
	}

}

</script>

<template>
	<div>
		<NuxtLayout name="authenticated">
			<SectionMain>
				<SectionTitleLineWithButton :icon="mdiAccountCircle" :title="title" main>
					<BaseButton :to="'/user'" :icon="mdiArrowLeft" label="Back" color="contrast" rounded-full small />
				</SectionTitleLineWithButton>

				<CardBox :class="cardClass" is-form @submit.prevent="submit">

					<FormField label="Name" help="Please enter name" :error="formError['name']">
						<FormControl v-model="payload.name" name="name" autocomplete="name" />
					</FormField>

					<FormField label="Email" help="Please enter user email" :error="formError['email']">
						<FormControl v-model="payload.email" name="email" autocomplete="email" />
					</FormField>

					<FormField label="Role" help="Please enter role" :error="formError['role_id']">
						<FormControl v-model="payload.role_id" type="select" name="role_id" autocomplete="role_id"
							:options="roles.data" />
					</FormField>

					<template #footer>
						<BaseButtons>
							<BaseButton to="/" color="info" outline label="Back" />
							<BaseButton type="submit" color="info" :label="loading ? 'Loading...' : 'Submit'" />
						</BaseButtons>
					</template>
				</CardBox>
			</SectionMain>
		</NuxtLayout>
	</div>
</template>
