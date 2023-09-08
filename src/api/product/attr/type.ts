export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category12d?: number,
}

export interface CategoryResponseData extends ResponseData{
    data:CategoryObj[],
}