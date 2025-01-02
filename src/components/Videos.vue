<template>
    <div class="w-full h-full flex flex-col space-y-4">
        <!-- 视频列表 -->
        <div class="w-full">
            <n-tabs type="line" animated>
                <n-tab-pane v-for="group in videoGroups" :key="group.group" :name="group.group" :tab="group.group">
                    <div class="flex flex-wrap gap-2">
                        <n-button v-for="video in group.videos" :key="video.id"
                            :type="video.id === currentVideo ? 'primary' : 'default'"
                            :disabled="!canPlayVideo(video.id)" :class="{ 'opacity-60': !canPlayVideo(video.id) }"
                            @click="playVideo(video.id)">
                            <template #icon>
                                <div v-if="isVideoCompleted(video.id)"
                                    class="i-carbon-checkmark-filled text-emerald-400">
                                </div>
                                <div v-else class="i-carbon-video"></div>
                            </template>
                            {{ video.title }}
                        </n-button>
                    </div>
                </n-tab-pane>
            </n-tabs>
        </div>

        <n-divider />

        <!-- 视频播放区域 -->
        <div class="flex-1 flex flex-col space-y-4">
            <!-- 视频标题 -->
            <div class="text-lg font-bold dark:text-gray-200">
                <!-- {{ currentVideoData?.title }} -->
                  {{ videoUrl }}
            </div>

            <!-- 视频播放器容器 -->
            <div class="relative flex-1">
                <video ref="videoRef" class="w-full h-full bg-gray-800 rounded-lg" @timeupdate="handleTimeUpdate"
                    @ended="handleVideoEnd">
                    <source :src="videoUrl" type="video/mp4">
                </video>

                <!-- 播放/暂停遮罩层 -->
                <div class="absolute inset-0 bg-transparent cursor-pointer" @click="togglePlay">
                    <!-- 播放/暂停图标 -->
                    <div v-show="!isPlaying" class="absolute inset-0 flex items-center justify-center">
                        <div class="p-4 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors">
                            <div class="i-carbon-play-filled text-3xl"></div>
                        </div>
                    </div>
                </div>

                <!-- 播放时间提示 -->
                <div class="absolute bottom-2 right-2 px-2 py-1 text-sm text-white bg-black/50 rounded">
                    {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                </div>
            </div>

            <!-- 播放控制区域 -->
            <div class="flex items-center space-x-4 p-2">
                <n-button @click="togglePlay" :type="isPlaying ? 'warning' : 'primary'">
                    <template #icon>
                        <div :class="isPlaying ? 'i-carbon-pause' : 'i-carbon-play'"></div>
                    </template>
                    {{ isPlaying ? '暂停' : '播放' }}
                </n-button>

                <n-dropdown :options="speedOptions" @select="handleSpeedChange" trigger="click">
                    <n-button size="small">
                        {{ playbackSpeed }}x
                    </n-button>
                </n-dropdown>

                <!-- 修改进度条，添加可拖动功能 -->
                <div class="flex-1">
                    <n-slider v-if="duration > 0" :value="currentTime" :max="duration" :step="1" :tooltip="false"
                        :disabled="!isVideoCompleted(currentVideo)" @update:value="handleTimeChange" />
                </div>

                <!-- 时间显示 -->
                <div class="text-sm dark:text-gray-300 whitespace-nowrap">
                    {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { dataManager, type VideoState } from '../datas'
import { useUserStore } from '../store'
import { useMessage } from 'naive-ui'
import path from 'path'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['next'])
const message = useMessage()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const videoRef = ref<HTMLVideoElement>()
const currentVideo = ref(1)
const lastPosition = ref(0)
const dataPath = ref('')

// 获取视频分组
const videoGroups = computed(() => dataManager.getVideoGroups())

// 获取当前视频数据
const currentVideoData = computed(() => {
    return dataManager.getVideoById(currentVideo.value)
})

// 获取视频状态
const getVideoStates = () => {
    const states = userStore.getVideoStates(currentUser.value?.name || '')
    return new Map(states.map(state => [state.id, state]))
}

// 保存视频状态
const saveVideoState = (videoId: number, completed: boolean, position: number = 0) => {
    const states = Array.from(getVideoStates().values())
    const existingIndex = states.findIndex(s => s.id === videoId)

    const newState: VideoState = {
        id: videoId,
        completed,
        lastPosition: position
    }

    if (existingIndex >= 0) {
        states[existingIndex] = newState
    } else {
        states.push(newState)
    }

    userStore.saveVideoStates(currentUser.value?.name || '', states)
}

// 添加一个状态更新标记
const stateUpdateFlag = ref(0)

// 修改 canPlayVideo 函数，依赖这个标记
const canPlayVideo = (videoId: number) => {
    // 使用标记触发响应式更新
    stateUpdateFlag.value
    if (videoId === 1) return true
    const states = getVideoStates()
    return states.get(videoId - 1)?.completed === true
}

// 检查视频是否完成
const isVideoCompleted = (videoId: number) => {
    // 使用标记触发响应式更新
    stateUpdateFlag.value
    const states = getVideoStates()
    return states.get(videoId)?.completed ?? false
}

// 检查所有视频是否完成
const allVideosCompleted = computed(() => {
    // 使用标记触发响应式更新
    stateUpdateFlag.value
    const states = getVideoStates()
    return dataManager.getVideos().every(video => states.get(video.id)?.completed)
})

// 播放指定视频
const playVideo = (videoId: number) => {
    if (!canPlayVideo(videoId)) {
        message.warning('请先完成前面的视频')
        return
    }
    currentVideo.value = videoId
    const states = getVideoStates()
    const state = states.get(videoId)

    // 暂停当前视频
    if (videoRef.value) {
        videoRef.value.pause()
    }
    isPlaying.value = false
    

    // 重置当前时间和进度
    currentTime.value = 0
    duration.value = 0
    lastPosition.value = 0

    
    

    // 更新视频 URL
    videoUrl.value // 确保 videoUrl 被计算

    nextTick(() => {
        if (videoRef.value) {
            // 如果视频未完成，从上次位置继续播放
            if (state && !state.completed) {
                videoRef.value.currentTime = state.lastPosition
            } else {
                // 如果是新视频或已完成的视频，从头开始播放
                videoRef.value.currentTime = 0
            }
            // 设置倍速
            videoRef.value.playbackRate = playbackSpeed.value
            videoRef.value.load()
        }
    })
}

// 处理时间变化
const handleTimeChange = (time: number) => {
    if (!videoRef.value) return

    // 如果视频已完成，允许自由拖动
    if (isVideoCompleted(currentVideo.value)) {
        videoRef.value.currentTime = time
        return
    }

    // 如果视频未完成，限制只能拖到已播放位置
    if (time > lastPosition.value) {
        videoRef.value.currentTime = lastPosition.value
        message.warning('首次观看时不能拖动到未播放的位置')
    } else {
        videoRef.value.currentTime = time
    }
}

// 视频进度更新处理
const handleTimeUpdate = () => {
    if (!videoRef.value) return
    currentTime.value = videoRef.value.currentTime
    duration.value = videoRef.value.duration

    // 只有未完成的视频才更新 lastPosition
    if (!isVideoCompleted(currentVideo.value)) {
        lastPosition.value = Math.max(lastPosition.value, currentTime.value)
        saveVideoState(currentVideo.value, false, lastPosition.value)
    }
}

// 视频播放完成处理
const handleVideoEnd = async () => {
    // 先保存状态
    saveVideoState(currentVideo.value, true)

    // 触发状态更新
    stateUpdateFlag.value++

    message.success(`${currentVideoData.value?.title}学习完成！`)

    // 暂停视频
    if (videoRef.value) {
        videoRef.value.pause()
    }
}

// 添加新的状态
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

// 格式化时间
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 播放/暂停切换
const togglePlay = async () => {
    if (!videoRef.value) return
    try {
        if (isPlaying.value) {
            await videoRef.value.pause()
        } else {
            // 设置默认音量
            videoRef.value.volume = 0.5
            await videoRef.value.play()
        }
    } catch (error) {
        message.error('视频播放失败，请重试')
    }
}

// 监听视频播放状态
onMounted(async () => {
    if (!videoRef.value) return

    videoRef.value.addEventListener('play', () => {
        isPlaying.value = true
    })

    videoRef.value.addEventListener('pause', () => {
        isPlaying.value = false
    })

    videoRef.value.addEventListener('loadedmetadata', () => {
        duration.value = videoRef.value?.duration || 0
        // 设置倍速
        videoRef.value!.playbackRate = playbackSpeed.value
    })

    // 找到第一个未完成的视频
    const states = getVideoStates()
    for (const video of dataManager.getVideos()) {
        if (!states.get(video.id)?.completed) {
            currentVideo.value = video.id
            break
        }
    }

    // 获取数据目录路径
    dataPath.value = dataManager.getDataPath()

    try {
        // 检查视频文件是否存在
        const videoPath = path.join('videos', currentVideoData.value?.url || '')
        const exists = await window.ipcRenderer.invoke('check-file-exists', videoPath)
        if (!exists) {
            message.error('视频文件不存在，请检查视频文件是否正确放置')
            return
        }
    } catch (error) {
        message.error('数据加载失败')
    }
})

// 计算播放进度百分比
const percentage = computed(() => {
    if (!duration.value) return 0
    return Math.floor((currentTime.value / duration.value) * 100)
})

// 添加倍速相关状态
const playbackSpeed = ref(1)
const speedOptions = [
    {
        label: '1.0x',
        key: 1
    },
    {
        label: '1.5x',
        key: 1.5
    },
    {
        label: '2.0x',
        key: 2
    },
    {
        label: '5.0x',
        key: 5
    }
]

// 处理倍速变化
const handleSpeedChange = (speed: number) => {
    if (!videoRef.value) return
    playbackSpeed.value = speed
    videoRef.value.playbackRate = speed
}

// 修改视频 URL 计算
const videoUrl = computed(() => {
    if (!currentVideoData.value) return ''
    // 使用 file:// 协议加载本地文件
    const videoPath = path.join(dataPath.value, 'videos', currentVideoData.value.url)
    return `file://${videoPath}`
})
</script>

<style scoped>
/* 完全隐藏所有原生控件 */
video::-webkit-media-controls {
    display: none !important;
}

video::-webkit-media-controls-enclosure {
    display: none !important;
}

/* 移除默认的点击高亮效果 */
.cursor-pointer {
    -webkit-tap-highlight-color: transparent;
}

/* 确保视频容器样式正确 */
.relative {
    position: relative;
}

.absolute {
    position: absolute;
}

.inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

/* 播放按钮悬停效果 */
.bg-black\/30 {
    transition: background-color 0.2s;
}

.bg-black\/30:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

/* 添加新样式 */
:deep(.n-tabs-nav) {
    @apply mb-4;
}

:deep(.n-button) {
    @apply dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700;
}

:deep(.n-button--primary-type) {
    @apply dark:bg-emerald-600 dark:border-emerald-600 dark:text-white;
}

:deep(.n-button:not(:disabled):hover) {
    @apply dark:bg-gray-700;
}

:deep(.n-button--primary-type:not(:disabled):hover) {
    @apply dark:bg-emerald-500;
}

.opacity-60 {
    opacity: 0.6;
}

/* 进度条样式 */
:deep(.n-slider) {
    @apply dark:bg-gray-700;
}

:deep(.n-slider-rail__fill) {
    @apply bg-emerald-500;
}

:deep(.n-slider-handle) {
    @apply dark:bg-emerald-500 dark:border-emerald-500;
}

:deep(.n-slider-handle:hover) {
    @apply dark:bg-emerald-400 dark:border-emerald-400;
}
</style>
