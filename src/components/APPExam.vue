<template>
    <div class="w-full h-full flex flex-col space-y-6 p-4">
        <!-- 考试信息 -->
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">考试题目</h2>
            <div class="text-gray-400">
                总分：{{ totalScore }} 分
            </div>
        </div>

        <n-card>
            <!-- 选择题部分 -->
            <div class="mb-8">
                <div class="text-lg font-bold mb-4 pb-2 border-b">
                    选择题（每题{{ QUESTION_SCORES.choice }}分，共{{ choiceQuestions.length * QUESTION_SCORES.choice }}分）
                </div>
                <n-form ref="choiceFormRef" :model="answers.choice" :rules="choiceRules">
                    <div v-for="(question, index) in choiceQuestions" :key="question.id" class="mb-8">
                        <n-form-item :path="`q${question.id}`" :label="`${index + 1}. ${question.title}`">
                            <n-radio-group v-model:value="answers.choice[`q${question.id}`]">
                                <n-space vertical>
                                    <n-radio v-for="option in question.options" :key="option.value"
                                        :value="option.label">
                                        {{ option.label }}. {{ option.value }}
                                    </n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>
                    </div>
                </n-form>
            </div>

            <!-- 判断题部分 -->
            <div class="mb-8">
                <div class="text-lg font-bold mb-4 pb-2 border-b">
                    判断题（每题{{ QUESTION_SCORES.judgment }}分，共{{ judgmentQuestions.length * QUESTION_SCORES.judgment }}分）
                </div>
                <n-form ref="judgmentFormRef" :model="answers.judgment" :rules="judgmentRules">
                    <div v-for="(question, index) in judgmentQuestions" :key="question.id" class="mb-8">
                        <n-form-item :path="`q${question.id}`" :label="`${index + 1}. ${question.title}`">
                            <n-radio-group v-model:value="answers.judgment[`q${question.id}`]">
                                <n-space>
                                    <n-radio value="true">正确</n-radio>
                                    <n-radio value="false">错误</n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>
                    </div>
                </n-form>
            </div>

            <!-- 多选题部分 -->
            <div class="mb-8">
                <div class="text-lg font-bold mb-4 pb-2 border-b">
                    多选题（每题{{ QUESTION_SCORES.multiple }}分，共{{ multipleQuestions.length * QUESTION_SCORES.multiple }}分）
                </div>
                <n-form ref="multipleFormRef" :model="answers.multiple" :rules="multipleRules">
                    <div v-for="(question, index) in multipleQuestions" :key="question.id" class="mb-8">
                        <n-form-item :path="`q${question.id}`" :label="`${index + 1}. ${question.title}`">
                            <n-checkbox-group v-model:value="answers.multiple[`q${question.id}`]">
                                <n-space vertical>
                                    <n-checkbox v-for="option in question.options" :key="option.value"
                                        :value="option.label">
                                        {{ option.label }}. {{ option.value }}
                                    </n-checkbox>
                                </n-space>
                            </n-checkbox-group>
                        </n-form-item>
                    </div>
                </n-form>
            </div>

            <!-- 阐述题部分 -->
            <div class="mb-8">
                <div class="text-lg font-bold mb-4 pb-2 border-b">
                    阐述题（每题{{ QUESTION_SCORES.essay }}分，共{{ essayQuestions.length * QUESTION_SCORES.essay }}分）
                </div>
                <n-form ref="essayFormRef" :model="answers.essay" :rules="essayRules">
                    <div v-for="(question, index) in essayQuestions" :key="question.id" class="mb-8">
                        <n-form-item :path="`q${question.id}`" :label="`${index + 1}. ${question.title}`">
                            <n-input v-model:value="answers.essay[`q${question.id}`]" type="textarea"
                                placeholder="请输入你的答案" :rows="4" />
                        </n-form-item>
                    </div>
                </n-form>
            </div>

            <!-- 提交按钮 -->
            <div class="flex justify-center mt-8">
                <n-button type="primary" size="large" @click="handleSubmit" :loading="submitting">
                    提交答案
                </n-button>
            </div>
        </n-card>

        <!-- 得分详情弹窗 -->
        <n-modal v-model:show="showScoreModal" preset="card" title="考试得分详情" style="width: 800px" :mask-closable="false"
            :closable="false">
            <n-tabs type="line" animated>
                <!-- 总分概览 -->
                <n-tab-pane name="overview" tab="得分概览">
                    <div class="space-y-6">
                        <!-- 总分 -->
                        <div class="text-center">
                            <div class="text-4xl font-bold text-primary mb-2">
                                {{ examScore }}
                            </div>
                            <div class="text-gray-500">总分</div>
                        </div>

                        <!-- 分类得分 -->
                        <div class="space-y-4">
                            <!-- 选择题得分 -->
                            <div class="flex justify-between items-center">
                                <div class="font-medium">选择题</div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-xl font-bold">{{ scoreDetails.choice }}</span>
                                    <span class="text-gray-500">/ {{ choiceQuestions.length * QUESTION_SCORES.choice
                                        }}</span>
                                </div>
                            </div>

                            <!-- 判断题得分 -->
                            <div class="flex justify-between items-center">
                                <div class="font-medium">判断题</div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-xl font-bold">{{ scoreDetails.judgment }}</span>
                                    <span class="text-gray-500">/ {{ judgmentQuestions.length * QUESTION_SCORES.judgment
                                        }}</span>
                                </div>
                            </div>

                            <!-- 多选题得分 -->
                            <div class="flex justify-between items-center">
                                <div class="font-medium">多选题</div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-xl font-bold">{{ scoreDetails.multiple }}</span>
                                    <span class="text-gray-500">/ {{ multipleQuestions.length * QUESTION_SCORES.multiple
                                        }}</span>
                                </div>
                            </div>

                            <!-- 阐述题得分 -->
                            <div class="flex justify-between items-center">
                                <div class="font-medium">阐述题</div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-xl font-bold">{{ scoreDetails.essay }}</span>
                                    <span class="text-gray-500">/ {{ essayQuestions.length * QUESTION_SCORES.essay
                                        }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- 分割线 -->
                        <n-divider />
                    </div>
                </n-tab-pane>

                <!-- 答题详情 -->
                <n-tab-pane name="details" tab="答题详情">
                    <div class="space-y-8">
                        <!-- 选择题详情 -->
                        <div v-if="choiceQuestions.length">
                            <h3 class="text-lg font-bold mb-4">选择题</h3>
                            <div class="space-y-4">
                                <div v-for="(question, index) in choiceQuestions" :key="question.id"
                                    class="p-4 rounded-lg"
                                    :class="isAnswerCorrect('choice', question) ? 'dark:bg-green-900/20' : 'dark:bg-red-900/20'">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <div class="font-medium mb-2">
                                                {{ index + 1 }}. {{ question.title }}
                                            </div>
                                            <div class="text-sm dark:text-gray-400">
                                                您的答案：{{ getAnswerDisplay('choice', question) }}
                                            </div>
                                            <div class="text-sm"
                                                :class="isAnswerCorrect('choice', question) ? 'text-green-500' : 'text-red-500'">
                                                正确答案：{{ getCorrectAnswerDisplay(question) }}
                                            </div>
                                        </div>
                                        <n-tag :type="isAnswerCorrect('choice', question) ? 'success' : 'error'">
                                            {{ isAnswerCorrect('choice', question) ? '正确' : '错误' }}
                                        </n-tag>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 判断题详情 -->
                        <div v-if="judgmentQuestions.length">
                            <h3 class="text-lg font-bold mb-4">判断题</h3>
                            <div class="space-y-4">
                                <div v-for="(question, index) in judgmentQuestions" :key="question.id"
                                    class="p-4 rounded-lg"
                                    :class="isAnswerCorrect('judgment', question) ? 'dark:bg-green-900/20' : 'dark:bg-red-900/20'">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <div class="font-medium mb-2">
                                                {{ index + 1 }}. {{ question.title }}
                                            </div>
                                            <div class="text-sm dark:text-gray-400">
                                                您的答案：{{ answers.judgment[`q${question.id}`] === 'A' ? '正确' : '错误' }}
                                            </div>
                                            <div class="text-sm"
                                                :class="isAnswerCorrect('judgment', question) ? 'text-green-500' : 'text-red-500'">
                                                正确答案：{{ question.answer === 'true' ? '正确' : '错误' }}
                                            </div>
                                        </div>
                                        <n-tag :type="isAnswerCorrect('judgment', question) ? 'success' : 'error'">
                                            {{ isAnswerCorrect('judgment', question) ? '正确' : '错误' }}
                                        </n-tag>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 多选题详情 -->
                        <div v-if="multipleQuestions.length">
                            <h3 class="text-lg font-bold mb-4">多选题</h3>
                            <div class="space-y-4">
                                <div v-for="(question, index) in multipleQuestions" :key="question.id"
                                    class="p-4 rounded-lg"
                                    :class="isAnswerCorrect('multiple', question) ? 'dark:bg-green-900/20' : 'dark:bg-red-900/20'">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <div class="font-medium mb-2">
                                                {{ index + 1 }}. {{ question.title }}
                                            </div>
                                            <div class="text-sm dark:text-gray-400">
                                                您的答案：{{ getAnswerDisplay('multiple', question) }}
                                            </div>
                                            <div class="text-sm"
                                                :class="isAnswerCorrect('multiple', question) ? 'text-green-500' : 'text-red-500'">
                                                正确答案：{{ getCorrectAnswerDisplay(question) }}
                                            </div>
                                        </div>
                                        <n-tag :type="isAnswerCorrect('multiple', question) ? 'success' : 'error'">
                                            {{ isAnswerCorrect('multiple', question) ? '正确' : '错误' }}
                                        </n-tag>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 阐述题详情 -->
                        <div v-if="essayQuestions.length">
                            <h3 class="text-lg font-bold mb-4">阐述题</h3>
                            <div class="space-y-4">
                                <div v-for="(question, index) in essayQuestions" :key="question.id"
                                    class="p-4 rounded-lg dark:bg-gray-800/50">
                                    <div>
                                        <div class="font-medium mb-2">
                                            {{ index + 1 }}. {{ question.title }}
                                        </div>
                                        <div class="text-sm dark:text-gray-400 mb-2">
                                            您的答案：{{ answers.essay[`q${question.id}`] }}
                                        </div>
                                        <div class="text-sm text-emerald-500">
                                            得分：{{ getEssayScore(question) }} / {{ QUESTION_SCORES.essay }}
                                        </div>
                                        <div class="text-sm dark:text-gray-400 mt-2">
                                            关键词：{{ question.keywords?.join('、') }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </n-tab-pane>
            </n-tabs>

            <!-- 按钮 -->
            <template #footer>
                <div class="flex justify-center">
                    <n-button type="primary" @click="handleNext">
                        查看证书
                    </n-button>
                </div>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { dataManager, getRandomQuestions, Question, QUESTION_SCORES } from '../datas'
import { useUserStore } from '../store'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { storeToRefs } from 'pinia'


const message = useMessage()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

// 表单引用
const choiceFormRef = ref<FormInst | null>(null)
const judgmentFormRef = ref<FormInst | null>(null)
const multipleFormRef = ref<FormInst | null>(null)
const essayFormRef = ref<FormInst | null>(null)

// 修改答案类型定义
interface Answers {
    choice: Record<string, string>
    multiple: Record<string, string[]>
    judgment: Record<string, string>
    essay: Record<string, string>
}

// 初始化答案对象，按题型分类
const answers = ref<Answers>({
    choice: {},
    multiple: {},
    judgment: {},
    essay: {}
})

// 随机抽取考试题目
const examQuestions = ref(getRandomQuestions(dataManager.getQuestions()))

// 计算总分
const totalScore = computed(() => {
    return examQuestions.value.reduce((total, q) => total + (q.score || 0), 0)
})

const submitting = ref(false)

// 分别定义各题型的验证规则
const choiceRules = computed(() => {
    const rules: Record<string, any> = {}
    choiceQuestions.value.forEach(q => {
        rules[`q${q.id}`] = {
            required: true,
            message: '请选择答案',
            trigger: ['blur', 'change']
        }
    })
    return rules
})

const judgmentRules = computed(() => {
    const rules: Record<string, any> = {}
    judgmentQuestions.value.forEach(q => {
        rules[`q${q.id}`] = {
            required: true,
            message: '请选择答案',
            trigger: ['blur', 'change']
        }
    })
    return rules
})

const multipleRules = computed(() => {
    const rules: Record<string, any> = {}
    multipleQuestions.value.forEach(q => {
        rules[`q${q.id}`] = {
            required: true,
            type: 'array',
            min: 1,
            message: '请至少选择一个选项',
            trigger: ['blur', 'change']
        }
    })
    return rules
})

const essayRules = computed(() => {
    const rules: Record<string, any> = {}
    essayQuestions.value.forEach(q => {
        rules[`q${q.id}`] = {
            required: true,
            message: '请输入答案',
            trigger: ['blur', 'change']
        }
    })
    return rules
})

// 计算阐述题得分
const calculateEssayScore = (answer: string, keywords: string[]) => {
    if (!answer || !keywords.length) return 0

    // 将答案转换为小写以进行不区分大小写的匹配
    const lowerAnswer = answer.toLowerCase()

    // 计算匹配的关键词数量
    const matchedKeywords = keywords.filter(keyword =>
        lowerAnswer.includes(keyword.toLowerCase())
    )

    // 按关键词匹配比例计算得分
    const matchRatio = matchedKeywords.length / keywords.length
    return Math.floor(matchRatio * QUESTION_SCORES.essay)
}

const showScoreModal = ref(false)
const examScore = ref(0)
const scoreDetails = ref({
    choice: 0,
    judgment: 0,
    multiple: 0,
    essay: 0
})

// 计算得分详情
const calculateScoreDetails = () => {
    const details = {
        choice: 0,
        multiple: 0,
        judgment: 0,
        essay: 0
    }

    examQuestions.value.forEach(question => {
        const type_answer = answers.value[question.type]
        const answer = type_answer[`q${question.id}`]
        if (answer === undefined) return

        switch (question.type) {
            case 'choice':
                if (answer === question.answer) {
                    details.choice += QUESTION_SCORES.choice
                }
                break

            case 'multiple':
                const userAnswers = new Set(answer as string[])
                const correctAnswers = new Set(question.answer?.split(','))

                // 如果选择了错误选项，得0分
                const hasWrongAnswer = Array.from(userAnswers).some(a => !correctAnswers.has(a))
                if (hasWrongAnswer) {
                    break
                }

                // 计算正确答案的比例
                const correctCount = userAnswers.size
                const totalCorrect = correctAnswers.size

                if (correctCount === totalCorrect) {
                    // 全部正确，得满分
                    details.multiple += QUESTION_SCORES.multiple
                } else {
                    // 部分正确，按比例得分
                    const ratio = correctCount / totalCorrect
                    const score = Math.floor(QUESTION_SCORES.multiple * ratio)
                    // 确保至少得1分
                    details.multiple += Math.max(1, score)
                }
                break

            case 'judgment':
                if (answer === question.answer) {
                    details.judgment += QUESTION_SCORES.judgment
                }
                break

            case 'essay':
                if (question.keywords) {
                    details.essay += calculateEssayScore(answer as string, question.keywords)
                }
                break
        }
    })

    return details
}

// 修改提交处理
const handleSubmit = async () => {
    try {
        const validations = await Promise.all([
            choiceFormRef.value?.validate(),
            judgmentFormRef.value?.validate(),
            multipleFormRef.value?.validate(),
            essayFormRef.value?.validate()
        ])

        if (!validations.some(v => v?.warnings?.length)) {
            submitting.value = true
            try {
                // 计算得分详情
                scoreDetails.value = calculateScoreDetails()

                // 计算总分
                examScore.value = Object.values(scoreDetails.value).reduce((a, b) => a + b, 0)

                // 保存分数
                userStore.saveExamResult(currentUser.value!.name, examScore.value)

                // 显示得分详情弹窗
                showScoreModal.value = true
            } finally {
                submitting.value = false
            }
        }
    } catch (errors) {
        message.error('请完成所有题目')
    }
}

const router = useRouter()
const handleNext = () => {
    showScoreModal.value = false
    router.push({ name: 'user' })
}

// 按题型分组的计算属性
const choiceQuestions = computed(() =>
    examQuestions.value.filter(q => q.type === 'choice')
)

const judgmentQuestions = computed(() =>
    examQuestions.value.filter(q => q.type === 'judgment')
)

const multipleQuestions = computed(() =>
    examQuestions.value.filter(q => q.type === 'multiple')
)

const essayQuestions = computed(() =>
    examQuestions.value.filter(q => q.type === 'essay')
)

onMounted(async () => {
    try {
        await dataManager.init()
        examQuestions.value = getRandomQuestions(dataManager.getQuestions())
    } catch (error) {
        message.error('题目加载失败')
    }
})

// 添加辅助函数
const isAnswerCorrect = (type: keyof Answers, question: Question) => {
    const answer = answers.value[type][`q${question.id}`]
    if (!answer) return false

    switch (type) {
        case 'choice':
        case 'judgment':
            return answer === question.answer
        case 'multiple':
            const userAnswers = (answer as string[]).sort().join(',')
            const correctAnswers = question.answer?.split(',').sort().join(',')
            return userAnswers === correctAnswers
        default:
            return false
    }
}

const getAnswerDisplay = (type: keyof Answers, question: Question) => {
    const answer = answers.value[type][`q${question.id}`]
    if (!answer) return '未作答'

    if (type === 'multiple') {
        return (answer as string[]).join('、')
    }
    return answer
}

const getCorrectAnswerDisplay = (question: Question) => {
    if (question.type === 'multiple') {
        return question.answer?.split(',').join('、')
    }
    return question.answer
}

const getEssayScore = (question: Question) => {
    const answer = answers.value.essay[`q${question.id}`]
    if (!answer || !question.keywords) return 0
    return calculateEssayScore(answer, question.keywords)
}
</script>

<style scoped>
.border-b {
    border-bottom: 1px solid #374151;
}

:root {
    --primary-color: #42d583;
}

.text-primary {
    color: var(--primary-color);
}

.dark\:bg-green-900\/20 {
    background-color: rgba(6, 78, 59, 0.2);
}

.dark\:bg-red-900\/20 {
    background-color: rgba(127, 29, 29, 0.2);
}
</style>
