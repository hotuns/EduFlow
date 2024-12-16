<template>
    <div class="w-full h-full p-4 flex gap-4 overflow-hidden">
        <!-- 左侧步骤条 -->
        <div class="w-300px h-full bg-white rounded-lg shadow-sm p-4">
            <n-steps vertical :current="current" :status="currentStatus">
                <n-step title="系统登陆" :description="nameTips">
                    <template #icon>
                        <div class="i-carbon-user-avatar text-lg" />
                    </template>
                </n-step>
                <n-step title="学习培训" description="观看教材学习">
                    <template #icon>
                        <div class="i-carbon-video text-lg" />
                    </template>
                </n-step>
                <n-step title="模拟考试" description="完成考试答题">
                    <template #icon>
                        <div class="i-carbon-exam-mode text-lg" />
                    </template>
                </n-step>
                <n-step title="查看成绩" description="查看学习证明">
                    <template #icon>
                        <div class="i-carbon-certificate text-lg" />
                    </template>
                </n-step>
            </n-steps>
        </div>

        <!-- 右侧内容区 -->
        <div class="flex-1 h-full overflow-y-auto">
            <n-card class="h-full" :bordered="false">
                <!-- 登录页面 -->
                <div v-if="current === 1" class="w-full h-full flex flex-col justify-center items-center space-y-6">
                    <div class="text-2xl font-bold mb-8">请输入您的姓名</div>
                    <div class="w-full max-w-sm space-y-4">
                        <n-input v-model:value="userName" placeholder="请输入您的姓名" size="large" round clearable
                            @keyup.enter="handleLogin" />
                        <n-button type="primary" size="large" round block @click="handleLogin"
                            :disabled="!userName.trim()">
                            开始学习
                        </n-button>
                    </div>
                </div>

                <!-- 学习视频 -->
                <Videos v-if="current === 2" @next="handleNext(3)" />

                <!-- 通过考试 -->
                <Exam v-if="current === 3" @next="handleNext(4)" />

                <!-- 查看成绩 -->
                <Result v-if="current === 4" @restart="handleRestart" />
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { StepsProps } from 'naive-ui'
import { useStore } from '../store'

const current = ref(1)
const currentStatus = ref<StepsProps['status']>('process')
const userName = ref('')
provide('userName', userName)

const nameTips = computed(() => {
    if (current.value === 1) {
        return '请输入您的姓名'
    }
    return `${userName.value}，请完成后续步骤`
})

// 处理步骤切换
const handleNext = (step: number) => {
    if (current.value === 1 && userName.value.trim().length < 2) {
        message.warning('请输入有效的姓名')
        return
    }
    current.value = step
}

// 处理登录
const message = useMessage()
const { userLogin, deleteUser } = useStore()
const handleLogin = () => {
    if (userName.value.trim().length < 2) {
        message.warning('请输入有效的姓名')
        return
    }

    const user = userLogin(userName.value.trim())
    if (user?.examScore !== undefined && user?.examTime) {
        message.info('您已完成学习和考试')
        current.value = 4
    } else {
        current.value = 2
        message.success('开始学习')
    }
}

// 监听用户名变化，清除空格
watch(userName, (val) => {
    userName.value = val.trim()
})

// 处理重新开始
const handleRestart = () => {
    // 重置状态
    current.value = 1
    userName.value = ''
    currentStatus.value = 'process'

    // 删除当前用户数据
    // deleteUser(userName.value)
}
</script>

<style scoped>
:deep(.n-card-header) {
    padding: 16px 24px;
}

:deep(.n-card__content) {
    padding: 24px;
}

/* 步骤条图标样式 */
:deep(.n-step-indicator) {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 卡片阴影效果 */
:deep(.n-card) {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
        0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
</style>
