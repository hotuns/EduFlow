<template>
  <div class="home-container"
       :style="{ backgroundImage: `url(${bgGif})` }">
    <div class="overlay"></div>

    <div class="content-wrapper">
      <div class="logo-area">

      </div>

      <div class="content">
        <h1 class="title">
          <div>无人机教学</div>
          <div>培训软件</div>
        </h1>
        <p class="subtitle">
          开启您的学习之旅，提升专业技能
        </p>

        <div class="features">
          <div class="feature-card cursor-pointer"
               @click="goToLearn">
            <div class="i-carbon-video text-3xl text-emerald-400 mb-2"></div>
            <h3>视频学习</h3>
            <p>专业教学视频</p>
          </div>
          <div class="feature-card cursor-pointer"
               @click="goToExam">
            <div class="i-carbon-exam-mode text-3xl text-emerald-400 mb-2"></div>
            <h3>真题学习</h3>
            <p>经典真题练习</p>
          </div>
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
  router.push({ name: 'learn', query: { tab: 'video' } })
}

const goToExam = () => {
  router.push({ name: 'learn', query: { tab: 'questions' } })
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
  background: rgba(238, 238, 238, 0.8);
  backdrop-filter: blur(1px);
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
  color: #1f2937;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.2rem;
  color: #4b5563;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(247, 243, 243, 0.92);
  border: 1px solid rgba(229, 231, 235, 1);
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.feature-card h3 {
  color: #1f2937;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #4b5563;
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
</style>
