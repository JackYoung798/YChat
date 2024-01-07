import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'useUserStore',
  () => {
    const token = ref('')
    const user = ref({})
    const setToken = (newToken) => {
      token.value = newToken
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      user,
      setToken,
      setUser,
    }
  },
  {
    persist: true
  }
)
