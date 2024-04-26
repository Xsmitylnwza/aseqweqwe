<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRoute, RouterLink, useRouter } from "vue-router"
import TodoModal from "./TodoModal.vue"
import Listmodel from "./ListModel.vue"
import { getTaskById, getTaskList } from "@/util/fetchUtils"
import taskMangement from "@/libs/taskMangement"

const route = useRouter()
const tasks = ref([])
const teleported = ref(false)
const isEmptyTask = ref(false)
const taskDetails = ref()
const management = ref(new taskMangement())

async function modalHandler(id) {
	taskDetails.value = await getTaskById(
		import.meta.env.VITE_BASE_URL + "/tasks",
		id
	)

	// taskDetails.value = management.value.getTaskById(id) ใช้งานไม่ได้มันไม่มี createdOn, updatedOn มาให้ใช้

	taskDetails.value.createdOn = convertUtils(taskDetails.value.createdOn)
	taskDetails.value.updatedOn = convertUtils(taskDetails.value.updatedOn)
	teleported.value = true
}

console.log(convertUtils("2024-04-22T09:00:00Z"))

function convertUtils(task) {
	console.log(task)
	const formattedTimeZone = formatTimeZone(task)
	console.log(formattedTimeZone)
	const [date, timeString] = formattedTimeZone.split(",")
	console.log(date)
	console.log(timeString)
	const dateformat = convertDateFormat(date)
	console.log(dateformat)
	const timeformat = convertTimeTo24HourFormat(timeString.substring(1))
	return `${dateformat} ${timeformat}`
}

function convertTimeTo24HourFormat(timeString) {
	const [time, period] = timeString.split(" ")
	let [hour, minute, second] = time.split(":")

	if (period === "PM" && hour !== "12") {
		hour = String(Number(hour) + 12)
	}

	if (period === "AM" && hour === "12") {
		hour = "00"
	}

	return `${hour}:${minute}:${second}`
}

function convertDateFormat(dateString) {
	return dateString.replace(/\//g, "-")
}

function formatTimeZone(timestampString) {
	const timestamp = new Date(timestampString)
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	const formattedtimestamp = timestamp.toLocaleString("en-US", {
		timeZone: userTimeZone,
	})
	return formattedtimestamp
}

function closeModal(isClose) {
	teleported.value = isClose
	route.go(-1)
}
onMounted(async () => {
	const listTodo = await getTaskList(import.meta.env.VITE_BASE_URL + "/tasks")
	if (listTodo.length === 0) isEmptyTask.value = true
	tasks.value = listTodo
	teleported.value = false
	management.value.taskList = listTodo
})
</script>

<template>
	<div class="flex flex-col justify-center w-full h-screen bg-gray-100">
		<div class="text-xl font-bold text-gray-800 mb-4 px-[10px]">
			<h1>IT-Bangmod Task Dashboard</h1>
		</div>
		<div class="w-full max-w-[90%] p-6 bg-gray-200 border border-black">
			<teleport to="body" v-if="teleported">
				<TodoModal
					@back="closeModal"
					:taskDetails="taskDetails"
					:timeZone="Intl.DateTimeFormat().resolvedOptions().timeZone"
				/>
			</teleport>
			<div class="w-full overflow-auto border border-black">
				<table class="w-full text-gray-700">
					<thead class="flex justify-between p-[20px] text-lg">
						<tr class="flex justify-between w-full">
							<th class="px-4 py-2 border border-black">No</th>
							<th class="px-4 py-2 border border-black">Title</th>
							<th class="px-4 py-2 border border-black">Status</th>
							<th class="px-4 py-2 border border-black">Assignees</th>
						</tr>
					</thead>
					<!-- <tr>
						<td
							class="m-[100px] p-[10px] border border-dashed border-green-400 border-[2px]"
						>
							➕ Add
						</td>
					</tr> -->
					<Listmodel :jobs="management.taskList">
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
									@click="modalHandler(slotprop.job.id)"
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
