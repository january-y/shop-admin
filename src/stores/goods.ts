import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGoodInfos } from '@/services/modules/goods'

interface IInfos {
  tab?: string
  title?: string
  category_id?: number
  limit?: number
}

const useGoodsStore = defineStore('goods', () => {
  let goodInfos = ref<any>(null)
  let goodList = ref<any>(null)
  const getGoodInfosAction = async (page: number, params: IInfos) => {
    const res: any = await getGoodInfos(page, params)
    goodInfos.value = res.data
    goodList.value = res.data.list
  }
  return { goodInfos, goodList, getGoodInfosAction }
})

export default useGoodsStore
