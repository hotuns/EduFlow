import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'fs'
import * as xlsx from 'xlsx'

console.log('main.ts')
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import Store from 'electron-store';
Store.initRenderer();


// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

// 定义数据目录
const DATA_DIR = app.isPackaged
  ? path.join(process.resourcesPath, 'data')
  : path.join(process.env.APP_ROOT!, 'data')

// 添加调试信息
console.log('App is packaged:', app.isPackaged)
console.log('Resource path:', process.resourcesPath)
console.log('APP_ROOT:', process.env.APP_ROOT)
console.log('Data directory:', DATA_DIR)

// 添加IPC处理器
ipcMain.handle('get-data-path', () => DATA_DIR)

// 读取JSON文件
ipcMain.handle('load-json', async (_, filename: string) => {
  const filePath = path.join(DATA_DIR, filename)
  try {
    // 确保目录存在
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    const data = await fs.promises.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error loading ${filename}:`, error)
    // 返回空数组而不是 null，避免后续报错
    return []
  }
})

// 添加一个方法来检查文件是否存在
ipcMain.handle('check-file-exists', async (_, filepath: string) => {
  const fullPath = path.join(DATA_DIR, filepath)
  return fs.existsSync(fullPath)
})

// 添加读取Excel文件的IPC处理器
ipcMain.handle('load-excel', async (_, filename: string) => {
  const filePath = path.join(DATA_DIR, filename)
  console.log('Trying to load Excel file:', filePath)

  try {
    // 确保目录存在
    if (!fs.existsSync(DATA_DIR)) {
      console.log('Creating data directory:', DATA_DIR)
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }

    // 检查文件权限
    try {
      await fs.promises.access(filePath, fs.constants.R_OK)
      console.log('File is readable')
    } catch (err: any) {
      console.error('File access error:', err)
      throw new Error(`Cannot access file: ${err.message}`)
    }

    // 读取文件内容
    const buffer = await fs.promises.readFile(filePath)
    console.log('File read successfully, size:', buffer.length)

    // 读取Excel文件，添加配置项以提高兼容性
    const workbook = xlsx.read(buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: true,
      cellText: false,
      cellStyles: true,
      codepage: 0,
      dateNF: 'yyyy-mm-dd'
    })

    // 获取第一个工作表
    const sheetName = workbook.SheetNames[0]
    if (!sheetName) {
      console.error(`No sheets found in ${filename}`)
      return []
    }

    const worksheet = workbook.Sheets[sheetName]

    // 转换为JSON数据，添加配置项
    const data = xlsx.utils.sheet_to_json(worksheet, {
      raw: false,  // 返回格式化的字符串
      defval: '',  // 空单元格的默认值
      header: 1,   // 使用第一行作为标题
      blankrows: false  // 忽略空行
    })

    // 移除第一行（标题行）并处理数据
    const headers = data[0] as string[]
    const rows = data.slice(1).map((row: any) => {
      const obj: Record<string, string> = {}
      headers.forEach((header: string, index: number) => {
        obj[header.trim()] = row[index] || ''
      })
      return obj
    })

    return rows
  } catch (error) {
    console.error(`Detailed error loading ${filename}:`, error)
    return []
  }
})

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    width: 800,
    height: 900,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
