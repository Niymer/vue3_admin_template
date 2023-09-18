<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import {ref} from "vue";
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let layOutSettingStore = useLayOutSettingStore()
let dark=ref<boolean>(false)
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
const changeDark = () => {
  let html=document.documentElement
  dark.value?html.className='dark':html.className=''
}
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const setColor = () => {
  const html=document.documentElement
  html.style.setProperty('--el-color-primary',color.value)
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-popover
      placement='bottom'
      title="主题设置"
      :width="300"
      trigger="hover"
  >
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker size="default" @change="setColor" v-model="color" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch v-model="dark" size="default" @change="changeDark" active-icon="Moon" inactive-icon="Sunny" inline-prompt/>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <!--下拉菜单-->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
