<script setup lang="ts">
import useCategoryStore from '@/store/modules/category.ts'
import {watch,ref} from "vue";
import {reqAttr} from "@/api/product/attr";
import type {AttrResponseData,Attr} from '@/api/product/attr/type.ts'
let categoryStore = useCategoryStore()
let attrArr=ref<Attr[]>([])
watch(()=>categoryStore.c3Id, ()=>{
  attrArr.value=[]
  if(!categoryStore.c3Id) return
  getAttr()
})
const getAttr=async ()=>{
  const {c1Id,c2Id,c3Id}=categoryStore
  let result:AttrResponseData= await reqAttr(c1Id,c2Id,c3Id)
  if(result.code==200){
    attrArr.value=result.data
  }
}
let scene=ref<number>(1)//scene=1,添加与修改界面，scene=0,显示table
const addAttr=()=>{
  scene.value=1
}
const updateAttr=()=>{
  scene.value=1
}
const cancer=()=>{
  scene.value=0
}
</script>

<template>
  <div>
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0">
      <div v-show="scene==0">
        <el-button
            type="primary"
            size="default"
            icon="Plus"
            :disabled="categoryStore.c3Id ? false : true"
            @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column
              label="序号"
              type="index"
              align="center"
              width="80px"
          ></el-table-column>
          <el-table-column
              label="属性名称"
              align="center"
              width="120px"
              prop="attrName"
          ></el-table-column>
          <el-table-column
              label="属性值名称"
              type="index"
              align="center"
              width="840px"
          >
            <template #="{row,$index}">
              <el-tag style="margin: 5px" v-for="(item,index) of row.attrValueList" :key="item.id">{{item.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              type="index"
              align="center"
              width="120px"
          >
            <template #="{row,$index}">
              <el-button type="warning" size="small" icon="Edit" @click="updateAttr"></el-button>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene==1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请你输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus">添加属性值</el-button>
        <el-button  size="default" @click="cancer">取消</el-button>
        <el-table border style="margin: 10px 0">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary" size="default" >保存</el-button>
        <el-button  size="default" @click="cancer">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
