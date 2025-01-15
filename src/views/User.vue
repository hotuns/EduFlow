<template>
    <div class="w-full h-full p-8">
        <!-- 如果有考试成绩，显示证书 -->
        <template v-if="hasExamScore">
            <Result />
        </template>

        <!-- 如果没有考试成绩 -->
        <template v-else>
            <!-- 操作按钮 -->
            <div class="flex justify-center w-full space-x-4">
                <n-button type="primary" size="large" @click="goToLearn">
                    <template #icon>
                        <div class="i-carbon-video"></div>
                    </template>
                    继续学习
                </n-button>
                <n-button type="info" size="large" @click="goToExam">
                    <template #icon>
                        <div class="i-carbon-exam-mode"></div>
                    </template>
                    参加考试
                </n-button>
            </div>

            <!-- 内容卡片 -->
            <n-card class="w-full mt-8 dark:bg-gray-800 rounded-lg">
                <div class="p-8">
                    <!-- 状态提示 -->
                    <div class="text-center mb-12">
                        <div class="i-carbon-warning text-6xl text-yellow-500 mb-4"></div>
                        <h2 class="text-2xl font-bold dark:text-gray-100 mb-2">未完成考试</h2>
                        <p class="dark:text-gray-400">
                            您还没有参加考试或未获得成绩，请先完成考试后再查看证书。
                        </p>
                    </div>

                    <!-- 学习进度 -->
                    <div class="mb-12 dark:bg-gray-700/30 rounded-lg p-6">
                        <h3 class="text-lg font-bold mb-6 flex items-center dark:text-gray-200">
                            <div class="i-carbon-education text-emerald-400 mr-2"></div>
                            学习进度
                        </h3>

                        <div class="space-y-6">
                            <!-- 视频进度 -->
                            <div class="flex items-center">
                                <div class="flex items-center gap-2 w-32">
                                    <div class="i-carbon-video text-emerald-400"></div>
                                    <span class="dark:text-gray-300">视频学习</span>
                                </div>
                                <n-progress type="line" :percentage="videoProgress" :indicator-placement="'inside'"
                                    processing :height="20" class="flex-1" />
                            </div>

                            <!-- 考试状态 -->
                            <div class="flex items-center">
                                <div class="flex items-center gap-2 w-32">
                                    <div class="i-carbon-exam text-emerald-400"></div>
                                    <span class="dark:text-gray-300">考试状态</span>
                                </div>
                                <n-tag :type="hasExamScore ? 'success' : 'warning'">
                                    {{ hasExamScore ? '已完成' : '未完成' }}
                                </n-tag>
                            </div>
                        </div>
                    </div>

                    <!-- 提示信息 -->
                    <div class="text-center dark:text-gray-400 text-sm">
                        完成考试后可获得学习证书
                    </div>
                </div>
            </n-card>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import Result from '../components/Result.vue'
import { dataManager } from '../datas'
const router = useRouter()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

// 检查是否有考试成绩
const hasExamScore = computed(() => {
    return currentUser.value?.examRecords && currentUser.value.examRecords.length > 0
})

// 获取所有视频总数（扁平化后）
const totalVideos = dataManager.getVideos().length
// 计算视频学习进度
const videoProgress = computed(() => {
    const videoStates = currentUser.value?.videoStates
    if (!videoStates?.length) return 0

    // 计算已完成的视频数量
    const completed = videoStates.reduce((count, state) => {
        return state.completed ? count + 1 : count
    }, 0)

    // 计算百分比
    return Math.min(Math.floor((completed / totalVideos) * 100), 100)
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
:deep(.n-progress-graph) {
    background-color: rgba(31, 41, 55, 0.5);
}

:deep(.n-progress-graph__fill) {
    background-color: rgb(52, 211, 153);
}

:deep(.n-card) {
    transition: all 0.3s ease;
}
</style>
