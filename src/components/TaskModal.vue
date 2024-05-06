<script setup>
import { ref } from "vue"
const emit = defineEmits(["back", "confirm"]);
const props = defineProps({
  taskDetails: {
    type: Object,
    default: { title: "", assignees: "", description: "", status: "NO_STATUS" }

  },
  timeZone: {
    type: String,
    default: null,
  },
  mode: {
    type: String,
    default: "read"
  }
});
const oldTask = ref({ ...props.taskDetails });
const isDisable = ref(true)

function saveBthHandler() {
  if (JSON.stringify({ ...oldTask.value }) !== JSON.stringify({ ...props.taskDetails }) && oldTask.value.title) {
    isDisable.value = false
    return
  }
  if (props.mode === 'add' && props.taskDetails.title) {
    isDisable.value = false
    return
  }
  isDisable.value = true
}

</script>

<template>
  <div class="backdrop-blur-sm bg-black/50 w-screen h-screen fixed top-0 left-0 font-nonto">
    <div class="flex justify-center items-center w-[100%] h-[100%]">
      <div class="w-[75%] h-[90%] rounded-[15px] bg bg-white">
        <header class="h-[10%] px-[25px] mb-[10px] pt-[10px] bg bg-[#F8F8F8] border-b-2 rounded-t-[7px]">
          <div v-show="mode !== 'read'">{{ mode === 'add' ? 'New Task' : 'Edit Task' }}</div>
          <textarea class="itbkk-title h-[40px] w-[100%] text-[22px] font-[500] break-all" :disabled="mode === 'read'"
            placeholder="input some title" v-model="taskDetails.title"
            @input="saveBthHandler">{{ taskDetails.title }}</textarea>
        </header>
        <main class="flex flex-row h-[80%] px-[25px] ">
          <div class="w-[70%] h-[100%] py-[10px]">
            <p class="font-[600]">Description</p>
            <textarea v-if="mode !== 'read'"
              class="itbkk-description w-[95%] h-[90%] px-[15px] border-[2px] border-gray-400 rounded-[8px]"
              v-model="taskDetails.description" @input="saveBthHandler">
            </textarea>
            <div v-if="mode === 'read'"
              class="itbkk-description w-[95%] h-[90%] px-[15px] py-[10px] border-[2px] border-gray-400 rounded-[8px] break-all"
              :class="{ 'italic text-gray-500': !taskDetails.description }">
              {{
            taskDetails.description
              ? taskDetails.description
              : "No Description Provided"
          }}
            </div>
          </div>
          <div class="flex flex-col w-[30%] h-[94%]">
            <div class="flex flex-col h-[45%] py-[10px] mb-[15px]">
              <p class="font-[650] ">
                Assignees
              </p>
              <textarea v-if="mode !== 'read'"
                class="itbkk-assignees px-[10px] py-[12px] border-[2px] border-gray-300 rounded-[4px] break-all"
                v-model="taskDetails.assignees"></textarea>
              <div v-if="mode === 'read'"
                class="itbkk-assignees min-h-[180px] px-[10px] py-[12px] border-[2px] border-gray-300 rounded-[4px] break-all"
                :class="{ 'italic text-gray-500': !taskDetails.assignees }" @input="saveBthHandler">
                {{
            taskDetails.assignees ? taskDetails.assignees : "Unassigned"
          }}
              </div>
            </div>
            <div class="flex flex-col justify-between h-[55%]">
              <div>
                <p class="font-[600]">
                  Status
                </p>
                <div class="border border-gray-300 min-h-[50px] rounded-[5px]">
                  <select name="status" class="itbkk-status w-full h-full min-h-[50px] px-[15px]"
                    v-model="taskDetails.status" @change="saveBthHandler">
                    <option :selected="taskDetails?.status === 'NO_STATUS'" value="NO_STATUS">No Status</option>
                    <option :selected="taskDetails?.status === 'TO_DO'" value="TO_DO">To Do</option>
                    <option :selected="taskDetails?.status === 'DOING'" value="DOING">Doing</option>
                    <option :selected="taskDetails?.status === 'DONE'" value="DONE">Done</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-[15px]" v-if="mode !== 'add'">
                <div class="itbkk-timezone flex">
                  <p class="font-[600] mr-[10px]">TimeZone:</p>
                  <p class="ml-[auto]">{{ timeZone }}</p>
                </div>
                <div class="itbkk-created-on flex">
                  <p class="font-[600]">Created On:</p>
                  <p class="ml-[auto]">{{ taskDetails.createdOn }}</p>
                </div>
                <div class="itbkk-updated-on flex">
                  <p class="font-[600]">Updated On:</p>
                  <p class="ml-[auto]">{{ taskDetails.updatedOn }}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer class="h-[10%] px-[25px] border-t-2 border-gray-300 bg bg-[#F8F8F8] rounded-b-[7px]">
          <div class="flex flex-row justify-end items-center gap-[15px] mt-[10px]">
            <button
              class="itbkk-button itbkk-button-confirm flex w-[65px] h-[40px] font-[600] text-white bg bg-green-500 rounded-[3px] hover:bg-green-600"
              @click="$emit('confirm', mode, taskDetails)" :disabled="isDisable">
              <!-- <button class="m-[auto]">{{ mode !== 'read' ? 'Save' : 'Ok' }}</button> -->
              <div class="m-[auto] disabled">
                {{ mode !== 'read' ? 'Save' : 'Ok' }}
              </div>
            </button>
            <div
              class="itbkk-button itbkk-button-cancel flex w-[80px] h-[40px] font-[600] text-gary-800 bg bg-gray-200 hover:bg-gray-300"
              @click="$emit('back', false)">
              <button class="m-[auto]">Cancel</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped></style>