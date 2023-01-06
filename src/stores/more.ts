import { getImgList } from './../services/modules/more'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const useMoreStore = defineStore(
  'more',
  () => {
    const imgList = ref<any>()
    let assideTotalPage = ref<number>()
    const getImgListAction = async (page?: number, limit?: number) => {
      const res: any = await getImgList(page, limit)
      imgList.value = res.data.list
      assideTotalPage.value = res.data.totalCount
    }
    return { imgList, assideTotalPage, getImgListAction }
  },
  {},
)

export default useMoreStore
