<script setup>

const payload = ref({
	name: null,
	permissions_id: [1, 2],
	is_active: 1,
});
const formError = ref({});
const statusList = ref([
	{
		id: 1,
		label: 'Active'
	},
	{
		id: 2,
		label: 'Inactive'
	},
]);
const loading = ref(false);
const config = useRuntimeConfig();

const submit = async () => {
	loading.value = true;
	const { data, pending, error, refresh } = await useApi(`${config.public.apiBase}/api/v1/role`, {
		method: 'post',
		body: {
			name: payload.name
		},
	});
	loading.value = pending.value;
	if (data.value) {
		console.log(data.value);
		useToast({ title: data.value.message });
	} else {
		formError.value = get422Error(error);
		useToast({ title: error.value.data.message, type: 'error' });
	}
}
</script>

<template>
	<div>
		<NuxtLayout name="authenticated">
			<SectionMain>
				<CardBox :class="cardClass" is-form @submit.prevent="submit">
					<FormField label="Role Name" help="Please enter role name" :error="formError['name']">
						<FormControl v-model="payload.name" name="name" autocomplete="name" />
					</FormField>

					<FormField label="Status" help="Please enter your status" :error="formError['status']">
						<FormControl v-model="payload.is_active" type="select" name="status" autocomplete="status"
							:options="statusList" />
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
