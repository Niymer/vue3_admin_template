<script setup lang="ts">
import useUserStore from '@/store/modules/user.ts'
import { getTime } from '../../utils/time.ts'

let userStore = useUserStore()
</script>

<template>
  <el-card>
    <div class="box">
      <el-avatar
        :src="userStore.avatar"
        style="width: 100px; height: 100px"
      ></el-avatar>
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好!{{ userStore.username }}</h3>
        <p class="subtitle">硅谷甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="bgc">
    <svg-icon name="welcome" width="500px" height="500px" />
  </div>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  .bottom {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle {
      font-style: italic;
      color: tan;
    }
  }
}
.bgc {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
