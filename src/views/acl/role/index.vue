<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from 'vue'
import {reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission} from '@/api/acl/role'
import {MenuList, MenuResponseData, Records, RoleData, RoleResponseData} from '@/api/acl/role/type.ts'
import useLayOutSettingStore from '@/store/modules/setting.ts'
import {ElMessage} from "element-plus";

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let keyword = ref<string>('')
let allRole = ref<Records>([])
let total = ref<number>(0)
let settingStore = useLayOutSettingStore()
let dialogVisible=ref<boolean>(false)
let roleParams=reactive<RoleData>({
  roleName:''
})
let form=ref<any>()
let drawer=ref<boolean>(false)
let menuArr=ref<MenuList>([])
let selectArr=ref<number[]>([])
let tree=ref<any>()
onMounted(() => {
  getHasRole()
})
const getHasRole = async (page = 1) => {
  pageNo.value = page
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
const handleSizeChange = () => {
  getHasRole()
}
const search = () => {
  getHasRole()
  keyword.value = ''
}
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
const addRole = () => {
  dialogVisible.value=true
  Object.assign(roleParams,{
    roleName:'',
    id:0
  })
  nextTick(()=>{
    form.value.clearValidate('roleName')
  })
}
const updateRole = (row:RoleData) => {
  dialogVisible.value=true
  Object.assign(roleParams,row)
  nextTick(()=>{
    form.value.clearValidate('roleName')
  })
}
const validatorRoleName = (rule:any,value:any,callBack:any) => {
  if(value.trim().length>=2){
    callBack()
  }else {
    callBack(new Error('职位名称至少两位'))
  }
}
const rules={
  roleName:[{required:true,trigger:'blur',validator:validatorRoleName}]
}
const save =async () => {
  await form.value.validate()
  let result:any=await reqAddOrUpdateRole(roleParams)
  if(result.code==200){
    ElMessage({type:"success",message:roleParams.id?'更新成功':'添加成功'})
    dialogVisible.value=false
    getHasRole(roleParams.id?pageNo.value:1)
  }
}
const setPermission = async (row:RoleData) => {
  drawer.value=true
  Object.assign(roleParams,row)
  let result:MenuResponseData=await reqAllMenuList(roleParams.id as number)
  if (result.code==200){
    menuArr.value=result.data
    selectArr.value= filterSelectArr(menuArr.value,[])
  }
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
const filterSelectArr = (allDate:any,initArr:any) => {
  allDate.forEach((item:any)=>{
    if(item.select&&item.level==4){
      initArr.push(item.id)
    }
    if(item.children&&item.children.length>0){
      filterSelectArr(item.children,initArr)
    }
  })
  return initArr
}
const handler = async () => {
  const roleId= (roleParams.id as number)
  let arr1=tree.value.getCheckedKeys()
  let arr2=tree.value.getHalfCheckedKeys()
  let permissionId=arr1.concat(arr2)
  let result:any=await reqSetPermission(roleId,permissionId)
  if(result.code==200){
    drawer.value=false
    ElMessage({type:"success",message:'分配权限成功'})
    window.location.reload()
  }
}
const removeRole =async (id:number) => {
  let result:any=await reqRemoveRole(id)
  if(result.code==200){
    ElMessage({type:"success",message:'删除成功'})
    getHasRole(allRole.value.length>1?pageNo.value:pageNo.value-1)
  }
}
</script>

<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="职位搜索">
        <el-input
          placeholder="请你输入职位搜索的关键字"
          style="width: 200px"
          v-model="keyword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button type="success" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
    <el-table border style="margin: 10px 0" :data="allRole">
      <el-table-column
        type="index"
        align="center"
        label="#"
        width="170px"
      ></el-table-column>
      <el-table-column
        align="center"
        label="ID"
        width="170"
        prop="id"
      ></el-table-column>
      <el-table-column
        align="center"
        label="职位名称"
        width="170"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        width="170"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        align="center"
        label="更新时间"
        width="170"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="User" @click="setPermission(row)">
            分配权限
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
          <el-popconfirm :title="`你确定要删除${row.roleName}职位吗?`" width="250px" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      :page-sizes="[10, 15, 20, 25]"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasRole"
    />
  </el-card>

  <el-dialog v-model="dialogVisible" :title="roleParams.id?'更新职位':'添加职位'">
    <el-form :model="roleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请你输入职位名称" v-model="roleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" size="default" @click="save">确定</el-button>
    </template>
  </el-dialog>

  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
          :data="menuArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
          ref="tree"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer=false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
