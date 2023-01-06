import { axRequest } from '..'

export const getImgList = (page: number = 1, limit: number = 10) => {
  return axRequest.get({
    url: `admin/image_class/${page}?limit=${limit}`,
  })
}

export const addImgCategory = (name: string, order: number) => {
  return axRequest.post({
    url: 'admin/image_class',
    data: {
      name,
      order,
    },
  })
}

export const updataImgCategory = (id: number, name: string, order: number) => {
  return axRequest.post({
    url: 'admin/image_class/' + id,
    data: {
      name,
      order,
    },
  })
}

export const delImgCategory = (id: number) => {
  return axRequest.post({
    url: `admin/image_class/${id}/delete`,
  })
}
