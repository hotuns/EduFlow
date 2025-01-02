import { useUserStore } from './store'

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
export type QuestionType = 'choice' | 'multiple' | 'judgment' | 'essay'

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

// 修改题库返回类型
export interface QuestionBank {
    choice: Question[]
    multiple: Question[]
    judgment: Question[]
    essay: Question[]
}

// 从题库中随机抽取指定数量的题目
export const getRandomQuestions = (questionBank: QuestionBank): Question[] => {
    const store = useUserStore()
    const questionScores = store.getQuestionScores
    const questionCounts = store.getQuestionCounts

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
        ...shuffle([...questionBank.choice]).slice(0, questionCounts.choice),
        ...shuffle([...questionBank.multiple]).slice(0, questionCounts.multiple),
        ...shuffle([...questionBank.judgment]).slice(0, questionCounts.judgment),
        ...shuffle([...questionBank.essay]).slice(0, questionCounts.essay)
    ]

    // 设置分值
    return selectedQuestions.map(q => ({
        ...q,
        score: questionScores[q.type]
    }))
}

// 视频组接口
export interface VideoGroup {
    group: string
    videos: Video[]
}

// 修改 DataManager 类
class DataManager {
    private videos: VideoGroup[] = []
    private questionBank: QuestionBank = {
        choice: [],
        multiple: [],
        judgment: [],
        essay: []
    }
    private dataPath: string = ''
    private initialized = false

    async init() {
        if (this.initialized) return

        try {
            this.dataPath = await window.ipcRenderer.invoke('get-data-path')
            console.log('Data path:', this.dataPath)

            // 读取视频数据
            this.videos = await this.loadJson('videos.json')

            // 确保数据目录存在
            const dataPath = await window.ipcRenderer.invoke('get-data-path')
            console.log('Checking data files in:', dataPath)

            // 读取各类型题目
            const files = ['choice.xls', 'multiple.xls', 'judgment.xls', 'essay.xls']
            for (const file of files) {
                const exists = await window.ipcRenderer.invoke('check-file-exists', file)
                console.log(`File ${file} exists:`, exists)
            }

            const [choiceData, multipleData, judgmentData, essayData] = await Promise.all([
                this.loadExcel('choice.xls'),
                this.loadExcel('multiple.xls'),
                this.loadExcel('judgment.xls'),
                this.loadExcel('essay.xls')
            ])

            // 转换Excel数据为题目格式
            this.questionBank.choice = this.transformChoiceQuestions(choiceData)
            this.questionBank.multiple = this.transformMultipleQuestions(multipleData)
            this.questionBank.judgment = this.transformJudgmentQuestions(judgmentData)
            this.questionBank.essay = this.transformEssayQuestions(essayData)

            this.initialized = true
            console.log('Data initialized successfully')
            console.log('choiceQuestions', this.questionBank.choice)
            console.log('multipleQuestions', this.questionBank.multiple)
            console.log('judgmentQuestions', this.questionBank.judgment)
            console.log('essayQuestions', this.questionBank.essay)
        } catch (error) {
            console.error('Failed to initialize data:', error)
            throw error
        }
    }

    private async loadJson(filename: string) {
        return window.ipcRenderer.invoke('load-json', filename)
    }

    private async loadExcel(filename: string, retries = 3): Promise<any[]> {
        for (let i = 0; i < retries; i++) {
            try {
                const data = await window.ipcRenderer.invoke('load-excel', filename)
                if (data && data.length > 0) {
                    return data
                }
                console.warn(`Attempt ${i + 1}: File ${filename} loaded but empty`)
            } catch (error) {
                console.error(`Attempt ${i + 1} failed for ${filename}:`, error)
                if (i === retries - 1) throw error
                await new Promise(resolve => setTimeout(resolve, 1000)) // 等待1秒后重试
            }
        }
        return []
    }

    // 转换选择题数据
    private transformChoiceQuestions(data: any[]): Question[] {
        return data.filter(item => item.title && item.optionA && item.optionB)  // 确保必要字段存在
            .map((item, index) => ({
                id: index + 1,
                type: 'choice',
                title: String(item.title).trim(),
                options: [
                    { label: 'A', value: String(item.optionA || '').trim() },
                    { label: 'B', value: String(item.optionB || '').trim() },
                    { label: 'C', value: String(item.optionC || '').trim() },
                    { label: 'D', value: String(item.optionD || '').trim() }
                ].filter(opt => opt.value), // 移除空选项
                answer: String(item.answer || '').trim().toUpperCase()
            }))
    }

    // 转换判断题数据
    private transformJudgmentQuestions(data: any[]): Question[] {
        return data.filter(item => item.title && item.answer)  // 确保必要字段存在
            .map((item, index) => ({
                id: index + 1,
                type: 'judgment',
                title: String(item.title).trim(),
                answer: String(item.answer).trim().toLowerCase()
            }))
    }

    // 转换简答题数据
    private transformEssayQuestions(data: any[]): Question[] {
        return data.filter(item => item.title)  // 确保必要字段存在
            .map((item, index) => ({
                id: index + 1,
                type: 'essay',
                title: String(item.title),
                answer: String(item.answer || ''),
                keywords: String(item.keywords || '')
                    .split(' ')
                    .map(k => k.trim())
                    .filter(k => k)  // 移除空关键词
            }))
    }

    // 新增多选题数据转换方法
    private transformMultipleQuestions(data: any[]): Question[] {
        return data.filter(item => item.title && item.options)  // 确保必要字段存在
            .map((item, index) => {
                // 解析选项字符串
                const optionPairs = String(item.options || '').split(';')
                const options = optionPairs
                    .map(pair => {
                        const [label, value] = pair.split(':')
                        return { label: label.trim(), value: value.trim() }
                    })
                    .filter(opt => opt.label && opt.value)  // 过滤掉无效选项

                // 解析答案字符串
                const answers = String(item.answer || '').split(',').map(a => a.trim())

                return {
                    id: index + 1,
                    type: 'multiple',
                    title: String(item.title).trim(),
                    options,
                    answer: answers.join(','),  // 将答案数组转换为逗号分隔的字符串
                    isMultiple: true  // 标记为多选题
                }
            })
    }

    // 获取所有视频（扁平化）
    getVideos(): Video[] {
        return this.videos.reduce((allVideos, group) => {
            return [...allVideos, ...group.videos]
        }, [] as Video[])
    }

    // 获取视频组
    getVideoGroups(): VideoGroup[] {
        return this.videos
    }

    // 根据ID获取视频
    getVideoById(id: number): Video | undefined {
        for (const group of this.videos) {
            const video = group.videos.find(v => v.id === id)
            if (video) return video
        }
        return undefined
    }

    getQuestions(): QuestionBank {
        return this.questionBank
    }

    getDataPath() {
        return this.dataPath
    }
}

export const dataManager = new DataManager()
