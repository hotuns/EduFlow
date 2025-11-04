<template>
  <div class="questions-container">
    <!-- 题型筛选和导航 -->
    <div class="controls mb-4">
      <n-space justify="space-between" align="center">
        <n-select
          v-model:value="selectedType"
          :options="typeOptions"
          placeholder="选择题型"
          style="width: 120px"
        />

        <n-space>
          <n-button
            size="small"
            :type="currentIndex > 0 ? 'primary' : 'default'"
            :disabled="currentIndex === 0"
            @click="prevQuestion"
          >
            上一题
          </n-button>
          <n-button
            size="small"
            :type="
              currentIndex < filteredQuestions.length - 1
                ? 'primary'
                : 'default'
            "
            :disabled="currentIndex === filteredQuestions.length - 1"
            @click="nextQuestion"
          >
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
          <n-tag
            :type="answered ? (isCorrect ? 'success' : 'error') : 'warning'"
          >
            {{ getStatusText() }}
          </n-tag>
        </div>
      </template>

      <!-- 题目 -->
      <div class="question-content mb-4">
        <div class="mb-2">{{ currentQuestion.title }}</div>

        <!-- 选项显示部分 -->
        <template
          v-if="
            currentQuestion.type === 'choice' ||
            currentQuestion.type === 'expand'
          "
        >
          <n-radio-group
            v-model:value="userAnswer"
            class="ml-4"
            @update:value="handleChoiceAnswer"
          >
            <n-space vertical>
              <n-radio
                v-for="option in currentQuestion.options"
                :key="option.label"
                :value="option.label"
                :disabled="answered && isCorrect"
              >
                {{ option.label }}. {{ option.value }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </template>

        <template v-else-if="currentQuestion.type === 'multiple'">
          <n-checkbox-group v-model:value="userAnswer" class="ml-4">
            <n-space vertical>
              <n-checkbox
                v-for="option in currentQuestion.options"
                :key="option.label"
                :value="option.label"
                :disabled="answered && isCorrect"
              >
                {{ option.label }}. {{ option.value }}
              </n-checkbox>
            </n-space>
          </n-checkbox-group>
        </template>

        <template v-else-if="currentQuestion.type === 'judgment'">
          <n-radio-group
            v-model:value="userAnswer"
            class="ml-4"
            @update:value="handleChoiceAnswer"
          >
            <n-space>
              <n-radio value="true" :disabled="answered && isCorrect"
                >正确</n-radio
              >
              <n-radio value="false" :disabled="answered && isCorrect"
                >错误</n-radio
              >
            </n-space>
          </n-radio-group>
        </template>

        <template v-else>
          <n-input
            v-model:value="userAnswer"
            type="textarea"
            placeholder="请输入你的答案"
            :disabled="answered && isCorrect"
            class="mt-4"
          />
        </template>
      </div>

      <!-- 答案区域 -->
      <n-divider />
      <div class="answer-section">
        <n-space justify="center">
          <!-- 添加提交按钮，只在多选题、简答题和填空题时显示 -->
          <n-button
            v-if="
              !answered &&
              ['multiple', 'essay', 'fill'].includes(currentQuestion.type)
            "
            type="primary"
            @click="submitAnswer"
            :disabled="isSubmitDisabled"
          >
            提交答案
          </n-button>
          <!-- 重新作答按钮，在答错时显示 -->
          <n-button
            v-if="answered && !isCorrect"
            type="warning"
            @click="resetCurrentAnswer"
          >
            重新作答
          </n-button>
          <n-button
            :type="showAnswer ? 'default' : 'info'"
            @click="toggleAnswer"
          >
            {{ showAnswer ? "隐藏答案" : "查看答案" }}
          </n-button>
        </n-space>

        <!-- 添加答题反馈 -->
        <div v-if="answered" class="mt-4 mb-4">
          <n-alert :type="isCorrect ? 'success' : 'error'">
            {{ isCorrect ? "回答正确！" : "回答错误，请查看正确答案" }}
          </n-alert>
        </div>

        <div v-if="showAnswer" class="mt-4">
          <div class="font-bold mb-2">正确答案：</div>
          <div v-if="currentQuestion.type === 'choice'" class="ml-4">
            {{ getAnswerLabel(currentQuestion) }}
          </div>
          <div v-else-if="currentQuestion.type === 'expand'" class="ml-4">
            {{ getAnswerLabel(currentQuestion) }}
          </div>
          <div v-else-if="currentQuestion.type === 'multiple'" class="ml-4">
            {{ getMultipleAnswerLabels(currentQuestion) }}
          </div>
          <div v-else-if="currentQuestion.type === 'judgment'" class="ml-4">
            {{ currentQuestion.answer === "true" ? "正确" : "错误" }}
          </div>
          <div v-else class="ml-4">
            {{ currentQuestion.answer || "暂无答案" }}
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { dataManager } from "../datas";
import type { Question, QuestionType } from "../datas"; // 导入类型定义

// 新增状态
const userAnswer = ref<string | string[]>("");

// 检查答案是否正确
const checkAnswer = () => {
  if (currentQuestion.value.type === "multiple") {
    const sortedUserAnswer = (userAnswer.value as string[]).sort().join(",");
    const sortedCorrectAnswer = currentQuestion.value.answer
      .split(",")
      .sort()
      .join(",");
    return sortedUserAnswer === sortedCorrectAnswer;
  }
  return userAnswer.value === currentQuestion.value.answer;
};

// 重置当前题目的答题状态，允许重新作答
const resetCurrentAnswer = () => {
  userAnswer.value = currentQuestion.value.type === "multiple" ? [] : "";
  answered.value = false;
  isCorrect.value = false;
};

// 初始化答题状态（在组件挂载和切换题目时调用）
const resetAnswer = () => {
  // 确保根据题目类型设置正确的初始值
  userAnswer.value = currentQuestion.value.type === "multiple" ? [] : "";
  answered.value = false;
  isCorrect.value = false;
  showAnswer.value = false;
};
const answered = ref(false);
const isCorrect = ref(false);
// 提交答案
const submitAnswer = () => {
  isCorrect.value = checkAnswer();
  answered.value = true;
};

// 处理单选题和判断题的选择
const handleChoiceAnswer = (value: string) => {
  if (
    currentQuestion.value.type === "choice" ||
    currentQuestion.value.type === "judgment" ||
    currentQuestion.value.type === "expand"
  ) {
    isCorrect.value = checkAnswer();
    answered.value = true;

    // 单选和判断题不自动显示答案，只提示正确与否
  }
};

// 获取状态文本
const getStatusText = () => {
  if (!answered.value) return "未作答";
  return isCorrect.value ? "回答正确" : "回答错误";
};

// 题型选项
const typeOptions = [
  { label: "单选题", value: "choice" },
  //   { label: '多选题', value: 'multiple' },
  { label: "判断题", value: "judgment" },
  //   { label: '简答题', value: 'essay' },
  //   { label: '填空题', value: 'fill' },
  //   { label: '扩展题', value: 'expand' },
];

// 当前选中的题型，默认单选题
const selectedType = ref<QuestionType>("choice");
const currentIndex = ref(0);

// 获取题库
const questionBank = dataManager.getQuestions();

// 根据题型获取题目
const filteredQuestions = computed(() => {
  return questionBank[selectedType.value];
});

const showAnswer = ref(false);

// 监听题目变化时重置状态
watch([selectedType, currentIndex], () => {
  resetAnswer();
});

watch(selectedType, () => {
  currentIndex.value = 0;
});

// 当前题目
const currentQuestion = computed(
  () => filteredQuestions.value[currentIndex.value]
);

// 判断提交按钮是否应该禁用
const isSubmitDisabled = computed(() => {
  if (currentQuestion.value.type === "multiple") {
    return (userAnswer.value as string[]).length === 0;
  }
  return !userAnswer.value;
});

// 确保在组件挂载和currentQuestion变化时初始化userAnswer
watch(
  currentQuestion,
  (newQuestion) => {
    if (newQuestion) {
      userAnswer.value = newQuestion.type === "multiple" ? [] : "";
    }
  },
  { immediate: true }
);

// 获取题目类型显示文本
const getQuestionType = (type: string) => {
  const typeMap = {
    choice: "选择题",
    judgment: "判断题",
    essay: "简答题",
    multiple: "多选题",
    fill: "填空题",
    expand: "扩展题",
  };
  return typeMap[type as keyof typeof typeMap] || "未知类型";
};

// 获取选择题答案的选项文本
const getAnswerLabel = (question: Question) => {
  if (question.type !== "choice" && question.type !== "expand") return "";
  if (!question.options) return "";

  // 先找到答案对应的选项
  const answerOption = question.options.find(
    (opt) => opt.label === question.answer
  );
  if (!answerOption) return question.answer || ""; // 如果找不到对应选项，直接返回答案

  return `${answerOption.label}. ${answerOption.value}`;
};

// 获取多选题答案的选项文本
const getMultipleAnswerLabels = (question: Question) => {
  if (question.type !== "multiple" || !question.options) return "";

  const answers = question.answer?.split(",") || [];
  const answerLabels = answers.map((answer) => {
    const option = question.options?.find((opt) => opt.label === answer.trim());
    return option ? `${option.label}. ${option.value}` : answer;
  });

  return answerLabels.join("、");
};

// 切换答案显示状态
const toggleAnswer = () => {
  showAnswer.value = !showAnswer.value;
};

// 上一题
const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    showAnswer.value = false;
  }
};

// 下一题
const nextQuestion = () => {
  if (currentIndex.value < filteredQuestions.value.length - 1) {
    currentIndex.value++;
    showAnswer.value = false;
  }
};
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
