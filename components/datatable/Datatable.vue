<script setup>
import { mdiMagnify } from '@mdi/js';
import { CardShimmer, ParagraphShimmer, FreeStyleShimmer } from 'vue3-shimmer'
const hello = () => {
	console.log('hello');
	refresh();
}


function reload() {
	console.log('reload datatable');
	refresh();
}

defineExpose({
	hello,
	reload
})

const props = defineProps({
	config: Object,
})

const page = ref(1);
const searchKeyWord = ref('');

const { data, pending, refresh } = await useApi(() => `${props.config.url}?page=${page.value}&search=${searchKeyWord.value}`, { lazy: true, });

function refetch(pageNumber) {
	page.value = pageNumber;
	refresh();
}

function onEnter(event) {
	searchKeyWord.value = event.target.value;
	refresh();
}

function columnDataItem(item, dataLabel, index) {
	if (typeof dataLabel === 'string') {
		let dataLabels = dataLabel.split(".");
		if (dataLabels.length > 1) {
			let a = item;
			dataLabels.forEach((val) => {
				a = a[val];
			});
			return a;
		}
		return item[dataLabel];
	} else {
		return dataLabel(item);
	}
}
</script>

<template>
	<div>
		<div class="m-4 flex justify-between justify-items-center">
			<h1 class="text-lg font-bold mt-2">{{ props.config?.title }}</h1>
			<FormControl :icon="mdiMagnify" name="login" autocomplete="search" v-on:keyup.enter="onEnter"
				:model-value="searchKeyWord" />
		</div>

		<div v-if="data">
			<table>
				<thead>
					<tr>
						<th class="hash-filter" v-for="(column, index) in props.config.columns" :key="index">
							{{ column.label }}
						</th>
						<th v-if="props.config.actions.length > 0">
							Action
						</th>
					</tr>
				</thead>

				<tbody v-if="pending">
					<tr v-for="i in 10" :key="i">
						<td v-for="(column, i) in props.config.columns" :key="i">
							<free-style-shimmer :is-loading="true" height="15px" width="100%" color="#ddd" />
						</td>
						<td v-if="props.config.actions.length > 0">
							<free-style-shimmer :is-loading="true" height="15px" width="100%" color="#ddd" />
						</td>
					</tr>
				</tbody>

				<tbody v-else>
					<tr v-for="(item, index) in data.data" :key="index">
						<td v-for="(column, i) in props.config.columns" :key="i">
							<span v-html="columnDataItem(item, column['data'], i)"></span>
						</td>
						<td class="before:hidden lg:w-1 whitespace-nowrap" v-if="props.config.actions.length > 0">
							<BaseButtons type="justify-start lg:justify-end" no-wrap>
								<div v-for="(action, index) in config.actions" :key="index">
									<component v-if="action.show != false">
										<BaseButton v-if="action.riderect" color="info" :icon="action.icon"
											:href="action.riderect(item)" small />
										<BaseButton v-else color="info" :icon="action.icon" small
											@click="action.callback(item)" />
									</component>
								</div>

							</BaseButtons>
						</td>
					</tr>
				</tbody>
			</table>
			<DatatablePagination :totalPages="data.pagination.total_page" :current-page="data.pagination.current_page"
				@change="refetch">
			</DatatablePagination>
		</div>
	</div>
</template>
