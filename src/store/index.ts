import { defineStore, storeToRefs } from 'pinia'
import Store from 'electron-store'
import type { VideoState } from '../datas'
import { watch } from 'vue'

// 用户类型
export type UserType = 'admin' | 'student'

// 用户接口
export interface User {
    name: string
    password: string
    type: UserType
    videoStates: VideoState[]
    examScore?: number
    examTime?: number
}

// Store 状态接口
interface StoreState {
    users: User[]
    currentUser: User | null
    collapsed: boolean
    theme: 'light' | 'dark'
}

// 创建 electron-store 实例
const electronStore = new Store()

// 初始化管理员账号
function initAdmin() {
    const users = electronStore.get('users') as User[]
    if (!users?.length) {
        const adminUser: User = {
            name: 'admin',
            password: 'nimda',
            type: 'admin',
            videoStates: []
        }
        electronStore.set('users', [adminUser])
        return [adminUser]
    }
    return users
}

export const useUserStore = defineStore('user', {
    state: (): StoreState => ({
        users: initAdmin(),
        currentUser: electronStore.get('currentUser') as User | null,
        collapsed: electronStore.get('collapsed') as boolean || false,
        theme: electronStore.get('theme') as 'light' | 'dark' || 'dark'
    }),

    getters: {
        getUsers: (state) => state.users,
        getCurrentUser: (state) => state.currentUser,
        getVideoStates: (state) => (userName: string) => {
            const user = state.users.find(u => u.name === userName)
            return user?.videoStates || []
        }
    },

    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
        },

        userLogin(name: string, password: string) {
            if (name === 'admin') {
                const adminUser = this.users.find(u => u.type === 'admin')
                if (adminUser && adminUser.password === password) {
                    this.currentUser = adminUser
                    return adminUser
                }
                return null
            }

            const user = this.users.find(u => u.name === name && u.type === 'student')
            if (user) {
                if (user.password === password) {
                    this.currentUser = user
                    return user
                }
                return null
            }

            const newUser: User = {
                name,
                password: '123456',
                type: 'student',
                videoStates: [],
                examScore: undefined,
                examTime: undefined
            }

            this.users.unshift(newUser)
            this.currentUser = newUser
            return newUser
        },

        logout() {
            this.currentUser = null
        },

        deleteUser(userName: string) {
            if (this.currentUser?.type !== 'admin') return
            const userIndex = this.users.findIndex(u => u.name === userName && u.type === 'student')
            if (userIndex >= 0) {
                this.users.splice(userIndex, 1)
            }
        },

        resetUserPassword(userName: string) {
            if (this.currentUser?.type !== 'admin') return
            const user = this.users.find(u => u.name === userName && u.type === 'student')
            if (user) {
                user.password = '123456'
                return true
            }
            return false
        },

        saveVideoStates(userName: string, states: VideoState[]) {
            const user = this.users.find(u => u.name === userName)
            if (user) {
                user.videoStates = states
            }
        },

        saveExamResult(userName: string, score: number) {
            const user = this.users.find(u => u.name === userName)
            if (user) {
                user.examScore = score
                user.examTime = Date.now()
            }
        }
    }
})

// 创建一个监听器来同步状态到 electron-store
export function setupStoreSync() {
    const store = useUserStore()
    const { users, currentUser, collapsed } = storeToRefs(store)

    // 监听用户数据变化
    watch(users, (newUsers) => {
        electronStore.set('users', newUsers)
    }, { deep: true })

    // 监听当前用户变化
    watch(currentUser, (newCurrentUser) => {
        electronStore.set('currentUser', newCurrentUser)
    }, { deep: true })

    // 监听折叠状态变化
    watch(collapsed, (newCollapsed) => {
        electronStore.set('collapsed', newCollapsed)
    })
} 
