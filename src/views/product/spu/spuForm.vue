<script setup lang="ts">
import type {
  SpuData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData, Trademark, SpuImg, SaleAttr,HasSaleAttr
} from "@/api/product/spu/type.ts";
import {reqAllTrademark,reqSpuImageList,reqSpuHasSaleAttr,reqAllSaleAttr} from "@/api/product/spu";
import {ref} from "vue";

let $emit=defineEmits(['changeScene'])
let AlltradeMark=ref<Trademark[]>([])
let imgList=ref<SpuImg[]>([])
let saleAttr=ref<SaleAttr[]>([])
let allSaleAttr=ref<HasSaleAttr[]>([])
const cancel = () => {
  $emit('changeScene',0)
}
const initHasSpuData =async (spu:SpuData) => {
  let result1:AllTrademark[]=await reqAllTrademark()
  let result2:SpuHasImg=await reqSpuImageList((spu.id as number))
  let result3:SaleAttrResponseData=await reqSpuHasSaleAttr((spu.id as number))
  let result4:HasSaleAttrResponseData=await reqAllSaleAttr()
  AlltradeMark.value=result1.data
  imgList.value=result2.data
  saleAttr.value=result3.data
  allSaleAttr.value=result4.data
}
defineExpose({initHasSpuData})
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="Apple"></el-option>
        <el-option label="Samsung"></el-option>
        <el-option label="Huawei"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请你输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="Apple"></el-option>
        <el-option label="Samsung"></el-option>
        <el-option label="Huawei"></el-option>
      </el-select>
      <el-button type="primary" size="default" icon="Plus" style="margin-left: 10px">添加属性值</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性称" width="120px"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作" width="100px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>