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
    <div class="title">Messages</div>
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
  width: 100%;
  height: 100%;
}
.title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 5px;
  padding-left: 20px;
  color: #3f51b5;
}
.title::before {
  width: 18px;
  height: 18px;
}
.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}
.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #3f51b5;
}
@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
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