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

// 定义题目类型
export type QuestionType = 'choice' | 'text'

// 选择题选项接口
export interface Option {
    label: string
    value: string
}

// 题目接口
export interface Question {
    id: number
    type: QuestionType
    title: string
    options?: Option[]  // 选择题选项
    answer: string      // 正确答案
    score: number      // 分值
}

// 考试题目数据
export const questions: Question[] = [
    {
        id: 1,
        type: 'choice',
        title: '以下哪项是正确的？',
        options: [
            { label: 'A. 选项1', value: 'A' },
            { label: 'B. 选项2', value: 'B' },
            { label: 'C. 选项3', value: 'C' },
            { label: 'D. 选项4', value: 'D' }
        ],
        answer: 'A',
        score: 20
    },
    {
        id: 2,
        type: 'text',
        title: '请简述你的理解：',
        answer: '参考答案',
        score: 30
    }
    // ... 可以添加更多题目
]
