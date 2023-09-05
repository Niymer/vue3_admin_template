<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'

let $route = useRoute()
let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!--面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <!--动态展示路由名字和标题-->
    <el-breadcrumb-item
      v-for="(item, index) of $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 2px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
