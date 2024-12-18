<template>
    <div class="w-full h-full p-8">
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
            <!-- <n-button @click="handleRestart">
                <template #icon>
                    <div class="i-carbon-restart"></div>
                </template>
                重新开始
            </n-button> -->
        </div>

        <n-card class="w-full  bg-white rounded-lg shadow-lg relative  mt-8">
            <div ref="resultRef" class="p-8">
                <!-- 水印背景 -->
                <div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <div class="transform rotate-30 text-7xl font-bold text-gray-300">
                        {{ currentUser?.name }} {{ certificateNo }}
                    </div>
                </div>

                <!-- 证书标题 -->
                <div class="text-center ">
                    <p class="text-3xl font-bold m-1">成绩证书</p>
                    <p class="text-gray-500">证书编号：{{ certificateNo }}</p>
                </div>

                <!-- 用户信息 -->
                <div class="mb-8 leading-loose">
                    <div class="text-lg mb-4">
                        尊敬的 <span class="font-bold text-xl">{{ currentUser?.name }}</span> 同学：
                    </div>
                    <div class="text-gray-700">
                        恭喜您完成了全部课程学习并通过考试。现特发此证书，以资鼓励！
                    </div>
                </div>

                <!-- 成绩展示 -->
                <div class="flex flex-col justify-center items-center mb-12 bg-gray-50 rounded-lg p-6">
                    <div class="text-center">
                        <div class="text-7xl font-bold text-primary mb-2">
                            {{ currentUser?.examScore }}
                        </div>
                        <div class="text-gray-500">总分</div>
                    </div>
                    <n-divider />
                    <div class="text-center">
                        <div class="text-4xl font-bold text-success mb-2">
                            {{ formatDate(currentUser?.examTime) }}
                        </div>
                        <div class="text-gray-500">考试时间</div>
                    </div>
                </div>

                <!-- 学习情况 -->
                <div class="mb-12">
                    <h3 class="text-lg font-bold mb-4 flex items-center">
                        学习完成情况
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div v-for="video in videos" :key="video.id" class="flex items-center p-3 bg-gray-50 rounded">
                            <n-icon class="text-success mr-2">
                                <div class="i-carbon-checkmark-filled"></div>
                            </n-icon>
                            <div class="text-sm">{{ video.title }}</div>
                        </div>
                    </div>
                </div>

                <!-- 签章区域 -->
                <div class="flex justify-between items-end mt-12">
                    <div class="text-gray-500 text-sm">
                        发证日期：{{ formatDate(new Date()) }}
                    </div>
                    <!-- <div class="text-right relative">
                    <img src="../assets/seal.png" class="w-24 h-24 absolute bottom-0 right-0 opacity-80" />
                </div> -->
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
            backgroundColor: '#ffffff'
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
            backgroundColor: '#ffffff'
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
.rotate-30 {
    transform: rotate(-30deg);
}

.text-primary {
    color: #18a058;
}

.text-success {
    color: #18a058;
}

.bg-primary {
    background-color: #18a058;
}

/* 打印样式优化 */
@media print {
    .no-print {
        display: none;
    }

    .shadow-lg {
        box-shadow: none !important;
    }

    .bg-gray-50 {
        background-color: #fafafa !important;
    }
}
</style>
