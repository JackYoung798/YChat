<script setup>
import { useUserStore, useChatStore } from '@/stores'
import { Promotion } from '@element-plus/icons-vue';
import { ref } from 'vue';
import avatarUrl from '@/assets/default.png'
import socket from "@/utils/socket.js"
const userStore = useUserStore()
const chatStore = useChatStore()

const msg = ref('')
const send = () => {
    // if(!userStore.activeUser)
    let data = {
        socketId: userStore.activeUser.socketId,
        from: userStore.user.username,
        to: userStore.activeUser.username,
        msg: msg.value
    }
    socket.emit('sendMsg', data)
    chatStore.setMsgList(data)
    msg.value = ''
}

socket.on('receiveMsg', data => {
    let res = {
        from: data.from,
        to: data.to,
        msg: data.msg
    }
    chatStore.setMsgList(res)
})
</script>

<template>
  <div class="body">
      <el-header>
          <div class="name">{{ userStore.activeUser.username || '开始聊天吧！'}}</div>
      </el-header>

      <el-main>
          <ul>
              <li v-for="item in chatStore.chatMsgList.filter(item => item.from == userStore.activeUser.username || item.to == userStore.activeUser.username)">
                  <div v-if="item.from == userStore.activeUser.username" class="receive">
                      <div class="content">
                          <div><el-avatar shape="square" :size="32" :src="avatarUrl"/></div>
                          <div class="msg">{{ item.msg }}</div>
                      </div>
                  </div>
                  <div v-if="item.to == userStore.activeUser.username" class="send">
                      <div class="content">
                          <div><el-avatar shape="square" :size="32" :src="avatarUrl"/></div>
                          <div class="msg">{{  item.msg }}</div>
                      </div>
                  </div>
              </li>
          </ul>
      </el-main>

      <el-footer>
          <el-input v-model="msg" clearable placeholder="enter"></el-input>
          <el-button @click="send" @keydown.enter.exact="enterEvent($event)" :disabled="!msg" circle><el-icon><Promotion /></el-icon></el-button>
      </el-footer>
  </div>
</template>

<style scoped>
.el-header {
    height: 60px;
    line-height: 60px;
    box-shadow: 1px 1px 10px grey;
    .name {
        width: 200px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
    }
}
.el-main {
    height: 500px;
}
ul {
    height: 420px;
    overflow-y: scroll;
    /* border: 1px black solid; */
    list-style: none;
    padding-left: 0;
}
.content {
    margin: 8px;
    /* display: flex; */
    align-items: center;
}
.msg {
    max-width: 300px;
    background-color: #ffffff;
    font-size: 18px;
    display: inline-block;
    word-wrap: break-word;
    padding: 5px 12px;
    position: relative;
    border-radius: 8px;
}
.receive .content{
    display: flex;
    align-items: center;
}
.receive .content .msg {
    background-color: #95ec69;
    margin-left: 5px;
}
.send .content{
    display: flex;
    flex-direction: row-reverse;
}
.send .content .msg {
    background: rgb(240,245,245);
    margin-right: 5px;

}
.el-footer {
    box-shadow: 1px -1px 10px grey;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-input {
        width: 500px;
        height: 36px;
        line-height: 36px;
    }
}
</style>