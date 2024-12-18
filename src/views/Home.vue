<template>
    <div class="home-container" :style="{ backgroundImage: `url(${bgGif})` }">
        <div class="overlay"></div>

        <div class="content-wrapper">
            <div class="logo-area">
                <div class="logo-icon i-carbon-drone text-6xl text-emerald-400 mb-6"></div>
            </div>

            <div class="content">
                <h1 class="title">
                    欢迎使用<span class="text-emerald-400">无人机培训系统</span>
                </h1>
                <p class="subtitle">
                    开启您的学习之旅，提升专业技能
                </p>

                <div class="features">
                    <div class="feature-card">
                        <div class="i-carbon-video text-3xl text-emerald-400 mb-2"></div>
                        <h3>视频学习</h3>
                        <p>专业的教学视频</p>
                    </div>
                    <div class="feature-card">
                        <div class="i-carbon-exam-mode text-3xl text-emerald-400 mb-2"></div>
                        <h3>真题考试</h3>
                        <p>全面的知识测评</p>
                    </div>
                </div>

                <div class="mt-12">
                    <n-button type="primary" size="large" @click="goToLearn">
                        <template #icon>
                            <div class="i-carbon-play-filled"></div>
                        </template>
                        开始学习
                    </n-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import bgGif from '../assets/ZY500.gif?url'

const router = useRouter()

const goToLearn = () => {
    router.push({ name: 'learn' })
}
</script>

<style scoped>
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

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(4px);
}

.content-wrapper {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.logo-area {
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
}

.content {
    text-align: center;
    max-width: 800px;
}

.title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 1rem;
    letter-spacing: 1px;
}

.subtitle {
    font-size: 1.2rem;
    color: #9ca3af;
    margin-bottom: 3rem;
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.feature-card {
    background: rgba(31, 41, 55, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
    background: rgba(31, 41, 55, 0.8);
    border-color: rgba(52, 211, 153, 0.3);
}

.feature-card h3 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.feature-card p {
    color: #9ca3af;
    font-size: 0.9rem;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

/* 响应式设计 */
@media (max-width: 640px) {
    .title {
        font-size: 2rem;
    }

    .features {
        grid-template-columns: 1fr;
    }
}
</style>
