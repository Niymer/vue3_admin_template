<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateMenu,
  reqAllPermission,
  reqRemoveMenu,
} from '@/api/acl/menu'
import {
  MenuParams,
  Permission,
  PermissionList,
  PermissionResponseData,
} from '@/api/acl/menu/type.ts'
import { ElMessage } from 'element-plus'

let permissionArr = ref<PermissionList>([])
let dialogVisible = ref<boolean>(false)
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission()
  if (result.code) {
    permissionArr.value = result.data
  }
}
onMounted(() => {
  getHasPermission()
})
const addPermission = (row: Permission) => {
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id as number
}
const updatePermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(menuData, row)
}
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    getHasPermission()
  }
}
const removeMenu = async (id: number) => {
  let result: any = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasPermission()
  }
}
</script>

<template>
  <el-table
    :data="permissionArr"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column
      label="权限值"
      prop="code"
      align="center"
    ></el-table-column>
    <el-table-column
      label="修改时间"
      prop="updateTime"
      align="center"
    ></el-table-column>
    <el-table-column label="操作" align="center">
      <template #="{ row, $index }">
        <el-button
          type="primary"
          size="small"
          :disabled="row.level == 4 ? true : false"
          @click="addPermission(row)"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="row.level == 1 ? true : false"
          @click="updatePermission(row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`你确定要删除${row.name}吗?`"
          width="250px"
          @confirm="removeMenu(row.id)"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              :disabled="row.level == 1 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜单' : '添加菜单'"
    width="500px"
  >
    <el-form>
      <el-form-item label="名称" label-width="60px">
        <el-input
          placeholder="请你输入菜单名称"
          v-model="menuData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限值" label-width="60px">
        <el-input
          placeholder="请你输入菜单权限值"
          v-model="menuData.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
