import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'useUserStore',
  () => {
    const token = ref('')
    const user = ref({})
    const userList = ref([])
    const friendList = ref([])
    const activeUser = ref({})
    const activeFriend = ref({})

    const setToken = (newToken) => {
      token.value = newToken
    }
    const setUser = (obj) => {
      user.value = obj
    }
    const setUserList = (obj) => {
      userList.value = obj
    }
    const setFriendList = (obj) => {
      friendList.value = obj
    }
    const setActiveUser = (obj) => {
      activeUser.value = obj
    }
    const setActiveFriend = (obj) => {
      activeFriend.value = obj
    }
    return {
      token,
      user,
      userList,
      friendList,
      activeUser,
      activeFriend,
      setToken,
      setUser,
      setUserList,
      setFriendList,
      setActiveUser,
      setActiveFriend
    }
  },
  {
    persist: true
  }
)
