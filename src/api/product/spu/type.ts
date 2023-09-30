export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SpuData {
  id?: number
  spuName: string
  tmId: string | number
  description: string
  spuImageList: null | SpuImg[]
  category3Id: string | number
  spuSaleAttrList: null | SaleAttr[]
}
export type Records = SpuData[]
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}

export interface SpuImg {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId?: number | string
  saleAttrValueName?: string
  saleAttrName?: string
  isChecked?: null
}
export type spuSaleAttrValueList = SaleAttrValue[]
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId?: number | string
  saleAttrName?: string
  spuSaleAttrValueList?: spuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: number | string
  valueId: number | string
}
export interface SaleAttr {
  saleAttrId?: string | number
  saleAttrValueId?: string | number
}
export interface SkuData {
  category3Id: string | number
  spuId: string | number
  tmId: string | number
  skuName: string
  price: string | number
  weight: string | number
  skuDesc: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: SaleAttr[]
  skuDefaultImg: string
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
