import { axRequest } from '..'

export const getMagagerList = (page: number = 1, limit: number = 10, keyword: string = '') => {
  return axRequest.get({
    url: `admin/manager/${page}?limit=${limit}&keyword=${keyword}`,
  })
}

export const newManager = (
  username: string | number,
  password: string | number,
  role_id: number,
  status: number,
  avatar: any,
) => {
  return axRequest.post({
    url: `admin/manager`,
    data: {
      username,
      password,
      role_id,
      status,
      avatar,
    },
  })
}

export const editManager = (
  id: number,
  username: string | number,
  password: string | number,
  role_id: number,
  status: number,
  avatar: any,
) => {
  return axRequest.post({
    url: `admin/manager/${id}`,
    data: {
      id,
      username,
      password,
      role_id,
      status,
      avatar,
    },
  })
}

export const delManager = (id: number) => {
  return axRequest.post({
    url: `admin/manager/${id}/delete`,
  })
}

export const editManagerStatus = (id: number, status: number) => {
  return axRequest.post({
    url: `admin/manager/${id}/update_status`,
    data: {
      status,
    },
  })
}

export const getMenuRules = () => {
  return axRequest.get({
    url: `admin/rule/1`,
  })
}

export const addMenuRules = (
  rule_id: number,
  menu: number,
  name: string | number,
  method: string,
  status: number,
  order: number,
  icon: string,
  frontpath: string,
  condition?: any,
) => {
  return axRequest.post({
    url: `admin/rule`,
    data: {
      rule_id,
      menu,
      name,
      condition,
      method,
      status,
      order,
      icon,
      frontpath,
    },
  })
}
