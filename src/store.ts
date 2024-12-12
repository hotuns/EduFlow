import Store from 'electron-store';
import type { VideoState } from './datas'

interface User {
    name: string;
    videoStates: VideoState[];
    result: number;
    resultTime: number;
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
                    result: 0,
                    resultTime: 0
                },
                ...getUsers.value
            ])
        }
        return user
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

    return {
        store,
        getUsers,
        userLogin,
        getVideoStates,
        saveVideoStates
    }
}
