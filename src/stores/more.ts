import { getImgList, getNotice, getNowCategoryImgs } from '@/services/modules/more'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const useMoreStore = defineStore(
  'more',
  () => {
    const imgInfos = ref<any>()
    const imgList = ref<any>()
    let firstCateId = ref<number>()
    let nowCategoryImgs = ref<any>()
    let noticeInfos = ref<any>()
    let assideTotalPage = ref<number>()
    const getImgListAction = async (page?: number, limit?: number) => {
      const res: any = await getImgList(page, limit)
      imgInfos.value = res.data
      imgList.value = res.data.list
      firstCateId.value = res.data.list[0].id
      assideTotalPage.value = res.data.totalCount
      // firstInfos
      getNowCategoryImgsAction(res.data.list[0].id, 1, 10)
    }
    const getNowCategoryImgsAction = async (id: number, page: number, limit: number) => {
      const res: any = await getNowCategoryImgs(id, page, limit)
      nowCategoryImgs.value = res.data
    }
    const getNoticeAction = async (page?: number) => {
      const res: any = await getNotice(page)
      noticeInfos.value = res.data
      // console.log(res)
    }
    return {
      imgList,
      assideTotalPage,
      firstCateId,
      noticeInfos,
      imgInfos,
      nowCategoryImgs,
      getImgListAction,
      getNowCategoryImgsAction,
      getNoticeAction,
    }
  },
  {},
)

export default useMoreStore
