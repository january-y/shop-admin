import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRoleList } from '@/services/modules/role'

const useRoleStore = defineStore('role', () => {
  const roleInfos = ref<any>()
  const getRoleListAction = async (page: number = 1) => {
    const res: any = await getRoleList(page)
    roleInfos.value = res.data
  }
  return {
    roleInfos,
    getRoleListAction,
  }
})

export default useRoleStore
