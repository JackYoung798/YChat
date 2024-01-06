<script setup>
import { useUserStore,useChatStore } from '@/stores'
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
    from: userStore.user.userid,
    to: userStore.activeUser.userid,
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
  <div v-if="Object.keys(userStore.activeUser).length > 0">
    <header>
      <div class="title">{{ userStore.activeUser.username || '选择对话开始聊天！'}}</div>
    </header>

    <main>
      <ul>
        <li v-for="item in chatStore.chatMsgList.filter(item => item.from == userStore.activeUser.userid || item.to == userStore.activeUser.userid)">
          <div v-if="item.from == userStore.activeUser.userid" class="receive">
            <div class="content">
              <div><el-avatar shape="square" :size="32" :src="avatarUrl"/></div>
              <div class="msg">{{ item.msg }}</div>
            </div>
          </div>
          <div v-if="item.to == userStore.activeUser.userid" class="send">
            <div class="content">
              <div><el-avatar shape="square" :size="32" :src="avatarUrl"/></div>
              <div class="msg">{{ item.msg }}</div>
            </div>
          </div>
        </li>
      </ul>
    </main>

    <footer>
      <el-input v-model="msg" clearable placeholder="enter"></el-input>
      <el-button @click="send" :disabled="!msg" circle><el-icon><Promotion /></el-icon></el-button>
    </footer>
  </div>
  <div v-else>
    <el-empty description="description" />
  </div>
</template>

<style scoped>
header {
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  border: 1px #3F51B5 solid;
  margin: 5px;
  .title {
    margin-left: 20px;
  }
}
main {
  border: 1px blue solid;
}
footer {
  width: 60vw;
  border: 1px #3F51B5 solid;
  border-radius: 50px;
  display: flex;
  padding: 10px 30px;
  position: absolute;
  bottom: 20px
}
ul {
    height: 600px;
    overflow-y: scroll;
    border: 1px red solid;
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
    background-color: rgb(240,245,245);
    margin-left: 5px;
}
.send .content{
    display: flex;
    flex-direction: row-reverse;
}
.send .content .msg {
    background: #95ec69;
    margin-right: 5px;

}
.el-button {
    margin-left: 10px
  }
</style>