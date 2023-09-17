export interface ResponseData {
    code:number,
    message:string,
    ok:boolean
}
export interface RoleData {
    "id"?: number,
    "createTime"?: string,
    "updateTime"?: string,
    "roleName": string,
    "remark": null
}
export type Records=RoleData[]
export interface RoleResponseData extends ResponseData{
    data:{
        records:Records,
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number
    }
}