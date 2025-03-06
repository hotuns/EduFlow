<template>
    <n-modal v-model:show="showLogin" :mask-closable="false" transform-origin="center">
        <n-card class="login-card dark:bg-gray-800/80 backdrop-blur" style="width: 400px">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold dark:text-gray-100">学员登录</h1>
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
    </n-modal>
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

// 控制登录框显示
const showLogin = ref(true)

// 添加 props 和 emits
const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
    showLogin.value = val
})

// 监听 showLogin 变化
watch(showLogin, (val) => {
    emit('update:modelValue', val)
})

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
                showLogin.value = false

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
.login-card {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>
