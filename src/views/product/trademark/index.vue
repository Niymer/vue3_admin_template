<script setup lang="ts">
</script>

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
    <!--分页器-->
    <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<style scoped lang="scss"></style>
