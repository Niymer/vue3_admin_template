<template>
  <div class="box">
    <h1>我是App根目录文件</h1>
  </div>
</template>
<script setup lang="ts">
for(let i=0;i<100;i++)
{
  console.log(i)
}
</script>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background-color: black;
  h1 {
    color: white;
  }
}
</style>
