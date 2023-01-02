import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMenuInfos } from '@/services/modules/home'

const useHomeStore = defineStore(
  'home',
  () => {
    let userMenuInfos = ref<any>()
    let isOpenMenus = ref<boolean>(false)

    const getMenuInfosAction = async () => {
      const res: any = await getMenuInfos()
      userMenuInfos.value = res.data
      //
      res.data.menus.forEach((item: any) => {
        console.log(item.name)

        item.child.forEach((itemm: any) => {
          console.log(itemm.name, itemm.frontpath)
        })
        console.log('-----------')
      })
    }

    return {
      userMenuInfos,
      isOpenMenus,
      getMenuInfosAction,
    }
  },
  {},
)

export default useHomeStore
