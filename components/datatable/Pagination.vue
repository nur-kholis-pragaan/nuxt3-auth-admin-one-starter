<template>
	<div>
		<div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
			<BaseLevel>
				<BaseButtons>
					<BaseButton v-for="pageNumber in totalPages" :active="currentPage == pageNumber" :label="pageNumber"
						:color="currentPage == pageNumber ? 'lightDark' : 'whiteDark'" small
						@click="$emit('change', pageNumber)" />
				</BaseButtons>
				<small>Page {{ currentPage }} of {{ totalPages }}</small>
			</BaseLevel>
		</div>
	</div>
</template>

<script setup>
defineProps({
	totalPages: Number,
	currentPage: Number,
})

defineEmits([
	'change'
])
</script>