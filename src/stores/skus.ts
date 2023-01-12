import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSkuList } from '@/services/modules/skus'

const useSkuStore = defineStore('sku', () => {
  let skuInfos = ref<any>(null)
  const getSkuListAction = async (page?: number) => {
    const res: any = await getSkuList(page)
    skuInfos.value = res.data
  }
  return { skuInfos, getSkuListAction }
})

export default useSkuStore
