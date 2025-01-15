<template>
    <div class="admin-container">
        <n-tabs type="line">
            <n-tab-pane name="user-management" tab="用户管理">
                <n-card>
                    <template #header-extra>
                        <n-space>
                            <n-button @click="refreshData">
                                刷新数据
                            </n-button>
                            <n-button @click="clearStore">
                                清空数据
                            </n-button>
                        </n-space>
                    </template>

                    <!-- 用户列表表格 -->
                    <n-data-table :columns="columns" :data="userList" :pagination="pagination" :bordered="false"
                        striped />
                </n-card>
            </n-tab-pane>

            <n-tab-pane name="question-settings" tab="题目设置">
                <n-card>
                    <n-form :model="questionSettings" ref="questionSettingsForm" label-placement="left"
                        label-width="120px">
                        <n-flex>
                            <n-space vertical>
                                <h3>题目分值设置</h3>
                                <n-form-item v-for="(score, type) in questionSettings.scores" :key="type"
                                    :label="`${type} 分值`">
                                    <n-input-number v-model:value="questionSettings.scores[type]" :min="1" />
                                </n-form-item>
                            </n-space>
                            <n-space vertical>
                                <h3>题目数量设置</h3>
                                <n-form-item v-for="(count, type) in questionSettings.counts" :key="type"
                                    :label="`${type} 数量`">
                                    <n-input-number v-model:value="questionSettings.counts[type]" :min="1" />
                                </n-form-item>
                            </n-space>

                        </n-flex>
                        <n-form-item>
                            <n-button type="primary" @click="saveQuestionSettings">保存设置</n-button>
                        </n-form-item>
                    </n-form>
                </n-card>
            </n-tab-pane>
        </n-tabs>

        <!-- 历史成绩弹窗 -->
        <n-modal v-model:show="showHistoryModal" title="历史考试成绩">
            <n-card style="width: 80%">
                <n-data-table :columns="historyColumns" :data="selectedUserRecords" striped />
            </n-card>

            <template #footer>
                <n-button @click="showHistoryModal = false">关闭</n-button>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '../store'
import { NTag, NButton, NSpace, useMessage, NForm, NFormItem, NInputNumber, NCard, NTabs, NTabPane, NDataTable, NModal } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { User, ExamRecord } from '../store'
import { dataManager } from '../datas'

const userStore = useUserStore()
const message = useMessage()

// 获取用户列表，排除管理员
const userList = computed(() => {
    return userStore.getUsers.filter(user => user.type === 'student')
})

// 获取所有视频总数（扁平化后）
const totalVideos = dataManager.getVideos().length

// 表格列定义
const columns: DataTableColumns<User> = [
    {
        title: '用户名',
        key: 'name',
    },
    {
        title: '最新考试成绩',
        key: 'latestExamRecord',
        render(row) {
            if (!row.examRecords || row.examRecords.length === 0) {
                return h(NTag, { type: 'warning' }, { default: () => '未参加考试' })
            }
            const latestRecord = row.examRecords.slice(-1)[0]
            const type = latestRecord.score >= 60 ? 'success' : 'error'
            return h(NTag, { type }, { default: () => `${latestRecord.score}分 (${new Date(latestRecord.time).toLocaleString()})` })
        }
    },
    {
        title: '视频学习进度',
        key: 'videoStates',
        render(row) {
            const completed = row.videoStates.filter(v => v.completed).length
            const total = totalVideos
            const progress = total ? Math.round((completed / total) * 100) : 0

            return h(NTag, { type: progress === 100 ? 'success' : 'warning' },
                { default: () => `${progress}%` })
        }
    },
    {
        title: '操作',
        key: 'actions',
        render(row) {
            return h(NSpace, {}, {
                default: () => [
                    h(
                        NButton,
                        {
                            size: 'small',
                            onClick: () => handleViewHistory(row)
                        },
                        { default: () => '查看历史成绩' }
                    ),
                    h(
                        NButton,
                        {
                            size: 'small',
                            type: 'error',
                            onClick: () => handleDeleteUser(row.name)
                        },
                        { default: () => '删除用户' }
                    )
                ]
            })
        }
    }
]

// 历史成绩表格列定义
const historyColumns: DataTableColumns<ExamRecord> = [
    {
        title: '考试成绩',
        key: 'score',
        render(row) {
            const type = row.score >= 60 ? 'success' : 'error'
            return h(NTag, { type }, { default: () => `${row.score}分` })
        }
    },
    {
        title: '考试时间',
        key: 'time',
        render(row) {
            return new Date(row.time).toLocaleString()
        }
    }
]

const showHistoryModal = ref(false)
const selectedUserRecords = ref<ExamRecord[]>([])

// 分页配置
const pagination = {
    pageSize: 10
}

// 刷新数据
const refreshData = () => {
    message.success('数据已刷新')
}

// 重置密码
const handleResetPassword = (userName: string) => {
    userStore.resetUserPassword(userName)
    message.success('密码已重置为：123456')
}

// 删除用户
const handleDeleteUser = (userName: string) => {
    userStore.deleteUser(userName)
    message.success('用户已删除')
}

const dialog = useDialog()

// 清空数据
const clearStore = () => {
    dialog.warning({
        title: '清空数据',
        content: '确定要清空数据吗？',
        positiveText: '清空',
        negativeText: '取消',
        onPositiveClick: () => {
            userStore.clearStore()
            message.success('数据已清空')
        }
    })
}

// 查看历史成绩
const handleViewHistory = (user: User) => {
    selectedUserRecords.value = user.examRecords || []
    showHistoryModal.value = true
}

// 题目设置
const questionSettings = ref({
    scores: {
        单选: userStore.getQuestionScores.choice,
        多选: userStore.getQuestionScores.multiple,
        判断: userStore.getQuestionScores.judgment,
        简答: userStore.getQuestionScores.essay,
        填空: userStore.getQuestionScores.fill,
        扩展: userStore.getQuestionScores.expand
    },
    counts: {
        单选: userStore.getQuestionCounts.choice,
        多选: userStore.getQuestionCounts.multiple,
        判断: userStore.getQuestionCounts.judgment,
        简答: userStore.getQuestionCounts.essay,
        填空: userStore.getQuestionCounts.fill,
        扩展: userStore.getQuestionCounts.expand
    }
})

// 保存题目设置
const saveQuestionSettings = () => {
    userStore.setQuestionScores({
        choice: questionSettings.value.scores.单选,
        multiple: questionSettings.value.scores.多选,
        judgment: questionSettings.value.scores.判断,
        essay: questionSettings.value.scores.简答,
        fill: questionSettings.value.scores.填空,
        expand: questionSettings.value.scores.扩展
    })
    userStore.setQuestionCounts({
        choice: questionSettings.value.counts.单选,
        multiple: questionSettings.value.counts.多选,
        judgment: questionSettings.value.counts.判断,
        essay: questionSettings.value.counts.简答,
        fill: questionSettings.value.counts.填空,
        expand: questionSettings.value.counts.扩展
    })
    message.success('题目设置已保存')
}

</script>

<style scoped>
.admin-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
