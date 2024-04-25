<script setup>
const closebutton = false;
defineEmits = ["back"];
</script>

<template>
  <div
    :class="closebutton"
    class="kuykuy bg-grey-500 backdrop-blur-sm w-screen h-screen fixed top-0 left-0 pt-[100px]"
  >
    <div class="itbkk-title w-full border-b-2 border-gray pl-6">
      <h1 class="p-2 text-2xl">Design Backend API for PBI 1,2</h1>
    </div>

    <br />
    <!-- description -->
    <div class="flex">
      <br />
      <div>
        <p class="ml-7">Description</p>
        <div
          class="itbkk-description ml-7 w-[950px] h-[450px] border border-black rounded-lg"
        >
          kuy 1
        </div>
      </div>
      <div class="flex flex-col ml-10">
        <div><p>Assignees</p></div>
        <div
          class="itbkk-assignees w-[400px] h-[200px] border border-black rounded-lg"
        >
          kuy 2
        </div>
        <!-- status -->
        <div class="itbkk-status w-[200px] h-[45px] mt-5">
          <label class="" for="cars"><p class="pl-1">Status</p></label>

          <select name="status">
            <option value="no_status">No Status</option>
            <option value="to_do">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        <!-- timezone -->
        <div class="ml-3 mt-5 flex flex-col">
          <div class="flex flex-wrap">
            <p>Time Zone</p>
            <div
              class="itbkk-timezone w-[300px] h-[40px] border border-black rounded-lg ml-8"
            >
              kuy 4
            </div>
          </div>
          <div class="flex flex-wrap mt-6">
            <p>Created On</p>
            <div
              class="itbkk-created-on w-[300px] h-[40px] border border-black rounded-lg ml-6"
            >
              kuy 5
            </div>
          </div>
          <div class="flex flex-wrap mt-6">
            <p>Updated On</p>
            <div
              class="itbkk-updated-on w-[300px] h-[40px] border border-black rounded-lg ml-4"
            >
              kuy 6
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="itbkk-* border-t-2 mt-6 flex flex-row-reverse">
      <div class="flex mt-5 mr-10">
        <button
          v-show="true"
          class="itbkk-button border-white border-2 rounded-2 text-white bg-green-400"
        >
          ok
        </button>
        <button
          class="itbkk-button border-white border-2 rounded-2 text-white bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
