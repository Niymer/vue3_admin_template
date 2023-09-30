import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user.ts'
import pinia from '@/store'
import setting from '@/setting.ts'

let userStore = useUserStore(pinia)
nprogress.configure({ showSpinner: false })
//全局前置路由守卫
router.beforeEach(async (to: any, _: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置路由守卫
router.afterEach((_: any, __: any) => {
  nprogress.done()
})

//未登录-login，其余无法访问

//登录-不可以访问login
