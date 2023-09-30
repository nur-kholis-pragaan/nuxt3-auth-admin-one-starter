<template>
	<div>
		<h1>CHILD</h1>
	</div>
</template>

<script setup>
const hello = () => {
	console.log('hello');
}
defineExpose({
	hello,
})
</script>

<style lang="scss" scoped></style>