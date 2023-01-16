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
  let categorySelectList = ref<any>(null)
  const getGoodInfosAction = async (page: number, params: IInfos) => {
    const res: any = await getGoodInfos(page, params)
    goodInfos.value = res.data
    goodList.value = res.data.list
    categorySelectList.value = res.data.cates.map((item: any) => {
      return { id: item.id, name: item.name }
    })
  }
  return { goodInfos, goodList, categorySelectList, getGoodInfosAction }
})

export default useGoodsStore
