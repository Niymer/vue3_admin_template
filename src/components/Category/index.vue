<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category.ts'
let categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
const getC1 = () => {
  categoryStore.getC1()
}
const handler = () => {
  // console.log(123)
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
const handler1 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
defineProps(['scene'])
</script>

<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          :disabled="scene == 0 ? false : true"
          @change="handler"
        >
          <el-option
            v-for="(c1, index) of categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          :disabled="scene == 0 ? false : true"
          @change="handler1"
        >
          <el-option
            v-for="(c2, index) of categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="(c3, index) of categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
