import request from '@/utils/request.ts'
import {MenuResponseData, RoleData, RoleResponseData} from '@/api/acl/role/type.ts'

enum API {
  ALLROLE_URL = '/admin/acl/role/',
  ADDROLE_URL='/admin/acl/role/save',
  UPDATEROLE_URL='/admin/acl/role/update',
  ALLPERMISSIOM_URL='/admin/acl/permission/toAssign/',
  SETPERMISSION_URL='/admin/acl/permission/doAssign/?',
  REMOVEROLE_URL='/admin/acl/role/remove/'
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )

export const reqAddOrUpdateRole=(data:RoleData)=>{
  if(data.id){
    return request.put<any,any>(API.UPDATEROLE_URL,data)
  }else {
    return request.post<any,any>(API.ADDROLE_URL,data)
  }
}

export const reqAllMenuList=(roleId:number)=>request.get<any,MenuResponseData>(API.ALLPERMISSIOM_URL+roleId)

export const reqSetPermission = (roleId: number, permissionId: number[]) => request.post(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)

export const reqRemoveRole=(roleId:number)=>request.delete<any,any>(API.REMOVEROLE_URL+roleId)
