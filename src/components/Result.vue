<template>
    <div class="w-full h-full p-8 ">
        <!-- 操作按钮 -->
        <div class="flex justify-center w-ful space-x-4">
            <n-button type="primary" @click="exportAsPNG" :loading="exporting">
                <template #icon>
                    <div class="i-carbon-image"></div>
                </template>
                导出为图片
            </n-button>
            <n-button type="info" @click="exportAsPDF" :loading="exporting">
                <template #icon>
                    <div class="i-carbon-document-pdf"></div>
                </template>
                导出为PDF
            </n-button>
        </div>

        <n-card class="w-full mt-8 dark:bg-gray-800 rounded-lg">
            <div ref="resultRef" class="p-8">
                <!-- 水印背景 -->
                <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <div class="transform rotate-30 text-9xl font-bold dark:text-gray-700">
                        {{ currentUser?.name }} {{ certificateNo }}
                    </div>
                </div>

                <!-- 证书标题 -->
                <div class="text-center">
                    <p class="text-3xl font-bold m-1 dark:text-gray-100">成绩证书</p>
                    <p class="dark:text-gray-400">证书编号：{{ certificateNo }}</p>
                </div>

                <!-- 用户信息 -->
                <div class="mb-8 leading-loose">
                    <div class="text-lg mb-4 dark:text-gray-300">
                        尊敬的 <span class="font-bold text-xl text-emerald-400">{{ currentUser?.name }}</span> 同学：
                    </div>
                    <div class="dark:text-gray-400">
                        恭喜您完成了全部课程学习并通过考试。现特发此证书，以资鼓励！
                    </div>
                </div>

                <!-- 成绩展示 -->
                <div class="flex flex-col justify-center items-center mb-12 dark:bg-gray-700/30 rounded-lg p-6">
                    <div class="text-center">
                        <div class="text-7xl font-bold text-emerald-400 mb-2">
                            {{ currentUser?.examScore }}
                        </div>
                        <div class="dark:text-gray-400">总分</div>
                    </div>
                    <n-divider class="dark:bg-gray-600" />
                    <div class="text-center">
                        <div class="text-4xl font-bold text-emerald-400 mb-2">
                            {{ formatDate(currentUser?.examTime) }}
                        </div>
                        <div class="dark:text-gray-400">考试时间</div>
                    </div>
                </div>

                <!-- 学习情况 -->
                <div class="mb-12">
                    <h3 class="text-lg font-bold mb-4 flex items-center dark:text-gray-200">
                        学习完成情况
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div v-for="video in videos" :key="video.id"
                            class="flex items-center p-3 dark:bg-gray-700/30 rounded">
                            <n-icon class="text-emerald-400 mr-2">
                                <div class="i-carbon-checkmark-filled"></div>
                            </n-icon>
                            <div class="text-sm dark:text-gray-300">{{ video.title }}</div>
                        </div>
                    </div>
                </div>

                <!-- 签章区域 -->
                <div class="flex justify-between items-end mt-12">
                    <div class="dark:text-gray-400 text-sm">
                        发证日期：{{ formatDate(new Date()) }}
                    </div>
                </div>
            </div>
        </n-card>

        <!-- 重新开始确认对话框 -->
        <n-modal v-model:show="showConfirm" preset="dialog" type="warning" title="提示" content="重新开始之前，请先导出保存您的学习证明。"
            positive-text="已经保存了" negative-text="还没保存" @positive-click="confirmRestart"
            @negative-click="showConfirm = false" />
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { storeToRefs } from 'pinia'
import { dataManager } from '../datas'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
const resultRef = ref<HTMLElement>()
const exporting = ref(false)
const message = useMessage()
const emit = defineEmits(['restart'])
const showConfirm = ref(false)

// 获取视频列表
const videos = computed(() => dataManager.getVideos())

// 生成证书编号
const certificateNo = computed(() => {
    const timestamp = currentUser.value?.examTime || Date.now()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `CERT-${timestamp.toString(36)}-${random}`
})

// 格式化日期
const formatDate = (date: Date | number | undefined) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// 导出为PNG
const exportAsPNG = async () => {
    if (!resultRef.value) return
    exporting.value = true

    try {
        const canvas = await html2canvas(resultRef.value, {
            scale: 2,
            backgroundColor: '#1f2937'
        })

        // 创建下载链接
        const link = document.createElement('a')
        link.download = `学习证明_${currentUser.value?.name}_${new Date().getTime()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()

        message.success('导出成功')
    } catch (error) {
        message.error('导出失败，请重试')
    } finally {
        exporting.value = false
    }
}

// 导出为PDF
const exportAsPDF = async () => {
    if (!resultRef.value) return
    exporting.value = true

    try {
        const canvas = await html2canvas(resultRef.value, {
            scale: 2,
            backgroundColor: '#1f2937'
        })

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width / 2, canvas.height / 2]
        })

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
        pdf.save(`学习证明_${currentUser.value?.name}_${new Date().getTime()}.pdf`)

        message.success('导出成功')
    } catch (error) {
        message.error('导出失败，请重试')
    } finally {
        exporting.value = false
    }
}

// 处理重新开始
const handleRestart = () => {
    showConfirm.value = true
}

// 确认重新开始
const confirmRestart = () => {
    emit('restart')
}
</script>

<style scoped>
/* 移除之前的打印样式覆盖 */
</style>
