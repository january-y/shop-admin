import { axRequest } from '..'

export const login = (username: any, password: any) => {
  return axRequest.post({
    url: '/admin/login',
    data: {
      username,
      password,
    },
  })
}

export const editPwd = (oldpassword: any, password: any, repassword: any) => {
  return axRequest.post({
    url: '/admin/updatepassword',
    data: {
      oldpassword,
      password,
      repassword,
    },
  })
}
