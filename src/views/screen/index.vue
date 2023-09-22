<script setup lang="ts">
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import { onMounted, ref } from 'vue'
let screen = ref()

// 初始化屏幕缩放和位移
function setScreenTransform() {
  if (screen.value) {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
}

// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

onMounted(() => {
  setScreenTransform()
})

// 监听视口变化
window.onresize = () => {
  setScreenTransform()
}
</script>

<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">右边</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    left: 50%;
    top: 50%;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
          background: skyblue;
        }
      }
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 1040px;
        .tourist {
          flex: 1;
          //background-color: hotpink;
        }
        .sex {
          flex: 1;
          //background-color: skyblue;
        }
        .age {
          flex: 1;
          //background-color: coral;
        }
      }
    }
  }
}
</style>
