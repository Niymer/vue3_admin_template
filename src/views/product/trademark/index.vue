<script setup lang="ts"></script>

<template>
  <el-card class="box-card">
    <!--添加品牌按钮-->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!--表格：展示已有的平台数据-->
    <el-table style="margin: 10px 0" border>
      <el-table-column
        label="序号"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column label="品牌名称" align="center"></el-table-column>
      <el-table-column label="品牌LOGO" align="center"></el-table-column>
      <el-table-column label="品牌操作" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
