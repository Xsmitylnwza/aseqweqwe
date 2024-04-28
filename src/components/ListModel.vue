<script setup>
const props = defineProps({
	jobs: {
		type: Array,
	},
});
</script>
<template>
	<div class="">
		<slot v-for=" (job, index) in jobs" :key="index" :job="job">
		</slot>
		<slot name="notask"></slot>
	</div>
</template>

<style scoped></style>
