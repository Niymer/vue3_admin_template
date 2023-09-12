<script setup lang="ts">
import type {
  SpuData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImg,
  SaleAttr,
  HasSaleAttr, SaleAttrValue,
} from '@/api/product/spu/type.ts'
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr, reqAddOrUpdateSpu,
} from '@/api/product/spu'
import {computed, ref} from 'vue'
import {ElMessage} from "element-plus";

let $emit = defineEmits(['changeScene'])
let AlltradeMark = ref<Trademark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let SpuParams=ref<SpuData>({
  category3Id:'',
  spuName:'',
  description:'',
  tmId:'',
  spuImageList:[],
  spuSaleAttrList:[]
})
let dialogVisible=ref<boolean>(false)
let dialogImageUrl=ref<string>('')
let saleAttrIdAndValueName= ref<string>('')
let unSelectSaleAttr=computed(()=>{
  //颜色，版本，尺码
  let unSelectArr=allSaleAttr.value.filter(item=>{
    return saleAttr.value.every(item1=>{
      return item.name!=item1.saleAttrName
    })
  })
  return unSelectArr
})
const cancel = () => {
  $emit('changeScene', {flag:0,params:'update'})
}
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value=spu
  let result1: AllTrademark = await reqAllTrademark()
  let result2: SpuHasImg = await reqSpuImageList(spu.id as number)
  let result3: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  let result4: HasSaleAttrResponseData = await reqAllSaleAttr()
  AlltradeMark.value = result1.data
  imgList.value = result2.data.map(item=>{
    return {
      name:item.imgName,
      url:item.imgUrl
    }
  })
  saleAttr.value = result3.data
  allSaleAttr.value = result4.data
}
const handlePictureCardPreview = (file:any) => {
  dialogVisible.value=true
  dialogImageUrl.value=file.url
}
const handleRemove = () => {
  console.log(123)
}
const handlerUpload = (file:any) => {
  if(file.type=='image/png'||file.type=='image/jpeg'||file.type=='image/gif'){
    if(file.size/1024/1024<4){
      return true
    }else {
      ElMessage({
        type:'error',
        message:'上传的文件大小需在4M以内'
      })
      return false
    }
  }else {
    ElMessage({
      type:"error",
      message:'上传的文件格式必须是PNG|JPG|GIF'
    })
    return false
  }
}
const addSaleAttr = () => {
  const [baseSaleAttrId,saleAttrName]=saleAttrIdAndValueName.value.split(':')
  let newSaleAttr:SaleAttr={
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList:[]
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value=''
}
const toEdit = (row:SaleAttr) => {
  row.flag=true
  row.saleAttrValue=''
}
const toLook = (row: SaleAttr) => {
  //整理收集的属性的ID与属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row;
  //整理成服务器需要的属性值形式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: (saleAttrValue as string)
  }

  //非法情况判断
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空的'
    })
    return;
  }
  //判断属性值是否在数组当中存在
  let repeat = row.spuSaleAttrValueList.find(item => {
    return item.saleAttrValueName == saleAttrValue;
  })

  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复'
    })
    return;
  }
  //追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  //切换为查看模式
  row.flag = false;
}
const save = async () => {
  SpuParams.value.spuImageList=imgList.value.map((item:any)=>{
    return {
      imgName:item.name,
      imgUrl:(item.response&&item.response.data)||item.url
    }
  })
  SpuParams.value.spuSaleAttrList=saleAttr.value
  let result=await reqAddOrUpdateSpu(SpuParams.value)
  if(result.code==200){
    ElMessage({
      type:"success",
      message:SpuParams.value.id?'更新成功':'添加成功'
    })
    $emit('changeScene',{flag:0,params:SpuParams.value.id?'update':'add'})
  }else {
    ElMessage({
      type:"error",
      message:SpuParams.value.id?'更新失败':'添加失败'
    })
  }
}
const initAddSpu =async (c3Id:number|string) => {
  Object.assign(SpuParams.value,{
    category3Id:'',
    spuName:'',
    description:'',
    tmId:'',
    spuImageList:[],
    spuSaleAttrList:[]
  })
  imgList.value=[]
  saleAttr.value=[]
  saleAttrIdAndValueName.value=''
  SpuParams.value.category3Id=c3Id
  let result1:AllTrademark=await reqAllTrademark()
  let result2:HasSaleAttrResponseData=await  reqAllSaleAttr()
  AlltradeMark.value=result1.data
  allSaleAttr.value=result2.data
}
defineExpose({ initHasSpuData,initAddSpu })
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option v-for="(item,index) of AlltradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请你输入SPU描述" v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image"  style="width: 100%;height: 100%"/>
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:'无'" v-model="saleAttrIdAndValueName">
        <el-option v-for="(item,index) of unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        style="margin-left: 10px"
        :disabled="saleAttrIdAndValueName?false:true"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性称" width="120px" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <template #="{row,$index}">
            <el-tag
                v-for="(item,index) of row.spuSaleAttrValueList"
                :key="row.id"
                class="mx-1"
                closable
                style="margin-right:10px"
                @close="row.spuSaleAttrValueList.splice(index,1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input @blur="toLook(row)" v-if="row.flag" placeholder="请你输入属性值" size="small" style="width: 150px;" v-model="row.saleAttrValue" ></el-input>
            <el-button v-else type="success" size="small" icon="Plus" @click="toEdit(row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template #="{row,$index}">
            <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice($index,1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save" :disabled="saleAttr.length>0?false:true">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
