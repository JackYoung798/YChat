import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore(
  'useChatStore',
  () => {
    const chatMsgList = ref([])

    const setMsgList = (data) => {
      chatMsgList.value.push(data)
    }
    const reset = () => {
      chatMsgList.value = []
    }
    return {
      chatMsgList,
      setMsgList,
      reset
    }
  },
  {
    persist: true
  }
)
