<script setup lang="ts">
import setting from '@/setting.ts'
</script>

<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-log-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-logo-title-fontsize;
    margin-left: 10px;
  }
}
</style>
