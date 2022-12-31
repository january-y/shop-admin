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
