import { axRequest } from '..'

export const getSkuList = (page: number = 1) => {
  return axRequest.get({
    url: `admin/skus/${page}`,
  })
}

export const addSkus = (status: number, name: string | number, order: number, defaults: any) => {
  let skus = ''
  defaults.forEach((item: string, index: number) => {
    if (index == defaults.length - 1) {
      skus += item
    } else {
      skus += item + ','
    }
  })

  return axRequest.post({
    url: `admin/skus`,
    data: {
      status,
      name,
      order,
      default: skus,
    },
  })
}

export const delMuchSkus = (ids: number[]) => {
  return axRequest.post({
    url: `admin/skus/delete_all`,
    data: {
      ids,
    },
  })
}

export const editSKuStatus = (id: number, status: number) => {
  return axRequest.post({
    url: `admin/skus/${id}/update_status`,
    data: {
      status,
    },
  })
}

export const editSKusInfo = (
  id: number,
  status: number,
  name: string | number,
  order: number,
  defaults: any,
) => {
  let skus = ''
  defaults.forEach((item: string, index: number) => {
    if (index == defaults.length - 1) {
      skus += item
    } else {
      skus += item + ','
    }
  })

  return axRequest.post({
    url: `admin/skus/${id}`,
    data: {
      status,
      name,
      order,
      default: skus,
    },
  })
}
