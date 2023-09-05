<script setup lang="ts">
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import Setting from '@/layout/tabbar/setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!--左侧-->
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <!--右侧-->
      <Setting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, #e7dfdf, #d9cdcd, #e0c3c3);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
