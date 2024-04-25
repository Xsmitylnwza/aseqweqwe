<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRoute, RouterLink, useRouter } from "vue-router"
import TodoModal from "./TodoModal.vue"
import Listmodel from "./ListModel.vue"
import { getTodoById, getTodos } from "@/util/fetchUtils"

const route = useRouter()

const tasks = ref([])

const isTeleport = ref(true)
const isEmptyTask = ref(false)
const closeModal = (isClose) => {
	isTeleport.value = isClose
	route.go(-1)
}
onMounted(async () => {
	const listTodo = await getTodos(import.meta.env.VITE_BASE_URL + "/tasks")
	if (listTodo.length === 0) isEmptyTask.value = true
	tasks.value = listTodo
})
</script>

<template>
	<div class="flex flex-col justify-center w-full h-screen bg-gray-100">
		<div class="text-xl font-bold text-gray-800 mb-4 px-[10px]">
			<h1>IT-Bangmod Task Dashboard</h1>
		</div>
		<div class="w-full max-w-full p-6 bg-gray-200 border border-black">
			<teleport to="body" v-if="isTeleport">
				<TodoModal @back="closeModal" />
			</teleport>
			<div class="w-full overflow-auto border border-black">
				<table class="w-full text-gray-700">
					<thead class="flex justify-between bg-gray-300 p-[20px] text-lg">
						<tr class="flex justify-between w-full">
							<th class="px-4 py-2 border border-black">No</th>
							<th class="px-4 py-2 border border-black">Title</th>
							<th class="px-4 py-2 border border-black">Status</th>
							<th class="px-4 py-2 border border-black">Assignees</th>
						</tr>
					</thead>
					<tr>
						<td
							class="m-[100px] p-[10px] border border-dashed border-green-400 border-[2px]"
						>
							➕ Add
						</td>
					</tr>
					<Listmodel :jobs="tasks">
						<template #default="slotprop">
							<router-link :to="{ path: '/task/' + slotprop.job.id }">
								<tr
									class="flex justify-between my-[10px] p-[10px] text-[20px] border border-black hover:drop-shadow-2xl bg-white"
									:class="
										{
											Doing: 'hover:border-l-[20px] border-l-red-400 ',
											Done: 'hover:border-l-[20px] border-l-green-300',
											'To Do': 'hover:border-l-[20px] border-l-yellow-200',
										}[slotprop.job.taskStatus]
									"
									@click="isTeleport = true"
								>
									<td class="px-4 py-2 border border-black w-1/1">
										{{ slotprop.job.id }}
									</td>

									<td
										class="px-4 py-2 w-1/2 text-blue-600 cursor-pointer border border-black break-all"
									>
										{{ slotprop.job.taskTitle }}
									</td>

									<td class="px-4 py-2 border border-black w-1/3">
										{{
											slotprop.job.taskAssignees
												? slotprop.job.taskAssignees
												: "kuy"
										}}
									</td>
									<td
										class="px-4 py-2 p-1.5 w-[90px] text-sm text-center font-[20px] uppercase border border-black tracking-wider rounded-200 bg-opacity-50 rounded-[10px]"
										:class="
											{
												Doing: 'bg-red-200 text-red-800',
												Done: 'bg-green-200 text-green-800 ',
												'To Do': 'bg-yellow-200 text-yellow-800 ',
											}[slotprop.job.taskStatus]
										"
									>
										{{ slotprop.job.taskStatus }}
									</td>
								</tr>
							</router-link>
						</template>
						<template #notask>
							<div v-show="isEmptyTask" class="text-[20px] text-center">
								<h2>No Task</h2>
							</div>
						</template>
					</Listmodel>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
