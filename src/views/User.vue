<template>
    <div class="w-full h-full">
        <!-- 如果有考试成绩，显示证书 -->
        <template v-if="hasExamScore">
            <Result />
        </template>

        <!-- 如果没有考试成绩 -->
        <template v-else>
            <div class="flex flex-col items-center justify-center h-full">
                <div class="text-center mb-8">
                    <div class="i-carbon-warning text-6xl text-yellow-500 mb-4 inline-block"></div>
                    <h2 class="text-2xl font-bold mb-4">未完成考试</h2>
                    <p class="text-gray-500 mb-8">
                        您还没有参加考试或未获得成绩，请先完成考试后再查看证书。
                    </p>

                    <!-- 学习进度提示 -->
                    <div class="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
                        <h3 class="font-bold mb-4 flex items-center">
                            <span class="i-carbon-education mr-2"></span>
                            进度
                        </h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span>学习进度</span>
                                <n-progress type="line" :percentage="videoProgress" :indicator-placement="'inside'"
                                    processing :height="20" />
                            </div>
                            <div class="flex justify-between items-center">
                                <span>考试状态</span>
                                <n-tag :type="hasExamScore ? 'success' : 'warning'">
                                    {{ hasExamScore ? '已完成' : '未完成' }}
                                </n-tag>
                            </div>
                        </div>
                    </div>

                    <!-- 操作按钮 -->
                    <n-space justify="center">
                        <n-button type="primary" @click="goToLearn">
                            <template #icon>
                                <div class="i-carbon-video"></div>
                            </template>
                            继续学习
                        </n-button>
                        <n-button type="info" @click="goToExam">
                            <template #icon>
                                <div class="i-carbon-exam-mode"></div>
                            </template>
                            参加考试
                        </n-button>
                    </n-space>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import Result from '../components/Result.vue'

const router = useRouter()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

// 检查是否有考试成绩
const hasExamScore = computed(() => {
    return currentUser.value?.examScore !== undefined
})

// 计算视频学习进度
const videoProgress = computed(() => {
    console.log(currentUser.value?.videoStates)
    if (!currentUser.value?.videoStates) return 0
    const completed = currentUser.value.videoStates.filter(v => v.completed).length
    const total = currentUser.value.videoStates.length
    return total ? Math.round((completed / total) * 100) : 0
})

// 跳转到学习页面
const goToLearn = () => {
    router.push({ name: 'learn' })
}

// 跳转到考试页面
const goToExam = () => {
    router.push({ name: 'exam' })
}
</script>

<style scoped>
.n-progress {
    width: 200px;
}
</style>
