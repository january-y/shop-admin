import { axRequest } from '..'

export const getRoleList = (page: number) => {
  return axRequest.get({
    url: 'admin/role/' + page,
  })
}

export const newRole = (name: string | number, status: number, desc: number | string) => {
  return axRequest.post({
    url: `admin/role`,
    data: {
      name,
      status,
      desc,
    },
  })
}

export const delRole = (id: number) => {
  return axRequest.post({
    url: `admin/role/${id}/delete`,
  })
}

export const editRole = (
  id: number,
  name: string | number,
  status: number,
  desc: number | string,
) => {
  return axRequest.post({
    url: `admin/role/${id}`,
    data: {
      id,
      name,
      status,
      desc,
    },
  })
}

export const editRoleStatus = (id: number, status: number) => {
  return axRequest.post({ url: `admin/role/${id}/update_status`, data: { status } })
}

export const editRolePower = (id: number, ruleID: []) => {
  return axRequest.post({
    url: `admin/role/set_rules`,
    data: {
      id,
      rule_ids: [...ruleID],
    },
  })
}
