<script setup>
const emit = defineEmits(["close"])

const props = defineProps({
    type: {
        type: String,
        default: "success"
    },
    message: {
        type: String,
        require: true,
        default: 'undifiend'
    }
});

</script>

<template>
    <div class="flex justify-between px-[15px] py-[10px]" :class="type">
        <div>
            <h1 class="font-[700]">{{ type === 'success' ? 'Success' : 'Error' }}</h1>
            <p class="itbkk-message">
                {{ message }}
            </p>

        </div>
        <div class="cursor-pointer font-[700]" @click="$emit('close', false)">
            X
        </div>
    </div>
</template>

<style scoped>
.success {
    color: #047857;
    border-color: #047857;
    border-radius: 5px;
    background-color: #D1FAE5;
}

.error {
    color: #DC2626;
    border-color: #DC2626;
    border-radius: 5px;
    background-color: #FEE2E2;

}
</style>