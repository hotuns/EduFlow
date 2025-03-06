<template>
    <APPExam ref="examRef" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import APPExam from '../components/APPExam.vue'
import { setExamComponent } from '../route'

const examRef = ref()

onMounted(() => {
    setExamComponent(examRef.value)
})
</script>

<style scoped></style>
