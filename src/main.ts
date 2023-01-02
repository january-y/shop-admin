import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:windi.css'
import 'normalize.css'
// import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
import '@/assets/css/index.less'

import App from './App.vue'
import router from './router'
// bus
import Mitt from 'mitt'

const mitt = Mitt()

//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    $mitt: typeof mitt
  }
}

const app = createApp(App)
app.config.globalProperties.$mitt = mitt
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)

app.mount('#app')
