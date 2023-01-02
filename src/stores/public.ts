import { ref } from 'vue'
import { defineStore } from 'pinia'

const usePublicStore = defineStore(
  'public',
  () => {
    let isLogin = ref<boolean>(false)
    let token = ref<string>('')
    let isLoading = ref<boolean>(false)
    let currentMenu = ref<string>('1-0')

    return { isLogin, token, isLoading, currentMenu }
  },
  {
    persist: true,
  },
)

export default usePublicStore
