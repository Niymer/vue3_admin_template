<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/user.ts'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting.ts'
let LayOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
let userStore = useUserStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_slider">
      <Logo />
      <!--滚动组件-->
      <el-scrollbar class="scrollbar">
        <!--菜单组件-->
        <el-menu
          background-color="#001529"
          text-color="white"
          active-text-color="skyblue"
          :default-active="$route.path"
          :collapse="LayOutSettingStore.fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar />
    </div>
    <!--内容展示区-->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    color: white;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-log-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
