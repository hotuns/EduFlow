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
    examRecords?: ExamRecord[]
}

// 考试记录接口
export interface ExamRecord {
    score: number
    time: number
}

// 定义题目分值
export const QUESTION_SCORES = {
    choice: 3,     // 单选题
    multiple: 5,   // 多选题
    judgment: 2,   // 判断题
    essay: 15,     // 简答题
    fill: 2        // 填空题
}

// 定义抽题数量
export const QUESTION_COUNTS = {
    choice: 10,    // 个单选题
    multiple: 4,   // 个多选题
    judgment: 10,  // 个判断题
    essay: 2,      // 个简答题
    fill: 5        // 个填空题
}

// Store 状态接口
interface StoreState {
    users: User[]
    currentUser: User | null
    collapsed: boolean
    theme: 'light' | 'dark'
    questionScores: typeof QUESTION_SCORES,
    questionCounts: typeof QUESTION_COUNTS
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
            videoStates: [],
            examRecords: []
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
        theme: electronStore.get('theme') as 'light' | 'dark' || 'dark',
        questionScores: electronStore.get('questionScores') as any || QUESTION_SCORES,
        questionCounts: electronStore.get('questionCounts') as any || QUESTION_COUNTS
    }),

    getters: {
        getUsers: (state) => state.users,
        getCurrentUser: (state) => state.currentUser,
        getVideoStates: (state) => (userName: string) => {
            const user = state.users.find(u => u.name === userName)
            return user?.videoStates || []
        },
        getQuestionScores: (state) => state.questionScores,
        getQuestionCounts: (state) => state.questionCounts
    },

    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
        },

        userLogin(name: string, password: string) {
            if (name === 'admin') {
                const adminUser: User = {
                    name: 'admin',
                    password: 'nimda',
                    type: 'admin',
                    videoStates: []
                }

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
                examRecords: []
            }

            this.users.unshift(newUser)
            this.currentUser = newUser
            return newUser
        },

        getUserInfo(userName: string) {
            const user = this.users.find(u => u.name === userName)
            return user
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

                this.users = this.users.map(u => u.name === userName ? user : u)
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
                const newRecord: ExamRecord = {
                    score,
                    time: Date.now()
                }
                user.examRecords = user.examRecords ? [...user.examRecords, newRecord] : [newRecord]
                console.log('保存考试结果', user)
                this.users = this.users.map(u => u.name === userName ? user : u)
            }
        },

        setQuestionScores(newScores: typeof QUESTION_SCORES) {
            this.questionScores = newScores
        },

        setQuestionCounts(newCounts: typeof QUESTION_COUNTS) {
            this.questionCounts = newCounts
        },

        clearStore() {
            this.users = []
            this.collapsed = false
            this.theme = 'dark'
            electronStore.clear()
        }
    }
})

// 创建一个监听器来同步状态到 electron-store
export function setupStoreSync() {
    const store = useUserStore()
    const { users, currentUser, collapsed, questionScores, questionCounts } = storeToRefs(store)

    // 监听题目分值变化
    watch(questionScores, (newScores) => {
        electronStore.set('questionScores', newScores)
    })

    // 监听抽题数量变化
    watch(questionCounts, (newCounts) => {
        electronStore.set('questionCounts', newCounts)
    })


    // 监听用户数据变化
    watch(users, (newUsers) => {
        console.log('同步用户数据', newUsers)
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
