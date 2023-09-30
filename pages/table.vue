<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
	mdiAccountMultiple,
	mdiChartTimelineVariant,
	mdiMonitorCellphone,
	mdiGithub,
	mdiEye,
	mdiTrashCan,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";

definePageMeta({
	// middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

const config = useRuntimeConfig();

const dataTableConfig = ref({
	title: 'USER LIST',
	url: `${config.public.apiBase}/api/v1/user`,
	query: {},
	actions: [
		{
			icon: mdiEye,
			color: "info",
			tooltip: "edit",
			onclick: (data) => {
				console.log(data);
			},
		},
		{
			icon: mdiTrashCan,
			color: "danger",
			tooltip: "delete",
			onclick: (data) => {
				console.log(data);
			},
		}
	]
})

const chartData = ref(null);

const fillChartData = () => {
	chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
	fillChartData();
});

const mainStore = useMainStore();
</script>

<template>
	<div>
		<NuxtLayout name="authenticated">
			<SectionMain>
				<SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Overview" main>
					<BaseButton href="https://github.com/justboil/admin-one-vue-tailwind" target="_blank" :icon="mdiGithub"
						label="Star on GitHub" color="contrast" rounded-full small />
				</SectionTitleLineWithButton>

				<CardBox has-table class="mb-5">
					<Datatable :config="dataTableConfig" />
				</CardBox>
			</SectionMain>
		</NuxtLayout>
	</div>
</template>
