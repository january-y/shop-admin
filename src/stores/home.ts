import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMenuInfos } from '@/services/modules/home'
import { checkRouter } from '@/router/index'

const useHomeStore = defineStore(
  'home',
  () => {
    let userMenuInfos = ref<any>()
    let haveIndexMenus = ref<any[]>()
    let isOpenMenus = ref<boolean>(false)
    let topTabs = ref<any[]>([])

    const getMenuInfosAction = async () => {
      const res: any = await getMenuInfos()
      checkRouter(res.data?.menus)
      userMenuInfos.value = res.data
      haveIndexMenus.value = res.data?.menus as any[]
      localStorage.setItem('menus', JSON.stringify(res.data?.menus))

      function addIndex(menusArr: any[]) {
        menusArr.forEach((item: any, index: number) => {
          item['index'] = index + ''
          if (item.child) {
            item.child.forEach((itemm: any, indexx: number) => {
              itemm.index = index + '-' + indexx
              // console.log(itemm.id)
            })
          }
        })
      }
      addIndex(haveIndexMenus.value)
    }
    const loadingRoute = () => {
      checkRouter(userMenuInfos.value?.menus)
    }

    return {
      userMenuInfos,
      isOpenMenus,
      topTabs,
      haveIndexMenus,
      getMenuInfosAction,
      loadingRoute,
    }
  },
  {
    persist: true,
  },
)

export default useHomeStore
