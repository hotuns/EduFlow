export const videos = [
    {
        id: 1,
        title: '视频1',
        url: '/videos/1.mp4',
    },
    {
        id: 2,
        title: '视频2',
        url: '/videos/2.mp4',
    },
]

// 添加视频状态类型定义
export interface VideoState {
    id: number
    completed: boolean
    lastPosition: number
}
