无人机培训系统项目结构
根据仓库代码和README.md，这是一个基于Electron+Vue3开发的无人机培训系统，主要用于视频学习和考试。下面是项目的整体结构：

项目目录结构
/Users/hotuns/code/answer/
├── electron/                 # Electron主进程代码
│   ├── main.ts               # 主进程入口文件
│   ├── preload.ts            # 预加载脚本
│   └── electron-env.d.ts     # Electron环境类型定义
│
├── src/                      # Vue前端代码（渲染进程）
│   ├── main.ts               # 前端入口文件
│   ├── App.vue               # 根组件
│   ├── layout.vue            # 布局组件
│   ├── route.ts              # 路由配置
│   ├── store/                # 状态管理
│   │   └── index.ts          # 用户状态管理
│   ├── views/                # 页面组件
│   │   ├── Home.vue          # 首页
│   │   ├── Learn.vue         # 学习页面
│   │   ├── Exam.vue          # 考试页面
│   │   ├── User.vue          # 用户页面（成绩证书）
│   │   └── Admin.vue         # 管理员页面
│   ├── components/           # 通用组件
│   │   ├── Login.vue         # 登录组件
│   │   ├── Videos.vue        # 视频播放组件
│   │   ├── Questions.vue     # 题目学习组件
│   │   ├── APPExam.vue       # 考试组件
│   │   └── Result.vue        # 证书结果组件
│   ├── assets/               # 静态资源
│   └── datas.ts              # 数据管理
│
├── public/                   # 公共资源目录
├── dist-electron/            # Electron构建输出目录
└── doc/                      # 文档和截图

功能模块
1. 用户管理
用户登录系统（userLogin）
学习进度保存（saveVideoStates）
考试成绩记录（saveExamResult）
2. 视频学习
本地视频播放（Videos.vue）
播放进度保存
防跳过机制（必须按顺序完成视频）
多倍速播放（1x-5x）
3. 考试系统
支持多种题型（单选、多选、判断、填空、阐述题）
自动评分
成绩实时保存
4. 学习证明
自动生成证书（Result.vue）
导出为图片或PDF
包含学习记录和成绩
5. 管理员功能
用户管理
题目设置（分值和数量）
查看用户学习进度和考试成绩
技术实现
前端框架：Vue 3 + TypeScript
UI组件库：Naive UI
CSS框架：UnoCSS
状态管理：Pinia
数据存储：Electron Store
路由管理：Vue Router
数据流向
用户数据通过Electron Store存储在本地
视频学习进度实时保存
考试成绩自动计算并保存
学习证明可导出为图片或PDF
这个项目是一个完整的无人机培训系统，集成了视频学习、考试评估和证书生成功能，适合用于专业技能培训和考核。
