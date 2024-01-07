<script setup>
import { useUserStore,useFuntionStore } from '@/stores'
import { useRouter } from 'vue-router'
import { Delete, Message } from '@element-plus/icons-vue'
const userStore = useUserStore()
const funtionStore = useFuntionStore()
const router = useRouter()
import avatar from '@/assets/default.png'

const msg = () => {
  funtionStore.setActiveMessage(funtionStore.activeContact)
  funtionStore.setOption('message')
  router.push('/message')
}
</script>

<template>
  <div class='body-content'>
    <div class="content" v-if="Object.keys(funtionStore.activeContact).length > 0">
      <el-avatar :size="120" :src="funtionStore.activeContact.avatar || avatar"></el-avatar>
      <div class="name">{{ funtionStore.activeContact.username }}</div>
      <div>
        <el-button @click="msg" :icon="Message" type="primary" circle />    
        <el-button type="danger" :icon="Delete" circle />
      </div>
    </div>
    <div v-else>    
      <el-empty description="description" />
    </div>
  </div>
</template> 

<style scoped>
.body-content {
  display: flex;
  justify-content: center;
}
.content {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name {
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>