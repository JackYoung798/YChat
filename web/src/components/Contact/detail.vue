<script setup>
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { Delete, Message } from '@element-plus/icons-vue'
const userStore = useUserStore()
const router = useRouter()
import avatar from '@/assets/default.png'

const msg = () => {
  userStore.setActiveUser(userStore.activeFriend)
  router.push('/message')
}
</script>

<template>
  <div class='body-content'>
    <el-avatar :size="120" :src="userStore.activeFriend.avatar || avatar"></el-avatar>
    <el-descriptions :column="1">
      <el-descriptions-item label="username">
        {{ userStore.activeFriend.username }}
      </el-descriptions-item>
      <el-descriptions-item label="sign">
        {{ userStore.activeFriend.sign || 'null'}}
      </el-descriptions-item>
    </el-descriptions>
    <div>
      <el-button @click="msg" :icon="Message" type="primary" circle />    
      <el-button type="danger" :icon="Delete" circle />
    </div>
  </div>
</template> 

<style scoped>
.body-content {
  margin-top: 80px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}
</style>