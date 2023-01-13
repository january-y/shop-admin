import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCouponList } from '@/services/modules/coupon'

const useCouponStore = defineStore('coupon', () => {
  let couponInfos = ref<any>(null)
  const getCouponListAction = async (page?: number) => {
    const res: any = await getCouponList(page)
    couponInfos.value = res.data
  }
  return { couponInfos, getCouponListAction }
})

export default useCouponStore
