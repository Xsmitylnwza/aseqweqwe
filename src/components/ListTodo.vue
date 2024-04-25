<script setup>
import { onMounted, ref } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import testVue from "./test.vue";
import Listmodel from "./ListModel.vue";
import { getTodoById, getTodos } from "@/util/fetchUtils";

const router = useRouter();
const tasks = ref([]);
const isTeleport = ref(false);
const taskDetails = ref();

async function modalHandler(id) {
  taskDetails.value = await getTodoById(
    import.meta.env.VITE_BASE_URL + "/tasks",
    id
  );
  taskDetails.value.createdOn = convertUtils(taskDetails.value.createdOn);
  taskDetails.value.updatedOn = convertUtils(taskDetails.value.updatedOn);
  isTeleport.value = true;
}

console.log(convertUtils("2024-04-22T09:00:00Z"));

function convertUtils(yeahman) {
  const formattedTimeZone = formatTimeZone(yeahman);
  console.log(formattedTimeZone);
  const [date, timeString] = formattedTimeZone.split(",");
  console.log(date);
  console.log(timeString);
  const dateformat = convertDateFormat(date);
  console.log(dateformat);
  const timeformat = convertTimeTo24HourFormat(timeString.substring(1));
  return `${dateformat} ${timeformat}`;
}

function convertTimeTo24HourFormat(timeString) {
  const [time, period] = timeString.split(" ");
  let [hour, minute, second] = time.split(":");

  if (period === "PM" && hour !== "12") {
    hour = String(Number(hour) + 12);
  }

  if (period === "AM" && hour === "12") {
    hour = "00";
  }

  return `${hour}:${minute}:${second}`;
}

function convertDateFormat(dateString) {
  return dateString.replace(/\//g, "-");
}

function formatTimeZone(timestampString) {
  const timestamp = new Date(timestampString);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedtimestamp = timestamp.toLocaleString("en-US", {
    timeZone: userTimeZone,
  });
  return formattedtimestamp;
}

function closeModal(isClose) {
  isTeleport.value = isClose;
  router.go(-1);
}

onMounted(async () => {
  const listTodo = await getTodos(import.meta.env.VITE_BASE_URL + "/tasks");
  tasks.value = listTodo;
});
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
        <testVue
          @back="closeModal"
          :taskDetails="taskDetails"
          :timeZone="Intl.DateTimeFormat().resolvedOptions().timeZone"
        />
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
                  @click="modalHandler(slotprop.job.id)"
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
