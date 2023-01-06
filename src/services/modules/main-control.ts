import { axRequest } from '..'

export const getMainControlInfo = () => {
  return axRequest.get({
    url: 'admin/statistics1',
  })
}

export const getMainControlInfo3 = (type: string = 'month') => {
  return axRequest.get({
    url: 'admin/statistics3?type=' + type,
  })
}

export const getMainControlInfo2 = () => {
  return axRequest.get({
    url: 'admin/statistics2',
  })
}
