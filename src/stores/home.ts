import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMenuInfos } from '@/services/modules/home'

const useHomeStore = defineStore('home', () => {
  let userMenuInfos = ref<any>()
  const getMenuInfosAction = async () => {
    const res: any = await getMenuInfos()
    userMenuInfos.value = res.data
    // console.log(res.data)
  }

  return {
    userMenuInfos,
    getMenuInfosAction,
  }
})

export default useHomeStore
