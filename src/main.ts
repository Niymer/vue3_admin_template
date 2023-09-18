import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import gloalComponent from '@/components'
import '@/styles/index.scss'
import router from '@/router'
import pinia from '@/store'
import './permisstion.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'

//获取应用实例对象
const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
