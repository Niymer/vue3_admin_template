import request from '@/utils/request.ts'
import {
  AllRoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from '@/api/acl/user/type.ts'

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  REMOVEUSER_URL = '/admin/acl/user/remove/',
  REMOVESELECTUSER_URL = '/admin/acl/user/batchRemove',
}
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )

export const reqAddOrUpdateUser = (data: User) => {
  //携带参数有ID更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)

export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)

export const reqRemoveUser = (usrId: number) =>
  request.delete<any, any>(API.REMOVEUSER_URL + usrId)

export const reqRemoveSelectUser = (idList: number[]) =>
  request.delete(API.REMOVESELECTUSER_URL, { data: idList })
