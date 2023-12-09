import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'useUserStore',
  () => {
    const token = ref('')
    const user = ref({})
    const userList = ref([])
    const activeUser = ref({})

    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const setUser = (obj) => {
      user.value = obj
    }
    const setUserList = (obj) => {
      userList.value = obj
    }
    const setActiveUser = (obj) => {
      activeUser.value = obj
    }

    return {
      token,
      user,
      userList,
      activeUser,
      setToken,
      removeToken,
      setUser,
      setUserList,
      setActiveUser
    }
  },
  {
    persist: true
  }
)
