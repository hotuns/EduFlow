<template>
    <n-layout has-sider class="h-screen">
        <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
            show-trigger @collapse="collapsed = true" @expand="collapsed = false">
            <n-menu :options="menuOptions" :value="defaultSelectedKey" />

            <!-- 用户信息和退出按钮 -->
            <div v-if="currentUser" class="absolute bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-black">
                <div class="flex items-center justify-between">
                    <span class="text-sm" v-show="!collapsed">{{ currentUser.name }}</span>
                    <n-button text type="error" @click="handleLogout">
                        退出
                    </n-button>
                </div>
            </div>
        </n-layout-sider>

        <n-layout class="p-4 ">
            <router-view />
        </n-layout>
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

const defaultSelectedKey = computed(() => {
    return route.name as string
})

const { collapsed, currentUser } = storeToRefs(userStore);

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
.n-layout-sider {
    position: relative;
}
</style>
