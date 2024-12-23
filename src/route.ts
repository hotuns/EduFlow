import { createRouter, createWebHashHistory } from "vue-router"
import { useUserStore } from "./store";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: 'index', path: '/', redirect: '/home' },
        { name: 'home', path: '/home', component: () => import('./views/Home.vue') },
        { name: 'learn', path: '/learn', component: () => import('./views/Learn.vue') },
        { name: 'exam', path: '/exam', component: () => import('./views/Exam.vue') },
        { name: 'admin', path: '/admin', component: () => import('./views/Admin.vue') },
        { name: 'user', path: '/user', component: () => import('./views/User.vue') },
    ],
})

// 路由守卫逻辑
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    // 如果未登录且不是访问登录页
    if (!userStore.getCurrentUser && to.name !== 'login') {
        next({ name: 'login' });
        return;
    }



    // 如果用户不是管理员且访问管理员页面，重定向到首页
    if (userStore.getCurrentUser?.type !== 'admin' && to.name == 'admin') {
        alert('您没有权限访问此页面');
        next({ name: 'home' });
        return;
    }

    next();
});

export default router
