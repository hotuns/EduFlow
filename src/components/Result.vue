<template>
    <div v-if="currentUser">
        <p class="text-2xl font-bold">姓名：<span class="">{{ currentUser.name }}</span></p>
        <p class="text-2xl font-bold">成绩：<span class="">{{ currentUser.result }}</span></p>
        <p class="text-2xl font-bold">用时：<span class="">{{ currentUser.resultTime }}</span></p>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '../store';

const { getUsers } = useStore()

const userName = inject('userName') as Ref<string>

const currentUser = computed(() => {
    return getUsers.value.find((user: any) => user.name === userName.value)
})


</script>

<style scoped></style>
