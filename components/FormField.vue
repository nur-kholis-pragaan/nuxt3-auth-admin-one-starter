<script setup>
import { computed, useSlots } from "vue";

defineProps({
	label: {
		type: String,
		default: null,
	},
	labelFor: {
		type: String,
		default: null,
	},
	help: {
		type: String,
		default: null,
	},
	error: {
		type: Array,
		default: [],
	},
});

const slots = useSlots();

const wrapperClass = computed(() => {
	const base = [];
	const slotsLength = slots.default().length;

	if (slotsLength > 1) {
		base.push("grid grid-cols-1 gap-3");
	}

	if (slotsLength === 2) {
		base.push("md:grid-cols-2");
	}

	return base;
});
</script>

<template>
	<div class="mb-6 last:mb-0">
		<label v-if="label" :for="labelFor" class="block font-bold mb-2" :class="{'text-red-500': error.length > 0}">{{
			label
		}}</label>
		<div :class="wrapperClass">
			<slot />
		</div>
		<div class="flex justify-between justify-items-center">
			<div v-if="help" class="text-xs text-gray-500 dark:text-slate-400 mt-1">
				{{ help }}
			</div>
			<div v-if="error.length > 0" class="text-xs text-red-500 dark:text-red-500 mt-1">
				{{ error[0] }}
			</div>
		</div>
	</div>
</template>
