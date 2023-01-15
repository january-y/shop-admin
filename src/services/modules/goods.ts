import { axRequest } from '..'

interface IInfos {
  tab?: string
  title?: string
  category_id?: number
  limit?: number
}

export const getGoodInfos = (page: number, params: IInfos) => {
  return axRequest.get({
    url: `admin/goods/${page}`,
    params,
  })
}
