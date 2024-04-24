<script setup>
import { RouterLink, RouterView } from "vue-router"
import ListTodo from "./components/ListTodo.vue"
</script>

<template>
	<div>
		<div class="m-5">
			<p>IT-Bangmod Kraddan Kanban</p>
		</div>
		<div>
			<ListTodo />
		</div>
	</div>
</template>

<style scoped></style>
