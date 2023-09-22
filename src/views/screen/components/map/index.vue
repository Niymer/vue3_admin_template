<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'
let map = ref()
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let mychart = echarts.init(map.value)
  mychart.setOption({
    geo: {
      map: 'china',
      roam: true,
      left: 50,
      right: 50,
      top: 100,
      bottom: 0,
      zoom: 1.1,
      label: {
        show: true,
        color: 'white',
        fontSize: 14,
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          color: 'red',
        },
        label: {
          fontSize: 28,
        },
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [121.472644, 31.231706], // 终点// 如果 polyline 为 true 还可以设置更多的点// 终点// 如果 polyline 为 true 还可以设置更多的点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 6,
            },
          },
          {
            coords: [
              [116.405285, 39.904989],
              [126.642464, 45.756967],
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 6,
            },
          },
          {
            coords: [
              [91.132212, 29.660361], // 起点
              [121.472644, 31.231706], // 终点// 如果 polyline 为 true 还可以设置更多的点// 终点// 如果 polyline 为 true 还可以设置更多的点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 6,
            },
          },
          {
            coords: [
              [104.065735, 30.659462], // 起点
              [110.33119, 20.031971], // 终点// 如果 polyline 为 true 还可以设置更多的点// 终点// 如果 polyline 为 true 还可以设置更多的点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 6,
            },
          },
        ],
        effect: {
          show: true,
          symbol: 'arrow',
          symbolSize: 20,
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<template>
  <div class="box" ref="map">地图组件</div>
</template>

<style scoped lang="scss">
.box {
}
</style>
