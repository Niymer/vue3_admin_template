<script setup lang="ts">
import {onMounted, ref} from "vue";
import {reqAllRoleList} from "@/api/acl/role";
import {Records, RoleResponseData} from "@/api/acl/role/type.ts";
import useLayOutSettingStore from "@/store/modules/setting.ts";

let pageNo=ref<number>(1)
let pageSize=ref<number>(10)
let keyword=ref<string>('')
let allRole=ref<Records>([])
let total=ref<number>(0)
let settingStore=useLayOutSettingStore()
onMounted(()=>{
  getHasRole()
})
const getHasRole = async (page=1) => {
  pageNo.value=page
  let result:RoleResponseData=await reqAllRoleList(pageNo.value,pageSize.value,keyword.value)
  if(result.code==200){
    total.value=result.data.total
    allRole.value=result.data.records
  }
}
const handleSizeChange = () => {
  getHasRole()
}
const search=()=>{
  getHasRole()
  keyword.value=''
}
const reset = () => {
  settingStore.refsh=!settingStore.refsh
}
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请你输入职位搜索的关键字" style="width: 200px;" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" :disabled="keyword?false:true" @click="search">搜索</el-button>
        <el-button type="success" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin: 10px 0;">
    <el-button type="primary" size="default" icon="Plus">添加职位</el-button>
    <el-table border style="margin: 10px 0" :data="allRole">
      <el-table-column type="index" align="center" label="#" width="170px"></el-table-column>
      <el-table-column align="center" label="ID"  width="170" prop="id"></el-table-column>
      <el-table-column align="center" label="职位名称" width="170" show-overflow-tooltip prop="roleName"></el-table-column>
      <el-table-column align="center" label="创建时间" width="170" show-overflow-tooltip prop="createTime"></el-table-column>
      <el-table-column align="center" label="更新时间" width="170" show-overflow-tooltip prop="updateTime"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="User">分配权限</el-button>
          <el-button type="primary" size="small" icon="Edit">编辑</el-button>
          <el-button type="primary" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :background="true"
        :page-sizes="[10, 15, 20,25]"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getHasRole"
    />
  </el-card>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
