import { ref } from 'vue'
import { defineStore } from 'pinia'

const usePublicStore = defineStore(
  'public',
  () => {
    let isLogin = ref<boolean>(false)
    let token = ref<string>('')
    let isLoading = ref<boolean>(false)
    let menuIndexList = ref<any[]>([
      { index: '0-0', path: '/' },
      { index: '1-0', path: '/goods/list' },
      { index: '1-1', path: '/category/list' },
      { index: '1-2', path: '/skus/list' },
      { index: '1-3', path: '/coupon/list' },
      { index: '2-0', path: '/user/list' },
      { index: '2-1', path: '/level/list' },
      { index: '3-0', path: '/order/list' },
      { index: '3-1', path: '/comment/list' },
      { index: '4-0', path: '/manager/list' },
      { index: '4-1', path: '/access/list' },
      { index: '4-2', path: '/role/list' },
      { index: '5-0', path: '/setting/base' },
      { index: '5-1', path: '/setting/buy' },
      { index: '5-2', path: '/setting/ship' },
      { index: '6-0', path: '/distribution/index' },
      { index: '6-1', path: '/distribution/setting' },
      { index: '7-0', path: '/image/list' },
      { index: '7-1', path: '/notic/list' },
    ])
    let currentMenu = ref<string>('1-0')

    return { isLogin, token, isLoading, currentMenu, menuIndexList }
  },
  {
    persist: true,
  },
)

export default usePublicStore
