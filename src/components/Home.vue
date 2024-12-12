<template>
    <div class="w-full h-full p-2 flex justify-center items-center overflow-hidden">
        <div class="w-300px h-full">
            <n-steps vertical :current="current" :status="currentStatus">
                <n-step title="输入姓名" :description="nameTips" />
                <n-step title="学习视频" description="看完所有视频" />
                <n-step title="通过考试" description="回答问题完成考试" />
                <n-step title="查看成绩" description="查看您的成绩" />
            </n-steps>
        </div>


        <div class="w-full h-full overflow-y-auto">
            <n-card class="w-full h-full">
                <div v-if="current === 1" class="w-full h-full flex flex-col justify-center items-center space-y-4">
                    <n-input v-model:value="userName" placeholder="请输入您的姓名" />
                    <n-button @click="handleLogin" type="primary" block>下一步</n-button>
                </div>

                <!-- 学习视频 -->
                <Videos v-if="current === 2" @next="handleNext(3)" />

                <!-- 通过考试 -->
                <Exam v-if="current === 3" @next="handleNext(4)" />

                <!-- 查看成绩 -->
                <Result v-if="current === 4" />
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { StepsProps, useModal } from 'naive-ui';
import { useStore } from '../store';

const current = ref(1)
const currentStatus = ref<StepsProps['status']>('process')

const nameTips = computed(() => {
    if (current.value === 1) {
        return '请输入您的姓名'
    }
    return `${userName.value}，请完成后续步骤`
})

const userName = ref('')
provide('userName', userName)

const handleNext = (step: number) => {
    if (current.value === 1) {
        if (userName.value.length >= 2) {
            current.value = step
        }
    } else {
        current.value = step
    }
}

const message = useMessage()
const { userLogin, getUsers } = useStore()
const handleLogin = () => {
    const user = userLogin(userName.value)
    if (user && user.examScore && user.examTime) {
        message.info('您已通过考试, 请勿重复考试')
        current.value = 4
    } else {
        current.value = 2
    }
}

</script>

<style scoped></style>
