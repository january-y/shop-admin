import { ref } from 'vue'
import { defineStore } from 'pinia'

const usePublicStore = defineStore(
  'public',
  () => {
    let isLogin = ref<boolean>(false)
    let token = ref<string>('')
    let isLoading = ref<boolean>(false)

    return { isLogin, token, isLoading }
  },
  {
    persist: true,
  },
)

export default usePublicStore
