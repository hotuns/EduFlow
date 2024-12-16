import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import './style.css'
import './store'
import { dataManager } from './datas'


createApp(App).mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })

  dataManager.init()
})

