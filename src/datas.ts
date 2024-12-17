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

// 定义题目分值
export const QUESTION_SCORES = {
    choice: 3,     // 单选题
    multiple: 4,   // 多选题
    judgment: 3,   // 判断题
    essay: 20      // 阐述题
}

// 定义抽题数量
export const QUESTION_COUNTS = {
    choice: 8,     // 个单选题
    multiple: 4,   // 个多选题
    judgment: 8,   // 个判断题
    essay: 2       // 个阐述题
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
    private choiceQuestions: Question[] = []
    private multipleQuestions: Question[] = []  // 新增多选题数组
    private judgmentQuestions: Question[] = []
    private essayQuestions: Question[] = []
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
                this.loadExcel('multiple.xls'),  // 新增多选题文件
                this.loadExcel('judgment.xls'),
                this.loadExcel('essay.xls')
            ])

            // 转换Excel数据为题目格式
            this.choiceQuestions = this.transformChoiceQuestions(choiceData)
            this.multipleQuestions = this.transformMultipleQuestions(multipleData)
            this.judgmentQuestions = this.transformJudgmentQuestions(judgmentData)
            this.essayQuestions = this.transformEssayQuestions(essayData)

            this.initialized = true
            console.log('Data initialized successfully')
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
                title: String(item.title).trim(),
                answer: String(item.answer || '').trim(),
                keywords: String(item.keywords || '')
                    .split(',')
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

    getVideos() {
        return this.videos
    }

    getQuestions() {
        return [
            ...this.choiceQuestions,
            ...this.multipleQuestions,  // 添加多选题
            ...this.judgmentQuestions,
            ...this.essayQuestions
        ]
    }

    getDataPath() {
        return this.dataPath
    }
}

export const dataManager = new DataManager()
