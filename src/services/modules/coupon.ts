import { axRequest } from '..'

interface IAdd {
  name: string
  type: number
  value: number
  total: number
  min_price: number
  start_time: number
  end_time: number
  order: number
}

export const getCouponList = (page: number = 1) => {
  return axRequest.get({
    url: `admin/coupon/${page}`,
  })
}

export const newCoupon = (obj: IAdd) => {
  return axRequest.post({
    url: `admin/coupon`,
    data: obj,
  })
}

export const delCoupon = (id: number) => {
  return axRequest.post({
    url: `admin/coupon/${id}/delete`,
  })
}

export const editCoupon = (id: number, data: IAdd) => {
  return axRequest.post({
    url: `admin/coupon/${id}`,
    data,
  })
}

export const editCouponStatus = (id: number, status: number) => {
  return axRequest.post({
    url: `admin/coupon/${id}/update_status`,
    data: {
      status,
    },
  })
}
