import { createRouter, createWebHashHistory } from "vue-router"
import { useUserStore } from "./store"

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

// 添加考试状态追踪
let isInExam = false
let examComponent: any = null

// 路由守卫逻辑
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    // 如果未登录且不是访问登录页
    if (!userStore.getCurrentUser && to.name !== 'home') {
        next({ name: 'home' })
        return
    }

    // 如果正在考试中且尝试离开考试页面
    if (isInExam && from.name === 'exam' && to.name !== 'exam') {
        if (!examComponent?.examSubmitted) {
            if (window.confirm('考试尚未提交，确定要离开吗？离开后答题记录将丢失。')) {
                isInExam = false
                examComponent = null
                next()
            } else {
                next(false)
            }
            return
        }
    }

    // 如果进入考试页面
    if (to.name === 'exam') {
        isInExam = true
    }

    // 如果用户不是管理员且访问管理员页面，重定向到首页
    if (userStore.getCurrentUser?.type !== 'admin' && to.name === 'admin') {
        alert('您没有权限访问此页面')
        next({ name: 'home' })
        return
    }

    next()
})

// 添加路由实例的方法，用于设置考试组件的引用
export const setExamComponent = (component: any) => {
    examComponent = component
}

export default router
