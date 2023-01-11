import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMagagerList } from '@/services/modules/manager'

const useManagerStore = defineStore('manager', () => {
  let managerInfo = ref<any>()
  let managerList = ref<any>()
  let menuRuleInfos = ref<any>()
  const getMagagerListAction = async (page?: number, limit?: number, keyword?: string) => {
    const res: any = await getMagagerList(page, limit, keyword)
    managerInfo.value = res.data
    managerList.value = res.data.list
  }
  const filterManagerAction = (name: string | number) => {
    const filterRes = managerList.value.filter((item: any) => {
      return item.username == name
    })
    managerList.value = [...filterRes]
  }
  return {
    managerInfo,
    managerList,
    menuRuleInfos,
    getMagagerListAction,
    filterManagerAction,
  }
})

export default useManagerStore
