<script setup lang="ts">
import useCategoryStore from "@/store/modules/category.ts";
let categoryStore=useCategoryStore()
</script>

<template>
  <div>
    <Category/>
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true">添加属性</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" type="index" align="center" width="150px"></el-table-column>
        <el-table-column label="属性值名称" type="index" align="center" width="800px"></el-table-column>
        <el-table-column label="操作" type="index" align="center" width="140px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
