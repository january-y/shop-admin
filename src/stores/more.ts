import { getImgList, getNotice } from '@/services/modules/more'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const useMoreStore = defineStore(
  'more',
  () => {
    const imgList = ref<any>()
    const firstCateId = ref<number>()
    let noticeInfos = ref<any>()
    let assideTotalPage = ref<number>()
    const getImgListAction = async (page?: number, limit?: number) => {
      const res: any = await getImgList(page, limit)
      imgList.value = res.data.list
      firstCateId.value = res.data.list[0].id
      assideTotalPage.value = res.data.totalCount
    }
    const getNoticeAction = async (page?: number) => {
      const res: any = await getNotice(page)
      noticeInfos.value = res.data
      // console.log(res)
    }
    return { imgList, assideTotalPage, firstCateId, noticeInfos, getImgListAction, getNoticeAction }
  },
  {},
)

export default useMoreStore
