import { getMainControlInfo3 } from './../services/modules/main-control'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMainControlInfo } from '@/services/modules/main-control'

export const useMainControlStore = defineStore('main-control', () => {
  let currentEchart = ref<string>('month')
  let mainControlInfo = ref<any>()
  let mainControlInfo3 = ref<any>()
  let mainControlInfo3Week = ref<any>()
  let mainControlInfo3Hour = ref<any>()
  let iconNavs = ref<any>([
    {
      icon: 'user',
      color: 'text-light-blue-500',
      title: '用户',
      path: '/user/list',
    },
    {
      icon: 'shopping-cart',
      color: 'text-violet-500',
      title: '商品',
      path: '/goods/list',
    },
    {
      icon: 'tickets',
      color: 'text-fuchsia-500',
      title: '订单',
      path: '/order/list',
    },
    {
      icon: 'chat-dot-square',
      color: 'text-teal-500',
      title: '评价',
      path: '/comment/list',
    },
    {
      icon: 'picture',
      color: 'text-rose-500',
      title: '图库',
      path: '/image/list',
    },
    {
      icon: 'bell',
      color: 'text-green-500',
      title: '公告',
      path: '/notice/list',
    },
    {
      icon: 'set-up',
      color: 'text-grey-500',
      title: '配置',
      path: '/setting/base',
    },
    {
      icon: 'files',
      color: 'text-yellow-500',
      title: '优惠券',
      path: '/coupon/list',
    },
  ])
  const getMainControlInfoAction = async () => {
    const res: any = await getMainControlInfo()
    mainControlInfo.value = res.data.panels
  }
  const getMainControlInfoAction3 = (type?: string) => {
    getMainControlInfo3(type).then((res: any) => {
      mainControlInfo3.value = res.data
    })
  }
  const getMainControlInfoAction3Week = (type?: string) => {
    getMainControlInfo3(type).then((res: any) => {
      mainControlInfo3Week.value = res.data
    })
  }
  const getMainControlInfoAction3Hour = (type?: string) => {
    getMainControlInfo3(type).then((res: any) => {
      mainControlInfo3Hour.value = res.data
    })
  }

  return {
    mainControlInfo,
    mainControlInfo3,
    mainControlInfo3Week,
    mainControlInfo3Hour,
    iconNavs,
    currentEchart,
    getMainControlInfoAction,
    getMainControlInfoAction3,
    getMainControlInfoAction3Week,
    getMainControlInfoAction3Hour,
  }
})

export default useMainControlStore
