<script setup>
import { reactive, ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import testVue from "./TodoModal.vue"
import Listmodel from "./ListModel.vue"

const router = useRoute()

const arr = reactive([
	{ id: 1, title: "wtf", assign: "Leng", status: "Doing" },
	{ id: 2, title: "help", assign: "View", status: "Done" },
	{ id: 3, title: "homework", assign: "View", status: "To Do" },
	{ id: 4, title: "learn", assign: "View", status: "Done" },
])
const test = ref(false)
const closeModal = (isClose) => (test.value = isClose)
</script>

<template>
	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table
			class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
		>
			<thead
				class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th scope="col" class="w-1/12 px-6 py-3">No</th>
					<th scope="col" class="w-5/12 px-6 py-3">Tittle</th>
					<th scope="col" class="w-3/12 px-6 py-3">Assignees</th>
					<th scope="col" class="w-3/12 px-6 py-3">Status</th>
				</tr>
			</thead>
			<Listmodel :jobs="arr">
				<tbody>
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<td class="px-6 py-4">1</td>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							Apple MacBook Pro 17"
						</th>
						<td class="px-6 py-4">1</td>
						<td class="px-6 py-4">Silver</td>

						<!-- <td class="px-6 py-4 text-right">1</td> -->
					</tr>
				</tbody>
			</Listmodel>
		</table>
	</div>
</template>

<style scoped></style>
