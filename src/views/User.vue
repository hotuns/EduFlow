<template>
  <div class="w-full h-full p-8">
    <h2 class="text-2xl font-bold dark:text-gray-100 mb-6">我的考试成绩</h2>

    <!-- 历史成绩查看功能 -->
    <div class="mb-12 dark:bg-gray-700/30 rounded-lg p-6">
      <h3 class="text-lg font-bold mb-6 flex items-center dark:text-gray-200">
        <div class="i-carbon-exam text-emerald-400 mr-2"></div>
        历史考试成绩
      </h3>

      <div v-if="userExamRecords.length > 0">
        <n-data-table :columns="historyColumns"
                      :data="userExamRecords"
                      :bordered="false"
                      striped
                      @row-click="handleRowClick"
                      :row-class-name="rowClassName" />
      </div>
      <div v-else
           class="text-center dark:text-gray-400 py-4">
        暂无考试记录，请先参加考试
      </div>
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
          <n-progress type="line"
                      :percentage="videoProgress"
                      :indicator-placement="'inside'"
                      processing
                      :height="20"
                      class="flex-1" />
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

    <!-- 操作按钮 -->
    <div class="flex justify-center w-full space-x-4">
      <n-button type="primary"
                size="large"
                @click="goToLearn">
        <template #icon>
          <div class="i-carbon-video"></div>
        </template>
        继续学习
      </n-button>
      <n-button type="info"
                size="large"
                @click="goToExam">
        <template #icon>
          <div class="i-carbon-exam-mode"></div>
        </template>
        参加考试
      </n-button>
    </div>

    <!-- 证书显示模态框 -->
    <n-modal v-model:show="showCertificate"
             style="width: 80%; max-width: 900px;">
      <n-card title="考试证书"
              :bordered="false"
              size="huge"
              style="width: 100%">
        <Result :exam-record="selectedRecord" />
        <template #footer>
          <div class="flex justify-end">
            <n-button @click="showCertificate = false">关闭</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import Result from '../components/Result.vue'
import { dataManager } from '../datas'
import { NTag, NModal, NCard, NButton } from 'naive-ui'
import { computed, ref, h } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

// 证书显示相关状态
const showCertificate = ref(false)
const selectedRecord = ref(null)

// 检查是否有考试成绩
const hasExamScore = computed(() => {
  return (
    currentUser.value?.examRecords && currentUser.value.examRecords.length > 0
  )
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

const userExamRecords = computed(() => {
  console.log(currentUser.value)
  return currentUser.value?.examRecords || []
})

// 处理行点击事件
const handleRowClick = (row) => {
  selectedRecord.value = row
  showCertificate.value = true
}

// 设置行样式，使其看起来可点击
const rowClassName = () => {
  return 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
}

// 历史成绩表格列定义
const historyColumns = [
  {
    title: '考试成绩',
    key: 'score',
    render(row) {
      const type = row.score >= 60 ? 'success' : 'error'
      return h(NTag, { type }, { default: () => `${row.score}分` })
    },
  },
  {
    title: '考试时间',
    key: 'time',
    render(row) {
      return new Date(row.time).toLocaleString()
    },
  },
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          onClick: (e) => {
            e.stopPropagation()
            selectedRecord.value = row
            showCertificate.value = true
          },
        },
        { default: () => '查看证书' }
      )
    },
  },
]

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
:deep(.n-card) {
  transition: all 0.3s ease;
}
</style>
