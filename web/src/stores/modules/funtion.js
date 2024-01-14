import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFuntionStore = defineStore(
  'useFuntionStore',
  () => {
    const option = ref('')
    const messageList = ref([])
    const contactList = ref([])
    const activeMessage = ref({})
    const activeContact = ref({})
    const search = ref({})
    const isFriend = ref()
    const setOption = (v) => {
      option.value = v
    }
    const setMessageList = (obj) => {
      messageList.value = obj
    }
    const setContactList = (obj) => {
      contactList.value = obj
    }
    const setActiveMessage = (obj) => {
      activeMessage.value = obj
    }
    const setActiveContact = (obj) => {
      activeContact.value = obj
    }
    const setSearch = (obj) => {
      search.value = obj
    }
    const setIsfriend = (v) => {
      isFriend.value = v
    }
    const reset = () => {
      option.value = '',
      messageList.value = []
      contactList.value = []
      activeMessage.value = {}
      activeContact.value = {}
      search.value = null
      isFriend.value = 0
    }
    return {
      option,
      messageList,
      contactList,
      activeMessage,
      activeContact,
      search,
      isFriend,
      setOption,
      setMessageList,
      setContactList,
      setActiveMessage,
      setActiveContact,
      setSearch,
      setIsfriend,
      reset
    }
  },
  {
    persist: true
  }
)
