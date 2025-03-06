<template>
    <APPExam  :showConfirmDialog="showConfirmDialog" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDialog } from 'naive-ui'
import APPExam from '../components/APPExam.vue'

const dialog = useDialog()
const examRef = ref()

// 提供确认对话框方法给子组件
const showConfirmDialog = () => {
    return new Promise((resolve) => {
        dialog.warning({
            title: '确认离开',
            content: '考试尚未提交，确定要离开吗？离开后答题记录将丢失。',
            positiveText: '确认离开',
            negativeText: '取消',
            onPositiveClick: () => resolve(true),
            onNegativeClick: () => resolve(false),
            onClose: () => resolve(false)
        })
    })
}

// 暴露方法给子组件
defineExpose({
    showConfirmDialog
})
</script>

<style scoped></style>
