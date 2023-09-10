<script setup lang="ts">
import {ref, watch} from "vue";
import useCategoryStore from "@/store/modules/category.ts";
import {reqHasSpu} from "@/api/product/spu";
import type {HasSpuResponseData, Records, SpuData} from "@/api/product/spu/type.ts";
import SpuForm from "@/views/product/spu/spuForm.vue";
import SkuForm from "@/views/product/spu/skuForm.vue";
let categoryStore=useCategoryStore()
let scene=ref<number>(0)//0:显示已有SPU，1:添加一个新的SPU｜修改已有的SPU结构，2:添加SKU结构
let pageNo=ref<number>(1)
let pageSize=ref<number>(3)
let records=ref<Records>([])
let total=ref<number>(0)
let spu=ref<any>()
watch(()=>categoryStore.c3Id,()=>{
  if(!categoryStore.c3Id) return
  getHasSpu()
})
const getHasSpu=async (pager=1)=>{
  pageNo.value=pager
  let result:HasSpuResponseData=await reqHasSpu(pageNo.value,pageSize.value,categoryStore.c3Id)
  if(result.code==200){
    records.value=result.data.records
    total.value=result.data.total
  }
}
const sizeChange = () => {
  getHasSpu()
}
const addSpu = () => {
  scene.value=1
}
const updateSpu = (row:SpuData) => {
  scene.value=1
  // console.log(spu.value)
  spu.value.initHasSpuData(row)
}
const changeScene = (num:number) => {
  scene.value=num
}
</script>

<template>
  <div>
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0">
      <div v-show="scene==0">
        <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true" @click="addSpu">添加SPU</el-button>
        <el-table style="margin: 10px 0" border :data="records">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{row,$index}">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
              <el-button type="warning" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="info" size="small" icon="InfoFilled" title="查看SKU列表"></el-button>
              <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[3,5,7,9]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getHasSpu"
            @size-change="sizeChange"
        />
      </div>
<!--      添加一个新的SPU｜修改已有的SPU结构-->
      <spu-form v-show="scene==1" @changeScene="changeScene" ref="spu"/>
<!--      添加SKU结构-->
      <sku-form v-show="scene==2"/>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
