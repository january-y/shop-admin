import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getMainControlInfo,
  getMainControlInfo2,
  getMainControlInfo3,
} from '@/services/modules/main-control'

export const useMainControlStore = defineStore('main-control', () => {
  let currentEchart = ref<string>('month')
  let mainControlInfo = ref<any>()
  let currentEchartData = ref<any>()
  let tipsData = ref<any>()
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
  const getMainControlInfoAction3 = async (time: string = 'month') => {
    const res: any = await getMainControlInfo3(time)
    currentEchartData.value = res.data
    // console.log(currentEchartData.value)
  }

  const getMainControlInfoAction2 = async () => {
    const res: any = await getMainControlInfo2()
    tipsData.value = res.data
  }

  return {
    mainControlInfo,
    iconNavs,
    currentEchart,
    currentEchartData,
    tipsData,
    getMainControlInfoAction,
    getMainControlInfoAction2,
    getMainControlInfoAction3,
  }
})

export default useMainControlStore
