<script setup>
const emit = defineEmits(["back"]);
const props = defineProps({
  taskDetails: {
    type: Object,
  },
  timeZone: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="backdrop-blur-sm bg-black/50 w-screen h-screen fixed top-0 left-0 font-nonto">
    <div class="flex justify-center items-center w-[100%] h-[100%]">
      <div class="w-[75%] h-[90%] rounded-[15px] bg bg-white">
        <header
          class="h-[10%] px-[25px] mb-[10px] pt-[10px] bg bg-[#F8F8F8] border-b-2 border-gray-300 rounded-t-[7px]">
          <div class="itbkk-title text-[22px] font-[500] break-all">{{ taskDetails.taskTitle }}</div>
        </header>
        <main class="flex flex-row h-[80%] px-[25px] ">
          <div class="w-[70%] h-[100%] py-[10px]">
            <p class="font-[600]">Description</p>
            <textarea class="itbkk-description w-[95%] h-[90%] px-[15px] border-[2px] border-gray-400 rounded-[8px]"
              :class="{ 'italic text-gray-500': !taskDetails.taskDescription }">

						{{
            taskDetails.taskDescription
              ? taskDetails.taskDescription
              : "No Description Provided"
          }}
				    </textarea>
          </div>
          <div class="flex flex-col w-[30%] h-[94%]">
            <div class="flex flex-col h-[45%] py-[10px] mb-[15px]">
              <p class="font-[650] ">
                Assignees
              </p>
              <div
                class="itbkk-assignees min-h-[180px] px-[10px] py-[12px] border-[2px] border-gray-300 rounded-[4px] break-all"
                :class="{ 'italic text-gray-500': !taskDetails.taskAssignees }">
                {{
            taskDetails.taskAssignees ? taskDetails.taskAssignees : "Unassigned"
          }}
              </div>
            </div>
            <div class="flex flex-col justify-between h-[55%]">
              <div>
                <p class="font-[600]">
                  Status
                </p>
                <div class="itbkk-status border border-gray-300 min-h-[50px] rounded-[5px]">
                  <select name="status" class="w-full h-full min-h-[50px] px-[15px]">
                    <option value="no_status">No Status</option>
                    <option value="to_do">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-[15px] ">
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
            <div
              class="itbkk-button flex w-[65px] h-[40px] font-[600] text-white bg bg-green-500 rounded-[3px] hover:bg-green-600">
              <button class="m-[auto]">Ok</button>
            </div>
            <div class="itbkk-button flex w-[80px] h-[40px] font-[600] text-gary-800 bg bg-gray-200 hover:bg-gray-300"
              @click="$emit('back', false)">
              <button class="m-[auto]">Close</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped></style>