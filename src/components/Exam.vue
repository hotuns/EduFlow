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
                <div v-for="question in questions" :key="question.id" class="mb-8">
                    <n-form-item :label="`${question.id}. ${question.title}`" :path="`q${question.id}`">
                        <!-- 选择题 -->
                        <template v-if="question.type === 'choice'">
                            <n-radio-group v-model:value="answers[`q${question.id}`]">
                                <n-space vertical>
                                    <n-radio v-for="option in question.options" :key="option.value"
                                        :value="option.value">
                                        {{ option.label }}
                                    </n-radio>
                                </n-space>
                            </n-radio-group>
                        </template>

                        <!-- 填空题 -->
                        <template v-else>
                            <n-input v-model:value="answers[`q${question.id}`]" type="textarea" placeholder="请输入你的答案"
                                :rows="3" />
                        </template>

                        <div class="mt-2 text-gray-400 text-sm">
                            ({{ question.score }}分)
                        </div>
                    </n-form-item>
                </div>
            </n-form>

            <!-- 提交按钮 -->
            <div class="flex justify-center mt-8">
                <n-button type="primary" size="large" @click="handleSubmit" :loading="submitting">
                    提交答案
                </n-button>
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { questions } from '../datas'
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

// 计算总分
const totalScore = computed(() => {
    return questions.reduce((total, q) => total + q.score, 0)
})

// 表单验证规则
const rules = {
    ...Object.fromEntries(
        questions.map(q => [
            `q${q.id}`,
            {
                required: true,
                message: '此题必答',
                trigger: 'blur'
            }
        ])
    )
}

// 计算得分
const calculateScore = () => {
    let totalScore = 0
    questions.forEach(question => {
        const answer = answers.value[`q${question.id}`]
        if (question.type === 'choice' && answer === question.answer) {
            totalScore += question.score
        }
        // 填空题需要人工评分，这里暂时不计分
    })
    return totalScore
}

// 提交答案
const handleSubmit = () => {
    formRef.value?.validate(async errors => {
        if (errors) {
            message.error('请完成所有题目')
            return
        }

        submitting.value = true
        try {
            const score = calculateScore()
            // 只保存分数
            store.saveExamResult(userName.value, score)

            message.success(`考试完成！得分：${score}分`)
            emit('next')
        } catch (error) {
            message.error('提交失败，请重试')
        } finally {
            submitting.value = false
        }
    })
}
</script>

<style scoped></style>
