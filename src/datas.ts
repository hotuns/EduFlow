// 添加视频状态类型定义
export interface VideoState {
    id: number
    completed: boolean
    lastPosition: number
}

// 视频列表接口
export interface Video {
    id: number
    title: string
    url: string
}

// 定义题目类型
export type QuestionType = 'choice' | 'judgment' | 'essay'

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
    answer?: string      // 选择题和判断题的答案
    keywords?: string[]  // 阐述题的关键词
    score?: number      // 分值会在代码中设置
}

// 定义题目分值
export const QUESTION_SCORES = {
    choice: 3,    // 选择题
    judgment: 3,  // 判断题
    essay: 20     // 阐述题
}

// 定义抽题数量
export const QUESTION_COUNTS = {
    choice: 10,   // 个选择题
    judgment: 10, // 个判断题
    essay: 2     // 个阐述题
}

// 从题库中随机抽取指定数量的题目
export const getRandomQuestions = (questions: Question[]): Question[] => {
    const choiceQuestions = questions.filter(q => q.type === 'choice')
    const judgmentQuestions = questions.filter(q => q.type === 'judgment')
    const essayQuestions = questions.filter(q => q.type === 'essay')

    // Fisher-Yates 洗牌算法
    const shuffle = (array: Question[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    // 随机抽取题目
    const selectedQuestions = [
        ...shuffle(choiceQuestions).slice(0, QUESTION_COUNTS.choice),
        ...shuffle(judgmentQuestions).slice(0, QUESTION_COUNTS.judgment),
        ...shuffle(essayQuestions).slice(0, QUESTION_COUNTS.essay)
    ]

    // 设置分值
    return selectedQuestions.map(q => ({
        ...q,
        score: QUESTION_SCORES[q.type]
    }))
}

// 数据加载函数
class DataManager {
    private videos: Video[] = []
    private questions: Question[] = []
    private dataPath: string = ''
    private initialized = false

    async init() {
        if (this.initialized) return

        try {
            this.dataPath = await window.ipcRenderer.invoke('get-data-path')
            this.videos = await this.loadJson('videos.json')
            this.questions = await this.loadJson('questions.json')
            this.initialized = true
            console.log('Data initialized successfully')
            console.log('Data path:', this.dataPath)
            console.log('Videos:', this.videos)
            console.log('Questions:', this.questions)
        } catch (error) {
            console.error('Failed to initialize data:', error)
            throw error
        }
    }

    private async loadJson(filename: string) {
        return window.ipcRenderer.invoke('load-json', filename)
    }

    getVideos() {
        return this.videos
    }

    getQuestions() {
        return this.questions
    }

    getDataPath() {
        return this.dataPath
    }
}

export const dataManager = new DataManager()
