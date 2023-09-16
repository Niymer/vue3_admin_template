import request from '@/utils/request.ts'
import {AllRoleResponseData, SetRoleData, User, UserResponseData} from '@/api/acl/user/type.ts'

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  //添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  //更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLE_URL='/admin/acl/user/toAssign/',
  SETROLE_URL='/admin/acl/user/doAssignRole'
}
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)

export const reqAddOrUpdateUser = (data: User) => {
  //携带参数有ID更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
export const reqAllRole=(userId:number)=>request.get<any,AllRoleResponseData>(API.ALLROLE_URL+userId)

export const reqSetUserRole=(data:SetRoleData)=>request.post<any,any>(API.SETROLE_URL,data)