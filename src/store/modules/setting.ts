//layout组件相关配置
import { defineStore } from 'pinia'
let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refsh: false,
    }
  },
})
export default useLayOutSettingStore
