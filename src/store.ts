import Store from 'electron-store';
import type { VideoState } from './datas'

interface User {
    name: string;
    videoStates: VideoState[];
    examScore?: number;
    examTime?: number;
}

export const useStore = () => {
    const store = new Store();
    // 清空
    // store.clear()


    const getUsers = computed(() => {
        const list = store.get('users') as User[]
        if (!list) {
            store.set('users', [])
            return []
        }
        return list
    })

    const userLogin = (name: string) => {
        const user = getUsers.value.find((user: User) => user.name === name)
        if (!user) {
            store.set('users', [
                {
                    name,
                    videoStates: [],
                    examScore: undefined,
                    examTime: undefined
                },
                ...getUsers.value
            ])
        }
        return user
    }

    const deleteUser = (userName: string) => {
        const users = getUsers.value
        const userIndex = users.findIndex(u => u.name === userName)
        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            store.set('users', users)
        }
    }

    const getVideoStates = (userName: string) => {
        const user = getUsers.value.find(u => u.name === userName)
        return user?.videoStates || []
    }

    const saveVideoStates = (userName: string, states: VideoState[]) => {
        const users = getUsers.value
        const userIndex = users.findIndex(u => u.name === userName)
        if (userIndex >= 0) {
            users[userIndex].videoStates = states
            store.set('users', users)
        }
    }

    const saveExamResult = (userName: string, score: number) => {
        const users = getUsers.value
        const userIndex = users.findIndex(u => u.name === userName)
        if (userIndex >= 0) {
            users[userIndex].examScore = score
            users[userIndex].examTime = Date.now()
            store.set('users', users)
        }
    }

    return {
        store,
        getUsers,
        deleteUser,
        userLogin,
        getVideoStates,
        saveVideoStates,
        saveExamResult
    }
}
