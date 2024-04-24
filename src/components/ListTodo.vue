<script setup>
import { ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import testVue from "./test.vue"

const router = useRoute()
const test = ref(false)
</script>

<template>
	<div>
		<teleport to="body" v-if="test">
			<testVue />
		</teleport>
		<div class="w-[500px] text-red-500 border border-black px-8">
			<table class="w-[100%]">
				<tr class="flex justify-between">
					<th>No</th>
					<th>Tittle</th>
					<th>Assignees</th>
					<th>Status</th>
				</tr>
				<tr class="flex justify-between">
					<td>No</td>
					<router-link :to="{ path: '/task/' + 1 }">
						<td @click="test = true">Tittle</td>
					</router-link>
					<td>Assignees</td>
					<td>Status</td>
					<td v-show="test">help</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<style scoped></style>
