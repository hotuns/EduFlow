<template>
    <div class="login-container w-screen h-screen flex justify-center items-center"
        :style="{ backgroundImage: `url(${bgGif})` }">
        <!-- 背景遮罩 -->
        <div class="overlay absolute inset-0"></div>

        <!-- 登录卡片 -->
        <div class="card-wrapper">
            <n-card class="login-card dark:bg-gray-800/80 backdrop-blur">
                <div class="text-center mb-8">
                    <h1 class="text-2xl font-bold dark:text-gray-100">系统登录</h1>
                </div>

                <n-form ref="formRef" :model="formValue" :rules="rules">
                    <n-form-item path="username" label="用户名">
                        <n-input v-model:value="formValue.username" placeholder="管理员: admin / 学员: 姓名"
                            class="dark:bg-gray-700/50">
                            <template #prefix>
                                <div class="i-carbon-user text-lg"></div>
                            </template>
                        </n-input>
                    </n-form-item>

                    <n-form-item path="password" label="密码">
                        <n-input v-model:value="formValue.password" type="password" placeholder="请输入密码"
                            show-password-on="click" class="dark:bg-gray-700/50">
                            <template #prefix>
                                <div class="i-carbon-password text-lg"></div>
                            </template>
                        </n-input>
                    </n-form-item>
                </n-form>

                <div class="flex justify-center mt-8">
                    <n-button type="primary" size="large" :loading="loading" @click="handleLogin" block>
                        <template #icon>
                            <div class="i-carbon-login"></div>
                        </template>
                        登录
                    </n-button>
                </div>

                <div class="mt-4 text-gray-400 text-sm text-center">
                    首次登录的学员将自动创建账号，默认密码：123456
                </div>
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store'
import { useRouter } from 'vue-router'
import type { FormInst } from 'naive-ui'
import bgGif from '../assets/ZY500.gif?url'

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
        trigger: ['blur', 'input']
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'input']
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
.login-container {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.overlay {
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(4px);
}
</style>
