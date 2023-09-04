<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/user.ts'
let userStore = useUserStore()
</script>

<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_slider">
      <Logo />
      <!--滚动组件-->
      <el-scrollbar class="scrollbar">
        <!--菜单组件-->
        <el-menu background-color="$base-menu-background" text-color="white">
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div class="layout_tabbar">456</div>
    <!--内容展示区-->
    <div class="layout_main">
      <p style="height: 10000px; background-color: peachpuff"></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  color: white;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
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
    background-color: hotpink;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: yellow;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
