import { axRequest } from '..'

export const getMenuInfos = () => {
  return axRequest.post({
    url: '/admin/getinfo',
  })
}
