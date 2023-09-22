<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
let charts = ref()
onMounted(() => {
  let mychart = echarts.init(charts.value)
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 35,
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '体育' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '科教' },
          { value: 300, name: '军事' },
        ],
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  }
  mychart.setOption(option)
})
</script>

<template>
  <div class="box">
    <div class="title">
      <p>年龄比例</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
