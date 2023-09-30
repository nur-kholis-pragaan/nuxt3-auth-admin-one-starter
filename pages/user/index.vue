<script setup>
import {
	mdiPlus,
	mdiPencil,
	mdiTrashCan,
	mdiAccountCircle,
} from "@mdi/js";

defineEmits([
	'reload'
])
const config = useRuntimeConfig();
const dataTableRefs = ref(null)
var reloadDataTable;
onMounted(() => {
	reloadDataTable = dataTableRefs.value.reload;
})
const dataTableConfig = ref({
	title: 'User List',
	url: `${config.public.apiBase}/api/v1/user`,
	query: {},
	columns: [
		{
			label: "Name",
			data: "name",
		},
		{
			label: "Role",
			data: (row) => {
				return row.roles[0].name;
			}
		},
	],
	actions: [
		{
			show: hasPermission('update user'),
			icon: mdiPencil,
			color: "info",
			tooltip: "edit",
			riderect: (data) => {
				return `/user/form?id=${data.id}`;
			},
		},
		{
			show: hasPermission('delete user'),
			icon: mdiTrashCan,
			color: "danger",
			tooltip: "delete",
			callback: (data) => {
				confirmDelete(data);
			},
		}
	],
})

async function confirmDelete(data) {
	const { $swal } = useNuxtApp()
	const confirm = await $swal.fire({
		title: `Yakin ingin menghapus ${data.name} ?`,
		text: "Data yang dihapus tidak dapat dikembalikan!",
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Ya, hapus",
		cancelButtonText: "Tidak, batalkan",
		buttonsStyling: true,
	})
	if (confirm.value) {
		deleteItem(data.id);
	}
}

async function deleteItem(id) {
	const { data, pending, error } = await useApi(`${config.public.apiBase}/api/v1/user/${id}`, {
		method: 'delete',
	})
	if (data.value) {
		useToast({ title: data.value.message });
		reloadDataTable();
	} else {
		useToast({ title: error.value.data.message, type: 'error' });
	}

}
</script>

<template>
	<div>
		<NuxtLayout name="authenticated">
			<SectionMain>
				<SectionTitleLineWithButton :icon="mdiAccountCircle" title="User" main>
					<BaseButton v-if="hasPermission('create user')" :to="'/user/form'" :icon="mdiPlus" label="Add User" color="contrast" rounded-full small />
				</SectionTitleLineWithButton>

				<CardBox has-table class="mb-5">
					<Datatable ref="dataTableRefs" :config="dataTableConfig"></Datatable>
				</CardBox>
			</SectionMain>
		</NuxtLayout>
	</div>
</template>
