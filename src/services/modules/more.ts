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

export const getNowCategoryImgs = (id: number, page: number, limit: number = 10) => {
  return axRequest.get({
    url: `admin/image_class/${id}/image/${page}?limit=${limit}`,
  })
}

export const editImgName = (id: number, name: number | string) => {
  return axRequest.post({
    url: `admin/image/${id}`,
    data: {
      id,
      name,
    },
  })
}

export const delImg = (id: number[]) => {
  return axRequest.post({
    url: `admin/image/delete_all`,
    data: {
      ids: [...id],
    },
  })
}

export const uploadImg = (imgClassId: number, pathArray: any) => {
  return axRequest.post({
    url: 'admin/image/upload',
    data: {
      image_class_id: imgClassId,
      'img[]': [...pathArray],
    },
  })
}
