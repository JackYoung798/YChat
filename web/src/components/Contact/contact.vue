<script setup>
import { useUserStore,useFuntionStore } from '@/stores'
import { ref } from 'vue';
import { searchContactService,isFriend } from '@/api/funtion.js'
import avatar from '@/assets/default.png'
const userStore = useUserStore()
const funtionStore = useFuntionStore()

//搜索用户
const input = ref('')
const search = async () => {
  const user = await searchContactService(input.value)
  funtionStore.setSearch(user.data)
}
//选中好友
const active = async (item) => {
  funtionStore.setActiveContact(item)
  const res = await isFriend(userStore.user.userid,funtionStore.activeContact.userid)
  funtionStore.setIsfriend(res.data)
}
const searchActive = async () => {
  funtionStore.setActiveContact(funtionStore.search)
  const res = await isFriend(userStore.user.userid,funtionStore.activeContact.userid)
  funtionStore.setIsfriend(res.data)
}
</script>

<template>
  <div class="body-content">
    <!-- 标题 -->
    <div class="title">
      <div class="loader"></div>
      <div class="msg">Contact</div>
    </div>
    <!-- 搜索 -->
    <div>
      <input class="input" v-model="input" @input="search"/> 
      <!-- <button @click="search">搜索</button> -->
    </div>
    <div v-if="funtionStore.search">
      <el-divider>查找结果</el-divider>
      <div class="item" @click="searchActive">
        <el-avatar shape="circle" :src="funtionStore.search.avatar || avatar"/>
        <div class="name">{{ funtionStore.search.username }}</div>
      </div>
    </div>
    <!-- 好友列表 -->
    <div><el-divider>好友</el-divider></div>
    <div class='box'>
      <div :class="funtionStore.activeContact == item?'active item':'item'" v-for="item in funtionStore.contactList" @click="active(item)" >
        <el-avatar shape="circle" :src="item.avatar || avatar"/>
        <div class="name">{{ item.username }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-content {
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 5px;
  .loader {
  width: 16px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #3f51b5;
  box-shadow: 0 0 0 0 #3f51b5;
  animation: l1 1s infinite;
  }
  .msg {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  padding-left: 10px;
  color: #3f51b5;
  }
}
@keyframes l1 {
    100% {box-shadow: 0 0 0 6px #0000}
}
.input {
  margin: 10px;

}
.box {
  height: 600px;
  overflow: auto;
}
::-webkit-scrollba {
  display: none;
}
.item {
  height: 72px;
  border-bottom: 1px #f1f1f1 solid;
  border-radius: 20px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  .name {
    margin-left: 10px;
  }
}
.item:hover {
  background: #dbf4ff;
}
.active {
  background: #dbf4ff;
}
</style>