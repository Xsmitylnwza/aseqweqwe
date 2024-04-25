<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import testVue from "./test.vue"
import Listmodel from "./ListModel.vue"
import { getTodoById, getTodos } from "@/util/fetchUtils"

const router = useRoute()

const tasks = ref([])

const isTeleport = ref(false)
const closeModal = (isClose) => (isTeleport.value = isClose)
onMounted(async () => {
	const listTodo = await getTodos(import.meta.env.VITE_BASE_URL + "/tasks")
	tasks.value = listTodo
	console.log(tasks)
})
</script>

<template>
	<div
		class="flex flex-col items-center justify-center w-full h-screen bg-gray-100"
	>
		<div class="text-xl font-bold text-gray-800 mb-4">
			<h1>IT-Bangmod Task Dashboard</h1>
		</div>
		<div class="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
			<teleport to="body" v-if="isTeleport">
				<testVue @back="closeModal" />
			</teleport>
			<div class="w-full overflow-x-auto border border-black">
				<table class="w-full text-gray-700">
					<thead class="flex justify-between bg-gray-300 p-[20px] text-lg">
						<tr>
							<th class="px-4 py-2 border border-black">No</th>
							<th class="px-4 py-2">Title</th>
							<th class="px-4 py-2">Assignees</th>
							<th class="px-4 py-2">Status</th>
						</tr>
					</thead>
					<Listmodel :jobs="tasks">
						<template #default="slotprop">
							<router-link :to="{ path: '/task/' + slotprop.job.id }">
								<tr
									class="flex justify-between border border-black w-[100%] my-[10px] p-[10px] text-lg border-b"
									:class="
										{
											Doing: 'hover:bg-red-400',
											Done: 'hover:bg-green-300',
											'To Do': 'hover:bg-yellow-200',
										}[slotprop.job.status]
									"
									@click="test = true"
								>
									<td class="px-4 py-2">{{ slotprop.job.id }}</td>

									<td
										class="px-4 py-2 text-blue-600 w-[300px] border border-black cursor-pointer"
									>
										{{ slotprop.job.taskTitle }}
									</td>

									<td class="px-4 py-2">{{ slotprop.job.taskAssignees }}</td>
									<td
										class="px-4 py-2 p-1.5 text-sm font-medium border border-black uppercase tracking-wider rounded-200 bg-opacity-50"
										:class="
											{
												Doing: 'bg-red-200 text-red-800 rounded-se-2xl',
												Done: 'bg-green-200 text-green-800 rounded-se-2xl',
												'To Do': 'bg-yellow-200 text-yellow-800 rounded-se-2xl',
											}[slotprop.job.taskStatus]
										"
									>
										{{ slotprop.job.taskStatus }}
									</td>
								</tr>
							</router-link>
						</template>
					</Listmodel>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
ค่อยเอาไปลอง
