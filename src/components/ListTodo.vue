<script setup>
import { onMounted, ref } from "vue"
import { RouterLink, useRouter } from "vue-router"
import TodoModal from "./TodoModal.vue"
import Listmodel from "./ListModel.vue"
import { getTaskById, getTaskList } from "@/util/fetchUtils"
import taskMangement from "@/libs/taskMangement"

const router = useRouter()
const tasks = ref([])
const teleported = ref(false)
const isEmptyTask = ref(false)
const taskDetails = ref({})
const taskManagement = ref(new taskMangement())
const props = defineProps(["id"])

async function modalHandler(id) {
	taskDetails.value = await getTaskById(
		import.meta.env.VITE_BASE_URL + "/tasks",
		id
	)
	if (typeof taskDetails.value === 'object') {
		taskDetails.value.createdOn = convertUtils(taskDetails.value.createdOn)
		taskDetails.value.updatedOn = convertUtils(taskDetails.value.updatedOn)
		teleported.value = true
	} else {
		window.alert("The requested task does not exist")
		router.push("/")
	}
}
function convertUtils(timeUTC) {
	const formattedTimeZone = formatTimeZone(timeUTC)
	const [date, timeString] = formattedTimeZone.split(",")
	return `${date} ${timeString}`
}


function formatTimeZone(timestampString) {
	const timestamp = new Date(timestampString)
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	const formattedtimestamp = timestamp.toLocaleString("en-GB", {
		timeZone: userTimeZone,
	})
	return formattedtimestamp
}

function closeModal(isClose) {
	teleported.value = isClose
	router.go(-1)
}

onMounted(async () => {
	if (props.id) {
		modalHandler(props.id)
	}
	const listTodo = await getTaskList(import.meta.env.VITE_BASE_URL + "/tasks")
	if (listTodo.length === 0) isEmptyTask.value = true
	tasks.value = listTodo
	taskManagement.value.taskList = listTodo
});
</script>

<template>
	<teleport to="body" v-if="teleported">
		<TodoModal @back="closeModal" :taskDetails="taskDetails"
			:timeZone="Intl.DateTimeFormat().resolvedOptions().timeZone" />
	</teleport>
	<div class="w-screen h-screen bg bg-[#FBFBFB] px-[35px] py-[25px] font-nonto">
		<div class=" flex flex-row justify-between items-center w-[100%] h-[75px] mb-[15px]">
			<div class="h-[75%] mt-[20px]">
				<h1 class="text-[24px] text-gray-700 font-[800]">IT-Bangmod Kradan Kanban</h1>
			</div>
			<div class=" flex flex-row gap-[15px] h-[75%]">
				<div class="flex w-[202px] h-[45px] px-[5px] m-[auto] border border-[#BDBDBD] rounded-[4px]">
					<select class="w-[200px]">
						<option>Show: All</option>
						<option>Show: Test</option>
						<option>Show: Test</option>
					</select>
				</div>
				<div class="w-[45px] h-[45px] m-[auto] border border-[#BDBDBD] rounded-[4px]">
					<div class="flex justify-center mt-[5px]">
						<img src="/image/up-and-down-icon.png" class="w-[30px] h-[30px]">
					</div>
				</div>
				<div class="w-[45px] h-[45px] m-[auto] border border-[#BDBDBD] rounded-[4px]">
					<div class="flex justify-center mt-[5px]">
						<img src="/image/filter-icon.png" class="w-[30px] h-[30px]">
					</div>
				</div>
			</div>
		</div>
		<div class=" h-[500px]">
			<div class="flex justify-between items-center w-[100%] px-[20px] min-h-[45px] font-[550]">
				<div class="w-[10%]">
					<p>No</p>
				</div>
				<div class="w-[50%] px-[15px]">
					<p>
						Title
					</p>
				</div>
				<div class="w-[10%]">
					<p>
						Status
					</p>
				</div>
				<div class="w-[30%]">
					<p class="">
						Assignees
					</p>
				</div>
			</div>
			<div
				class=" flex items-center min-h-[55px] mb-[5px] px-[15px] border-dashed border-[3px] border-[#FFCB45] rounded-[8px]">
				<div class="flex flex-row w-[50%] ">
					<div class="mr-[10px]">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 6L12 18" stroke="#E2A300" stroke-width="2" stroke-linecap="round" />
							<path d="M18 12L6 12" stroke="#E2A300" stroke-width="2" stroke-linecap="round" />
						</svg>
					</div>
					<div class="font-[430]">Add New Task</div>
				</div>

			</div>
			<Listmodel :jobs="taskManagement.getAllTask()" v-if="taskManagement.getAllTask().length != 0">
				<template #default="slotprop">
					<router-link :to="{ path: '/task/' + slotprop.job.id }">
						<div class="itbkk-item flex justify-between w-[100%] min-h-[55px] px-[28px] py-[10px] mb-[3px] break-all border border-[#DDDDDD] rounded-[10px] bg-[#F9F9F9] reak-all hover:drop-shadow-2xl"
							:class="{
		'Doing': 'hover:border-l-[7px] hover:border-l-[#F55D30] ',
		'Done': 'hover:border-l-[7px] hover:border-l-[#30F558]',
		'To Do': 'hover:border-l-[7px] hover:border-l-[#F5C330]',
		'No Status': 'hover:border-l-[7px] hover:border-l-gray-500'
	}[slotprop.job.taskStatus]" @click="modalHandler(slotprop.job.id)">
							<div class="w-[10%] font-[350]">
								<p class="m-[auto]">
									{{ slotprop.job.id }}
								</p>
							</div>
							<div class="w-[50%]">
								<div class="itbkk-title px-[15px] font-[430] ">
									{{ slotprop.job.taskTitle }}
								</div>
							</div>
							<div class="w-[10%]">
								<div class="w-[100px] rounded-[5px] flex items-center justify-center" :class="{
		'Doing': 'bg-[#F55D30] ',
		'Done': 'bg-[#30F558]  ',
		'To Do': 'bg-[#F5C330]  ',
		'No Status': 'bg-gray-500'
	}[slotprop.job.taskStatus]
		">
									<p class="itbkk-status text-white">
										{{ slotprop.job.taskStatus }}
									</p>
								</div>
							</div>
							<div class="w-[30%] font-[350]">
								<p class="itbkk-assignees" :class="{ 'italic': !slotprop.job.taskAssignees }">
									{{
		slotprop.job.taskAssignees
			? slotprop.job.taskAssignees
			: "Unassigned"
									}}
								</p>

							</div>
							<div class="flex justify-center items-center">
								<div>
									<svg width="7" height="30" viewBox="0 0 7 30" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<circle cx="3.5" cy="3.5" r="3.5" fill="#969696" />
										<circle cx="3.5" cy="26.5" r="3.5" fill="#969696" />
										<circle cx="3.5" cy="14.8335" r="3.5" fill="#969696" />
									</svg>
								</div>
							</div>
						</div>
					</router-link>
				</template>
			</Listmodel>
			<div v-else>
				<div
					class="w-[100%] border border-[#DDDDDD] rounded-[10px] bg-[#F9F9F9] min-h-[45px] flex items-center justify-center">
					<div class="m-[auto]">NO TASK LIST</div>
				</div>
			</div>


		</div>
	</div>

</template>

<style scoped></style>
