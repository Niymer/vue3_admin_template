import request from "@/utils/request.ts";
import {MenuParams, PermissionResponseData} from "@/api/acl/menu/type.ts";

enum API {
    ALLPERMISSION_URL = '/admin/acl/permission',
    ADDMENU_URL='/admin/acl/permission/save',
    UPDATE_URL='/admin/acl/permission/update',
    REMOVEMENU_URL='/admin/acl/permission/remove/'
}

export const reqAllPermission=()=>request.get<any,PermissionResponseData>(API.ALLPERMISSION_URL)
export const reqAddOrUpdateMenu=(data:MenuParams)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATE_URL,data)
    }else{
        return request.post<any,any>(API.ADDMENU_URL,data)
    }
}
export const reqRemoveMenu=(id:number)=>request.delete<any,any>(API.REMOVEMENU_URL+id)