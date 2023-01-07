import { getImgList } from './../services/modules/more'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const useMoreStore = defineStore(
  'more',
  () => {
    const imgList = ref<any>()
    const firstCateId = ref<number>()
    let assideTotalPage = ref<number>()
    const getImgListAction = async (page?: number, limit?: number) => {
      const res: any = await getImgList(page, limit)
      imgList.value = res.data.list
      firstCateId.value = res.data.list[0].id
      assideTotalPage.value = res.data.totalCount
    }
    return { imgList, assideTotalPage, firstCateId, getImgListAction }
  },
  {},
)

export default useMoreStore
