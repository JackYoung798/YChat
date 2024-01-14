<script setup>
import { useUserStore,useFuntionStore } from '@/stores'
import { useRouter } from 'vue-router'
import { MessageOne,Delete,AddUser } from '@icon-park/vue-next'
const funtionStore = useFuntionStore()
const router = useRouter()
import avatar from '@/assets/default.png'

const sendMsg = () => {
  funtionStore.setActiveMessage(funtionStore.activeContact)
  funtionStore.setMessageList(funtionStore.activeContact)
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
        <!-- 此用户是好友 -->
        <el-button v-if="funtionStore.isFriend" @click="sendMsg" type="primary">
          <message-one theme="outline" size="24" fill="#ffffff"/>
        </el-button>    
        <el-button v-if="funtionStore.isFriend" type="danger">
          <Delete theme="outline" size="24" fill="#ffffff"/>
        </el-button>
        <!-- 此用户不是好友 -->
        <el-button v-else type="success">
          <AddUser theme="outline" size="24" fill="#ffffff"/>
        </el-button>
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