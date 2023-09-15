<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from "vue";
import {reqAddOrUpdateUser, reqUserInfo} from "@/api/acl/user";
import {Records, User, UserResponseData} from "@/api/acl/user/type.ts";
import {ElMessage} from "element-plus";

let pageNo=ref<number>(1)
let pageSize=ref<number>(5)
let total=ref<number>(0)
let userArr=ref<Records>([])
let drawer=ref<boolean>(false)
let formRef=ref<any>()
let userParams=reactive<User>({
  username:'',
  name:'',
  password:'',
})
const getHasUser =async (page=1) => {
  pageNo.value=page
  let result:UserResponseData= await reqUserInfo(pageNo.value,pageSize.value)
  if(result.code==200){
    total.value=result.data.total
    userArr.value=result.data.records
  }
}
onMounted(()=>{
  getHasUser()
})
const handler=()=>{
  getHasUser()
}
const addUser = () => {
  drawer.value=true
  Object.assign(userParams,{
    username:'',
    name:'',
    password:'',
  });
  nextTick(()=>{
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const updateUser=(row:User)=>{
  drawer.value=true
}
const save = async () => {
  await formRef.value.validate()
  let result:any=await reqAddOrUpdateUser(userParams)
  if(result.code==200){
    drawer.value=false
    ElMessage({type:'success',message:userParams.id?'更新成功':'添加成功'})
    getHasUser()
  }else{
    drawer.value=false
    ElMessage({type:'error',message:userParams.id?'更新失败':'添加失败'})
  }
}
const cancel=()=>{
  drawer.value=false
}
const validatorUsername = (rule:any,value:any,callBack:any) => {
  if(value.trim().length>=5){
    callBack()
  }else{
    callBack(new Error('用户名字至少5位'))
  }
}
const validatorName = (rule:any,value:any,callBack:any) => {
  if(value.trim().length>=5){
    callBack()
  }else{
    callBack(new Error('昵称字至少5位'))
  }
}
const validatorPassword = (rule:any,value:any,callBack:any) => {
  if(value.trim().length>=6){
    callBack()
  }else{
    callBack(new Error('用户密码字至少6位'))
  }
}
const rules ={
  username:[{required:true,trigger:'blur',validator:validatorUsername}],
  name:[{required:true,trigger:'blur',validator:validatorName}],
  password:[{required:true,trigger:'blur',validator:validatorPassword}],
}

</script>

<template>
  <el-card style="height: 80px;">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">搜索</el-button>
        <el-button type="success" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">

    <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
    <el-button type="danger" size="default">批量删除</el-button>
    <el-table border style="margin: 10px 0" :data="userArr">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="User">分配角色</el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5,7,9]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasUser"
        @size-change="handler"
    />
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>添加用户</h4>
    </template>
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户名称" prop="username">
          <el-input placeholder="请填写用户名称" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请填写用户昵称" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input placeholder="请填写用户密码" v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
