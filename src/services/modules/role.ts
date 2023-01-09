import { axRequest } from '..'

export const getRoleList = (page: number) => {
  return axRequest.get({
    url: 'admin/role/' + page,
  })
}
