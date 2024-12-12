import Store from 'electron-store';

interface User {
    name: string;
    doneVideos: number[];
    result: number;
    resultTime: number;
}

export const useStore = () => {
    const store = new Store();

    const getUsers = computed(() => {
        const list = store.get('users') as User[]
        console.log(list)
        if (!list) {
            store.set('users', [])
            return []
        }
        return list
    })

    const userLogin = (name: string) => {
        const user = getUsers.value.find((user: any) => user.name === name)
        if (!user) {
            store.set('users', [
                {
                    name,
                    doneVideos: [],
                    result: 1,
                    resultTime: 1
                },
                ...getUsers.value
            ])
        }
        return user
    }

    return {
        store,
        getUsers,
        userLogin
    }
}
