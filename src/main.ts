import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupStoreSync } from './store'

import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import './style.css'
import { dataManager } from './datas'

import router from './route'

const app = createApp(App)
app.use(createPinia())
// 设置状态同步
setupStoreSync()
app.use(router)
app.mount('#app').$nextTick(() => {
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })

  dataManager.init()
})

