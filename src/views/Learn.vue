<template>
    <div class="w-full h-full p-2">
        <n-tabs type="segment" animated v-model:value="activeTab">
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Videos from '../components/Videos.vue'
import Questions from '../components/Questions.vue'

const route = useRoute()
const activeTab = ref('video')

onMounted(() => {
    // 根据路由参数设置激活的标签
    const tab = route.query.tab as string
    if (tab === 'questions' || tab === 'video') {
        activeTab.value = tab
    }
})
</script>

<style scoped></style>
