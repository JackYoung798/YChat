<script setup>
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import socket from "@/utils/socket.js"
import avatar from '@/assets/default.png'
import { ref } from 'vue';
const userStore = useUserStore()
const router = useRouter()

const activeName = ref(0)
const chat = (item) => {
    console.log(item);
    activeName.value = item
    userStore.setActiveUser(item)
}

</script>

<template>
  <div class="body-content">
    <!-- 标题 -->
    <div class="title">
      <div class="loader"></div>
      <div class="msg">Message</div>
    </div>
    <!-- 消息列表 -->
    <div class='box'>
        <div class="item" :class="item == activeName?'active':''" v-for="item in userStore.userList" @click="chat(item)" >
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
.box {
  height: 680px;
  overflow: auto;
}
::-webkit-scrollba {
  display: none;
}
.item {
  height: 60px;
  border-bottom: 1px #f1f1f1 solid;
  border-left: 2px #ffffff solid;
  padding-left: 10px;
  display: flex;
  align-items: center;
  .name {
    margin-left: 10px;
  }
}
.item:hover {
  border-left: 2px #dd0025 solid;
  background: linear-gradient(to right ,#ffbfab 0% ,#ffffff 100%);
}
.active {
  border-left: 2px #dd0025 solid;
  background: linear-gradient(to right ,#ffbfab 0% ,#ffffff 100%);
}
</style>