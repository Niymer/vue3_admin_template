import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserState } from '@/store/modules/types/type.ts'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
import { constantRoute } from '@/router/routes.ts'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type.ts'

let useUserStore = defineStore('User', {
  //小仓库：存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      // console.log(result)
      //200-成功-token
      //201-失败-登录失败错误的信息
      if (result.code === 200) {
        this.token = result.data as string
        // console.log(result.data.token)
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result: any = await reqLogout()
      // console.log(result)
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
