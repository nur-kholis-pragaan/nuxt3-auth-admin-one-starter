<script setup>
import {
	mdiPlus,
	mdiShield,
	mdiPencil,
} from "@mdi/js";

defineEmits([
	'reload'
])
const config = useRuntimeConfig();
const dataTableRefs = ref(null)
var reloadDataTable = null;
onMounted(() => {
	reloadDataTable = dataTableRefs.value.reload;
})
const dataTableConfig = ref({
	title: 'Role List',
	url: `${config.public.apiBase}/api/v1/role`,
	query: {},
	columns: [
		{
			label: "Name",
			data: "name",
		},
		{
			label: "Created At",
			data: (row) => {
				return row.created_at;
			}
		},
	],
	actions: [
		{
			show: hasPermission('update role'),
			icon: mdiPencil,
			color: "info",
			tooltip: "edit",
			callback: (data) => {
				return `/role/form?id=${data.id}`;
			},
		},
		// {
		// 	icon: mdiTrashCan,
		// 	color: "danger",
		// 	tooltip: "delete",
		// 	callback: (data) => {
		// 		confirmDelete(data);
		// 	},
		// }
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
	// const { data, pending, error } = await useApi(`${config.public.apiBase}/api/v1/role/${id}`, {
	// 	method: 'delete',
	// })
	// console.log(data);

	// reloadDataTable();

	// $refs.dataTable.reload();
	// try {
	// 	let res = await this.$axios.delete(httpService.endPoint['user'] + `/${id}`);
	// 	if (res.status == 200) {
	// 		this.$refs.datatable.reloadDataTable();
	// 		this.$swal.fire({
	// 			title: "Berhasil",
	// 			text: "data berhasil dihapus",
	// 			icon: "success",
	// 		});
	// 	}
	// } catch (error) {
	// 	errorService.displayError(error);
	// }
}
</script>

<template>
	<div>
		<NuxtLayout name="authenticated">
			<SectionMain>
				<SectionTitleLineWithButton :icon="mdiShield" title="Role" main>
					<BaseButton v-if="hasPermission('create role')" :to="'/role/form'" :icon="mdiPlus" label="Add Role"
						color="contrast" rounded-full small />
				</SectionTitleLineWithButton>

				<CardBox has-table class="mb-5">
					<Datatable ref="dataTableRefs" :config="dataTableConfig"></Datatable>
				</CardBox>
			</SectionMain>
		</NuxtLayout>
	</div>
</template>
