<template>
    <div class="w-full h-full flex flex-col items-center justify-center p-8">
        <div ref="resultRef" class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
            <!-- 证书标题 -->
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold mb-2">学习证明</h1>
                <div class="text-gray-500">{{ formatDate(currentUser?.examTime) }}</div>
            </div>

            <!-- 用户信息 -->
            <div class="mb-8">
                <div class="text-lg mb-4">
                    尊敬的 <span class="font-bold">{{ currentUser?.name }}</span> 同学：
                </div>
                <div class="leading-relaxed text-gray-700">
                    恭喜您完成了全部课程学习并参加考试。您的考试成绩为：
                </div>
            </div>

            <!-- 成绩展示 -->
            <div class="flex justify-center mb-8">
                <div class="text-6xl font-bold text-primary">
                    {{ currentUser?.examScore }}
                </div>
                <div class="text-2xl mt-auto mb-2 ml-2">分</div>
            </div>

            <!-- 学习情况 -->
            <!-- <div class="mb-8">
                <h3 class="text-lg font-bold mb-4">学习情况：</h3>
                <div class="space-y-2">
                    <div v-for="video in videos" :key="video.id" class="flex items-center">
                        <div class="text-green-500 mr-2">✓</div>
                        <div>{{ video.title }}</div>
                    </div>
                </div>
            </div> -->

            <!-- 签章区域 -->
            <div class="text-right mt-12">
                <div class="text-gray-600">
                    {{ new Date().toLocaleDateString() }}
                </div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="mt-8 space-x-4">
            <n-button type="primary" @click="exportAsPNG" :loading="exporting">
                导出为图片
            </n-button>
            <n-button type="info" @click="exportAsPDF" :loading="exporting">
                导出为PDF
            </n-button>
            <n-button @click="handleRestart">
                重新开始
            </n-button>
        </div>

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
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { getUsers } = userStore
const { currentUser } = storeToRefs(userStore)
const resultRef = ref<HTMLElement>()
const exporting = ref(false)
const message = useMessage()
const emit = defineEmits(['restart'])
const showConfirm = ref(false)

// 格式化日期
const formatDate = (timestamp?: number) => {
    if (!timestamp) return ''
    return new Date(timestamp).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
/* 添加一些打印样式 */
@media print {
    .no-print {
        display: none;
    }
}

/* 主题色 */
.text-primary {
    color: #18a058;
}
</style>
