import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import type { UserState } from '@/store/modules/types/type.ts'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'
import { constantRoute } from '@/router/routes.ts'

let useUserStore = defineStore('User', {
  //小仓库：存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      // console.log(result)
      //200-成功-token
      //201-失败-登录失败错误的信息
      if (result.code === 200) {
        this.token = result.data.token as string
        // console.log(result.data.token)
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
