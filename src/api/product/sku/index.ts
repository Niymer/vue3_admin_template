import request from '@/utils/request.ts'
import { SkuInfoData, SkuResponseData } from '@/api/product/sku/type.ts'

enum API {
  SKU_URL = '/admin/product/list/',
  SALE_URL = '/admin/product/onSale/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  REMOVESKU_URL = '/admin/product/deleteSku/',
}

export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

export const reqSaleSku = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)

export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)

export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)

export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.REMOVESKU_URL + skuId)
