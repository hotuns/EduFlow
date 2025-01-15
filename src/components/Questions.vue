<template>
    <div class="questions-container">
        <!-- 题型筛选和导航 -->
        <div class="controls mb-4">
            <n-space justify="space-between" align="center">
                <n-select v-model:value="selectedType" :options="typeOptions" placeholder="选择题型" style="width: 120px" />

                <n-space>
                    <n-button size="small" :type="currentIndex > 0 ? 'primary' : 'default'"
                        :disabled="currentIndex === 0" @click="prevQuestion">
                        上一题
                    </n-button>
                    <n-button size="small" :type="currentIndex < filteredQuestions.length - 1 ? 'primary' : 'default'"
                        :disabled="currentIndex === filteredQuestions.length - 1" @click="nextQuestion">
                        下一题
                    </n-button>
                    <span class="question-count">
                        {{ currentIndex + 1 }}/{{ filteredQuestions.length }}
                    </span>
                </n-space>
            </n-space>
        </div>

        <!-- 题目内容 -->
        <n-card v-if="currentQuestion" class="question-card">
            <template #header>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold">
                        {{ getQuestionType(currentQuestion.type) }}
                    </span>
                    <n-tag :type="showAnswer ? 'success' : 'warning'">
                        {{ showAnswer ? '答案已显示' : '答案已隐藏' }}
                    </n-tag>
                </div>
            </template>

            <!-- 题目 -->
            <div class="question-content mb-4">
                <div class="mb-2">{{ currentQuestion.title }}</div>

                <!-- 选项显示部分 -->
                <template v-if="currentQuestion.type === 'choice' || currentQuestion.type === 'multiple'">
                    <div v-for="option in currentQuestion.options" :key="option.value" class="ml-4 mb-1">
                        {{ option.label }}. {{ option.value }}
                    </div>
                </template>
            </div>

            <!-- 答案区域 -->
            <n-divider />
            <div class="answer-section">
                <n-button type="primary" @click="toggleAnswer">
                    {{ showAnswer ? '隐藏答案' : '查看答案' }}
                </n-button>

                <div v-if="showAnswer" class="mt-4">
                    <div class="font-bold mb-2">正确答案：</div>
                    <div v-if="currentQuestion.type === 'choice'" class="ml-4">
                        {{ getAnswerLabel(currentQuestion) }}
                    </div>
                    <div v-else-if="currentQuestion.type === 'multiple'" class="ml-4">
                        {{ getMultipleAnswerLabels(currentQuestion) }}
                    </div>
                    <div v-else-if="currentQuestion.type === 'judgment'" class="ml-4">
                        {{ currentQuestion.answer === 'true' ? '正确' : '错误' }}
                    </div>
                    <div v-else class="ml-4">
                        {{ currentQuestion.answer || '暂无答案' }}
                    </div>
                </div>
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { dataManager } from '../datas'
import type { Question, QuestionType } from '../datas' // 导入类型定义

// 题型选项
const typeOptions = [
    { label: '单选题', value: 'choice' },
    { label: '多选题', value: 'multiple' },
    { label: '判断题', value: 'judgment' },
    { label: '简答题', value: 'essay' },
    { label: '填空题', value: 'fill' },
    { label: '扩展题', value: 'expand' }
]

// 当前选中的题型，默认单选题
const selectedType = ref<QuestionType>('choice')

// 获取题库
const questionBank = dataManager.getQuestions()

// 根据题型获取题目
const filteredQuestions = computed(() => {
    return questionBank[selectedType.value]
})

const currentIndex = ref(0)
const showAnswer = ref(false)

// 当前题目
const currentQuestion = computed(() => filteredQuestions.value[currentIndex.value])

// 监听题型变化，重置当前索引和答案显示状态
watch(selectedType, () => {
    currentIndex.value = 0
    showAnswer.value = false
})

// 获取题目类型显示文本
const getQuestionType = (type: string) => {
    const typeMap = {
        'choice': '选择题',
        'judgment': '判断题',
        'essay': '简答题',
        'multiple': '多选题',
        'fill': '填空题',
        'expand': '扩展题'
    }
    return typeMap[type as keyof typeof typeMap] || '未知类型'
}

// 获取选择题答案的选项文本
const getAnswerLabel = (question: Question) => {
    if (question.type !== 'choice' || !question.options) return ''

    // 先找到答案对应的选项
    const answerOption = question.options.find(opt => opt.label === question.answer)
    if (!answerOption) return question.answer || '' // 如果找不到对应选项，直接返回答案

    return `${answerOption.label}. ${answerOption.value}`
}

// 获取多选题答案的选项文本
const getMultipleAnswerLabels = (question: Question) => {
    if (question.type !== 'multiple' || !question.options) return ''

    const answers = question.answer?.split(',') || []
    const answerLabels = answers.map(answer => {
        const option = question.options?.find(opt => opt.label === answer.trim())
        return option ? `${option.label}. ${option.value}` : answer
    })

    return answerLabels.join('、')
}

// 切换答案显示状态
const toggleAnswer = () => {
    showAnswer.value = !showAnswer.value
}

// 上一题
const prevQuestion = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
        showAnswer.value = false
    }
}

// 下一题
const nextQuestion = () => {
    if (currentIndex.value < filteredQuestions.value.length - 1) {
        currentIndex.value++
        showAnswer.value = false
    }
}
</script>

<style scoped>
.questions-container {
    max-width: 800px;
    margin: 0 auto;
}

.controls {
    display: flex;
    align-items: center;
}

.question-count {
    font-size: 14px;
    color: #666;
}

.question-card {
    margin-bottom: 20px;
}

.question-content {
    font-size: 16px;
    line-height: 1.6;
}

.answer-section {
    text-align: center;
}
</style>
