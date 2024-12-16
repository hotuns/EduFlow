<template>
    <div class="w-full h-full flex flex-col space-y-6 p-4">
        <!-- 考试信息 -->
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">考试题目</h2>
            <div class="text-gray-500">
                总分：{{ totalScore }} 分
            </div>
        </div>

        <n-card>
            <!-- 题目列表 -->
            <n-form ref="formRef" :model="answers" :rules="rules">
                <!-- 选择题部分 -->
                <div class="mb-8">
                    <div class="text-lg font-bold mb-4 pb-2 border-b">
                        选择题（每题{{ QUESTION_SCORES.choice }}分，共{{ choiceQuestions.length * QUESTION_SCORES.choice }}分）
                    </div>
                    <div v-for="(question, index) in choiceQuestions" :key="question.id" class="mb-8 relative">
                        <n-form-item :label="`${index + 1}. ${question.title}`" :path="`q${question.id}`">
                            <n-radio-group v-model:value="answers[`q${question.id}`]">
                                <n-space vertical>
                                    <n-radio v-for="option in question.options" :key="option.value"
                                        :value="option.value">
                                        {{ option.label }}
                                    </n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>
                    </div>
                </div>

                <!-- 判断题部分 -->
                <div class="mb-8">
                    <div class="text-lg font-bold mb-4 pb-2 border-b">
                        判断题（每题{{ QUESTION_SCORES.judgment }}分，共{{ judgmentQuestions.length * QUESTION_SCORES.judgment
                        }}分）
                    </div>
                    <div v-for="(question, index) in judgmentQuestions" :key="question.id" class="mb-8 relative">
                        <n-form-item :label="`${index + 1}. ${question.title}`" :path="`q${question.id}`">
                            <n-radio-group v-model:value="answers[`q${question.id}`]">
                                <n-space>
                                    <n-radio value="A">正确</n-radio>
                                    <n-radio value="B">错误</n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-form-item>
                    </div>
                </div>

                <!-- 阐述题部分 -->
                <div class="mb-8">
                    <div class="text-lg font-bold mb-4 pb-2 border-b">
                        阐述题（每题{{ QUESTION_SCORES.essay }}分，共{{ essayQuestions.length * QUESTION_SCORES.essay }}分）
                    </div>
                    <div v-for="(question, index) in essayQuestions" :key="question.id" class="mb-8 relative">
                        <n-form-item :label="`${index + 1}. ${question.title}`" :path="`q${question.id}`">
                            <n-input v-model:value="answers[`q${question.id}`]" type="textarea" placeholder="请输入你的答案"
                                :rows="4" />
                        </n-form-item>
                    </div>
                </div>
            </n-form>

            <!-- 提交按钮 -->
            <div class="flex justify-center mt-8">
                <n-button type="primary" size="large" @click="handleSubmit" :loading="submitting">
                    提交答案
                </n-button>
            </div>
        </n-card>

        <!-- 得分详情弹窗 -->
        <n-modal v-model:show="showScoreModal" preset="card" title="考试得分详情" style="width: 600px" :mask-closable="false"
            :closable="false">
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
                            <span class="text-gray-500">/ {{ choiceQuestions.length * QUESTION_SCORES.choice }}</span>
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

                    <!-- 阐述题得分 -->
                    <div class="flex justify-between items-center">
                        <div class="font-medium">阐述题</div>
                        <div class="flex items-center space-x-2">
                            <span class="text-xl font-bold">{{ scoreDetails.essay }}</span>
                            <span class="text-gray-500">/ {{ essayQuestions.length * QUESTION_SCORES.essay }}</span>
                        </div>
                    </div>
                </div>

                <!-- 分割线 -->
                <n-divider />

                <!-- 按钮 -->
                <div class="flex justify-center">
                    <n-button type="primary" @click="handleNext">
                        查看证书
                    </n-button>
                </div>
            </div>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { questions, getRandomQuestions, QUESTION_SCORES } from '../datas'
import { useStore } from '../store'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'

const emit = defineEmits(['next'])
const message = useMessage()
const store = useStore()
const userName = inject('userName') as Ref<string>

const formRef = ref<FormInst | null>(null)
const answers = ref<Record<string, string>>({})
const submitting = ref(false)

// 随机抽取考试题目
const examQuestions = ref(getRandomQuestions(questions))

// 计算总分
const totalScore = computed(() => {
    return examQuestions.value.reduce((total, q) => total + (q.score || 0), 0)
})

// 表单验证规则
const rules = {
    ...Object.fromEntries(
        examQuestions.value.map(q => [
            `q${q.id}`,
            {
                required: true,
                message: '此题必答',
                trigger: 'blur'
            }
        ])
    )
}

// 计算阐述题得分
const calculateEssayScore = (answer: string, keywords: string[]) => {
    if (!answer) return 0
    const matchedKeywords = keywords.filter(keyword =>
        answer.toLowerCase().includes(keyword.toLowerCase())
    )
    return Math.floor((matchedKeywords.length / keywords.length) * QUESTION_SCORES.essay)
}

// 计算得分
const calculateScore = () => {
    let totalScore = 0
    examQuestions.value.forEach(question => {
        const answer = answers.value[`q${question.id}`]
        if (!answer) return

        switch (question.type) {
            case 'choice':
            case 'judgment':
                if (answer === question.answer) {
                    totalScore += question.score || 0
                }
                break
            case 'essay':
                if (question.keywords) {
                    totalScore += calculateEssayScore(answer, question.keywords)
                }
                break
        }
    })
    return totalScore
}

const showScoreModal = ref(false)
const examScore = ref(0)
const scoreDetails = ref({
    choice: 0,
    judgment: 0,
    essay: 0
})

// 计算各题型得分
const calculateScoreDetails = () => {
    const details = {
        choice: 0,
        judgment: 0,
        essay: 0
    }

    examQuestions.value.forEach(question => {
        const answer = answers.value[`q${question.id}`]
        if (!answer) return

        switch (question.type) {
            case 'choice':
                if (answer === question.answer) {
                    details.choice += QUESTION_SCORES.choice
                }
                break
            case 'judgment':
                if (answer === question.answer) {
                    details.judgment += QUESTION_SCORES.judgment
                }
                break
            case 'essay':
                if (question.keywords) {
                    details.essay += calculateEssayScore(answer, question.keywords)
                }
                break
        }
    })

    return details
}

// 修改提交答案处理
const handleSubmit = () => {
    formRef.value?.validate(async errors => {
        if (errors) {
            message.error('请完成所有题目')
            return
        }

        submitting.value = true
        try {
            // 计算得分详情
            scoreDetails.value = calculateScoreDetails()
            examScore.value = Object.values(scoreDetails.value).reduce((a, b) => a + b, 0)

            // 保存分数
            store.saveExamResult(userName.value, examScore.value)

            // 显示得分详情弹窗
            showScoreModal.value = true
        } catch (error) {
            message.error('提交失败，请重试')
        } finally {
            submitting.value = false
        }
    })
}

// 处理下一步
const handleNext = () => {
    showScoreModal.value = false
    emit('next')
}

// 按题型分组的计算属性
const choiceQuestions = computed(() =>
    examQuestions.value.filter(q => q.type === 'choice')
)

const judgmentQuestions = computed(() =>
    examQuestions.value.filter(q => q.type === 'judgment')
)

const essayQuestions = computed(() =>
    examQuestions.value.filter(q => q.type === 'essay')
)
</script>

<style scoped>
.border-b {
    border-bottom: 1px solid #eee;
}

.text-primary {
    color: #18a058;
}
</style>
