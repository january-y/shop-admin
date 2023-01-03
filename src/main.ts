import { createApp } from 'vue'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:windi.css'
import 'normalize.css'
// import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
import '@/assets/css/index.less'

import router from './router'
import pinia from './stores'
// bus
import Mitt from 'mitt'
import { checkRouter } from '@/router/index'

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

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
const menus: any = JSON.parse(localStorage.getItem('menus') as string)
if (menus) checkRouter(menus)
app.mount('#app')
