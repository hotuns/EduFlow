<template>
    <div class="home-container" :style="{ backgroundImage: `url(${bgGif})` }">
        <div class="content">
            <h1 class="title">欢迎使用无人机培训系统</h1>
            <p class="subtitle">请选择左侧菜单开始您的学习之旅</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入GIF文件
import bgGif from '../assets/ZY500.gif?url'
</script>

<style>
.home-container {
    width: 100%;
    height: calc(100vh - 32px);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
}

.content {
    text-align: center;
}

.title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
}

.subtitle {
    font-size: 1.2rem;
    color: #666;
}

/* 深色模式支持 */
:root.dark .content {
    background-color: rgba(0, 0, 0, 0.8);
}

:root.dark .title {
    color: #fff;
}

:root.dark .subtitle {
    color: #ccc;
}
</style>
