<template>
    <div class="w-screen h-screen p-4 flex justify-center items-center bg-gray-100">
        <n-card class="w-400px">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold">系统登录</h1>
            </div>

            <n-form ref="formRef" :model="formValue" :rules="rules">
                <n-form-item path="username" label="用户名">
                    <n-input v-model:value="formValue.username" placeholder="管理员: admin / 学员: 姓名" />
                </n-form-item>

                <n-form-item path="password" label="密码">
                    <n-input v-model:value="formValue.password" type="password" placeholder="请输入密码"
                        show-password-on="click" />
                </n-form-item>
            </n-form>

            <div class="flex justify-center mt-8">
                <n-button type="primary" size="large" :loading="loading" @click="handleLogin" block>
                    登录
                </n-button>
            </div>

            <div class="mt-4 text-gray-400 text-sm text-center">
                首次登录的学员将自动创建账号，默认密码：123456
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store'
import { useRouter } from 'vue-router'
import type { FormInst } from 'naive-ui'

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const formValue = ref({
    username: '',
    password: ''
})

const rules = {
    username: {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }
}

const handleLogin = () => {
    formRef.value?.validate(async (errors) => {
        if (errors) return

        loading.value = true
        try {
            const user = userStore.userLogin(formValue.value.username.trim(), formValue.value.password)
            if (user) {
                message.success('登录成功')
                userStore.collapsed = false

                // 根据用户类型跳转到不同页面
                if (user.type === 'admin') {
                    router.push('/admin')
                } else {
                    router.push('/')
                }
            } else {
                message.error('用户名或密码错误')
            }
        } finally {
            loading.value = false
        }
    })
}
</script>

<style scoped>
:deep(.n-card-header) {
    padding: 16px 24px;
}

:deep(.n-card__content) {
    padding: 24px;
}

/* 步骤条图标样式 */
:deep(.n-step-indicator) {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 卡片阴影效果 */
:deep(.n-card) {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
        0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
</style>
