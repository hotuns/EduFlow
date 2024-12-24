<template>
    <div class="admin-container">
        <n-card title="用户管理">
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
            <n-data-table :columns="columns" :data="userList" :pagination="pagination" :bordered="false" striped />
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store'
import { NTag, NButton, NSpace, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { User } from '../store'

const userStore = useUserStore()
const message = useMessage()

// 获取用户列表，排除管理员
const userList = computed(() => {
    return userStore.getUsers.filter(user => user.type === 'student')
})

// 表格列定义
const columns: DataTableColumns<User> = [
    {
        title: '用户名',
        key: 'name',
    },
    {
        title: '考试成绩',
        key: 'examScore',
        render(row) {
            if (row.examScore === undefined) {
                return h(NTag, { type: 'warning' }, { default: () => '未参加考试' })
            }
            const type = row.examScore >= 60 ? 'success' : 'error'
            return h(NTag, { type }, { default: () => `${row.examScore}分` })
        }
    },
    {
        title: '考试时间',
        key: 'examTime',
        render(row) {
            if (!row.examTime) return '未参加考试'
            return new Date(row.examTime).toLocaleString()
        }
    },
    {
        title: '视频学习进度',
        key: 'videoStates',
        render(row) {
            const completed = row.videoStates.filter(v => v.completed).length
            const total = row.videoStates.length || 0
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
                    // h(
                    //     NButton,
                    //     {
                    //         size: 'small',
                    //         onClick: () => handleResetPassword(row.name)
                    //     },
                    //     { default: () => '重置密码' }
                    // ),
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

</script>

<style scoped>
.admin-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
