<script setup lang="ts">
import {ref,onMounted,reactive,nextTick} from "vue";
import {reqHasTrademark,reqAddOrUpdateTrademark,reqDeleteTrademark} from "@/api/product/trademark";
import type {Records,TrademarkResponseData,Trademark} from "@/api/product/trademark/type.ts";
import type { UploadProps } from 'element-plus'
import {ElMessage} from "element-plus";

let pageNo=ref(1) //当前页码
let limit=ref<number>(3)
let total=ref<number>(0)
let trademarkArr=ref<Records>([])
let dialogFormVisible=ref(false)
let trademarkParams=reactive<Trademark>({
  tmName:'',
  logoUrl:''
})
let formRef=ref()
const getHasTrademark= async (pager=1)=>{
  pageNo.value=pager
  let result:TrademarkResponseData= await reqHasTrademark(pageNo.value,limit.value)
  if (result.code==200){
    total.value=result.data.total;
    trademarkArr.value=result.data.records;
  }
}
onMounted(()=>{
  getHasTrademark()
})
const sizeChange=()=>{
  getHasTrademark()
}

const addTrademark=()=>{
  dialogFormVisible.value=true
  trademarkParams.id=0;
  trademarkParams.logoUrl='';
  trademarkParams.tmName='';
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  nextTick(()=>{
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
const updateTrademark=(row:Trademark)=>{
  nextTick(()=>{
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogFormVisible.value=true
  // trademarkParams.tmName=raw.tmName;
  // trademarkParams.logoUrl=raw.logoUrl
  // trademarkParams.id=raw.id
  Object.assign(trademarkParams,row)
}
const cancel=()=>{
  dialogFormVisible.value=false;
}
const confirm= async ()=>{
  await formRef.value.validate()
  // console.log(checkResult)
  // dialogFormVisible.value=false
  let result:any= await reqAddOrUpdateTrademark(trademarkParams)
  // console.log(result)
  if(result.code==200){
    dialogFormVisible.value=false
    ElMessage({
      type:"success",
      message:trademarkParams.id?'修改品牌成功':'添加品牌成功'
    })
    getHasTrademark(trademarkParams.id?pageNo.value:1)
  }else{
    ElMessage({
      type:"error",
      message:trademarkParams.id?'修改品牌失败':'添加品牌失败'
    })
    dialogFormVisible.value=false
  }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if(rawFile.type=='image/png'||rawFile.type=='image/jpeg'||rawFile.type=='image/gif'){
    if(rawFile.size/1024/1024<4){
      return true
    }else {
      ElMessage({
        type:"error",
        message:'上传文件的大小应小于4M'
      })
    }
  }else {
    ElMessage({
      type:"error",
      message:'上传的文件格式务必是PNG｜JPG｜GIF'
    })
    return false
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  trademarkParams.logoUrl=response.data;
  formRef.value.clearValidate('logoUrl')
}
const validatorTmName=(rule:any,value:any,callBack:any)=>{
  if(value.trim().length>=2){
    callBack()
  }else {
    callBack(new Error('品牌名称应该大于等于2位'))
  }
}
const validatorLogoUrl=(rule:any,value:any,callBack:any)=>{
  if(value){
    callBack()
  }else {
    callBack(new Error('请上传LOGO图片'))
  }
}
const rules={
  tmName:[
    {required:true,trigger:'change',validator:validatorTmName}
  ],
  logoUrl:[
    {required:true,validator:validatorLogoUrl}
  ]
}
const removeTrademark=async (id:number)=>{
  let result= await reqDeleteTrademark(id);
  if(result.id==200){
    ElMessage({
      type:'success',
      message:'删除品牌成功'
    })
    getHasTrademark(trademarkArr.value.length>1?pageNo.value:pageNo.value-1)
  }else {
      ElMessage({
        type:'error',
        message:'删除品牌失败'
      })
  }
}

</script>

<template>
  <el-card class="box-card">
    <!--添加品牌按钮-->
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
    <!--表格：展示已有的平台数据-->
    <el-table style="margin: 10px 0" border>
      <el-table-column
        label="序号"
        align="center"
        width="80px"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" align="center">
        <template #="{row,$index}">
          <pre style="color: tan">{{row.tmName}}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{row,$index}">
          <img :src="row.logoUrl" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
          <el-popconfirm :title="`你确定要删除${row.tmName}吗？`" width="250px" icon="Delete" @confirm="removeTrademark(row.id)">
            <template #reference>
              <el-button>Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3,5,7,9]"
      :background="true"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasTrademark"
      :page-count="9"
      @size-change="sizeChange"
    />
  </el-card>

  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id?'修改品牌':'添加品牌'">
    <el-form style="width: 70%;" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
