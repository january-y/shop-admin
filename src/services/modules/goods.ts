import { axRequest } from '..'

interface IInfos {
  tab?: string
  title?: string
  category_id?: number
  limit?: number
}
export const getGoodInfos = (page: number, params: IInfos) => {
  return axRequest.get({
    url: `admin/goods/${page}`,
    params,
  })
}

interface IAdd {
  title: string
  category_id: number
  cover: string
  desc: string
  unit: string
  stock: number
  min_stock: number
  status: number
  stock_display: number
  min_price: number
  min_oprice: number
}
export const addGood = (data: IAdd) => {
  return axRequest.post({
    url: `admin/goods`,
    data,
  })
}

interface IEdit {
  title: string
  category_id: number
  cover: string
  desc: string
  unit: string
  stock: number
  min_stock: number
  status: number
  stock_display: number
  min_price: number
  min_oprice: number
  content: string
}
export const editGoods = (id: number, data: IEdit) => {
  return axRequest.post({
    url: `admin/goods/${id}`,
    data,
  })
}

export const delGoodsByIds = (ids: number[]) => {
  return axRequest.post({
    url: 'admin/goods/delete_all',
    data: {
      ids,
    },
  })
}

export const delGoodsByIdsForever = (ids: number[]) => {
  return axRequest.post({
    url: 'admin/goods/destroy',
    data: { ids },
  })
}

export const putOnOrDownGoods = (ids: number[], status: number) => {
  return axRequest.post({
    url: 'admin/goods/changestatus',
    data: {
      ids,
      status,
    },
  })
}

export const recoverGoods = (ids: number[]) => {
  return axRequest.post({
    url: 'admin/goods/restore',
    data: {
      ids,
    },
  })
}

export const checkGood = (id: number, ischeck: number) => {
  return axRequest.post({
    url: `admin/goods/${id}/check`,
    data: { ischeck },
  })
}

export const setGoodsBanners = (id: number, banners: string[]) => {
  return axRequest.post({
    url: `admin/goods/banners/${id}`,
    data: { banners },
  })
}

interface ISkuValue {
  sku_type: number
  oprice: number
  pprice: number
  cprice: number
  weight: number
  volume: number
}
export const updateGoodsSku = (
  id: number,
  sku_type: number,
  sku_value?: ISkuValue,
  goodsSkus?: any,
) => {
  return axRequest.post({
    url: 'admin/goods/updateskus/' + id,
    data: {
      sku_type,
      sku_value,
      goodsSkus,
    },
  })
}
