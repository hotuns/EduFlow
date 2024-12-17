<template>
    <div class="w-full h-full p-2">
        <n-tabs type="segment" animated>
            <n-tab-pane name="video" tab="视频学习">
                <Videos />
            </n-tab-pane>

            <n-tab-pane name="questions" tab="真题学习">
                <Questions />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script setup lang="ts">
import Questions from '../components/Questions.vue'
</script>

<style scoped></style>
