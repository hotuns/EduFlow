<template>
    <n-layout class="h-screen">
        <!-- 标题栏（类似窗口标题栏） -->
        <n-layout-header class="h-10 flex items-center px-4 bg-gradient-to-r from-emerald-500 to-emerald-600">
            <div class="flex items-center gap-2 text-white">
                <div class="i-carbon-drone text-lg"></div>
                <span class="text-sm font-medium">无人机培训系统</span>
            </div>
        </n-layout-header>

        <!-- 工具栏（包含主要功能按钮） -->
        <n-layout-header bordered class="h-16 px-4 bg-gray-50">
            <div class="h-full flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <n-button-group>
                        <n-button @click="router.push({ name: 'home' })" :type="route.name === 'home' ? 'primary' : 'default'">
                            <template #icon><div class="i-carbon-home"></div></template>
                            首页
                        </n-button>
                        <n-button @click="router.push({ name: 'learn' })" :type="route.name === 'learn' ? 'primary' : 'default'">
                            <template #icon><div class="i-carbon-video"></div></template>
                            学习培训
                        </n-button>
                        <n-button @click="router.push({ name: 'exam' })" :type="route.name === 'exam' ? 'primary' : 'default'">
                            <template #icon><div class="i-carbon-exam-mode"></div></template>
                            模拟考试
                        </n-button>
                        <n-button @click="router.push({ name: 'user' })" :type="route.name === 'user' ? 'primary' : 'default'">
                            <template #icon><div class="i-carbon-certificate"></div></template>
                            成绩证书
                        </n-button>
                        <n-button v-if="currentUser?.type === 'admin'" @click="router.push({ name: 'admin' })" 
                            :type="route.name === 'admin' ? 'primary' : 'default'">
                            <template #icon><div class="i-carbon-settings"></div></template>
                            管理员
                        </n-button>
                    </n-button-group>
                </div>

                <!-- 用户信息 -->
                <div v-if="currentUser" class="flex items-center gap-3">
                    <n-badge>
                        <n-avatar round size="small">{{ currentUser.name[0] }}</n-avatar>
                    </n-badge>
                    <span class="text-sm text-gray-600">{{ currentUser.name }}</span>
                    <n-button quaternary size="small" @click="handleLogout">
                        <template #icon><div class="i-carbon-logout"></div></template>
                        退出
                    </n-button>
                </div>
            </div>
        </n-layout-header>

        <!-- 主内容区域 -->
        <n-layout-content class="p-4 bg-gray-100">
            <router-view />
        </n-layout-content>

        <Login v-model="showLoginModal" />
    </n-layout>
</template>

<script setup lang="ts">
import { MenuOption } from 'naive-ui';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useUserStore } from './store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const message = useMessage();
const route = useRoute();

const showLoginModal = ref(!userStore.currentUser)
// 监听用户登录状态
watch(() => userStore.currentUser, (newVal) => {
    showLoginModal.value = !newVal
})

const defaultSelectedKey = computed(() => {
    return route.name as string
})

const { collapsed, currentUser, theme } = storeToRefs(userStore);

// 渲染图标
function renderIcon(icon: string) {
    return () => h('div', { class: icon })
}

const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: { name: 'home' } }, { default: () => '首页' }),
        key: 'home',
        icon: renderIcon('i-carbon-home'),
    },
    {
        label: () => h(RouterLink, { to: { name: 'learn' } }, { default: () => '学习培训' }),
        key: 'learn',
        icon: renderIcon('i-carbon-video'),
    },
    {
        label: () => h(RouterLink, { to: { name: 'exam' } }, { default: () => '模拟考试' }),
        key: 'exam',
        icon: renderIcon('i-carbon-exam-mode'),
    },
    {
        label: () => h(RouterLink, { to: { name: 'user' } }, { default: () => '成绩证书' }),
        key: 'user',
        icon: renderIcon('i-carbon-certificate'),
    },
    {
        label: () => h(RouterLink, { to: { name: 'admin' } }, { default: () => '管理员' }),
        key: 'admin',
        icon: renderIcon('i-carbon-settings'),
    }
]


// 处理退出登录
const handleLogout = () => {
    userStore.logout();
    message.success('已退出登录');
    router.push('/');
}

</script>


<style scoped>
:deep(.n-button) {
    padding: 8px 16px;
}

:deep(.n-button-group .n-button:not(:last-child)) {
    margin-right: 1px;
}

.n-layout-header {
    position: relative;
    z-index: 1000;
}

.n-layout-content {
    position: relative;
    height: calc(100vh - 104px); /* 减去标题栏和工具栏的高度 */
    overflow-y: auto;
}
</style>
