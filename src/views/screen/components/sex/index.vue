<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    title: {
      text: '男女比例',
      textStyle: {
        color: 'skyblue',
      },
      left: '40%',
    },
    xAxis: {
      // type: 'category',
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'blue',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 40,
      top: 0,
      right: 40,
      bottom: 0,
    },
  })
})
</script>

<template>
  <div class="box">
    <div class="title">
      <p>男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man"><img src="../../images/man.png" alt="" /></div>
      <div class="woman"><img src="../../images/woman.png" alt="" /></div>
    </div>
    <dov class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </dov>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
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
  .sex {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .man {
      margin-right: 50px;
      width: 111px;
      height: 115px;
      background: url('../../images/man-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      margin-left: 50px;
      width: 111px;
      height: 115px;
      background: url('../../images/woman-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: center;
    color: white;
    p {
      margin: 10px 75px;
    }
  }
  .charts {
    height: 100px;
  }
}
</style>
