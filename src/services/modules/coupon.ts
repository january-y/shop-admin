import { axRequest } from '..'

export const getCouponList = (page: number = 1) => {
  return axRequest.get({
    url: `admin/coupon/${page}`,
  })
}
