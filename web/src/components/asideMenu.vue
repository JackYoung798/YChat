<script setup>
import { useUserStore, useChatStore } from '@/stores'
import { useRouter } from 'vue-router'
import { Config,MessageOne,Tag, AddressBook } from '@icon-park/vue-next'
import { SwitchButton, UserFilled} from '@element-plus/icons-vue'
import { userExitService } from '@/api/user.js'
import socket from "@/utils/socket.js"
import avatarUrl from '@/assets/default.png'
import { ref } from 'vue'
const userStore = useUserStore()
const chatStore = useChatStore()
const router = useRouter()

// 左下功能栏
const handleCommand = async (key) => {
  if (key === 'logout') {
    // await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
    //   type: 'warning',
    //   confirmButtonText: '确认',
    //   cancelButtonText: '取消'
    // })
    userExitService(userStore.user.userid)
    userStore.removeToken()
    userStore.setUser({})
    userStore.setUserList([])
    userStore.setActiveUser({})
    chatStore.reset()
    socket.disconnect()
    router.push('/')
  } 
  // else if (key === 'change'){ 
  //   details.value = true
  // }
}

//菜单控件
const count = ref('message')
const active = (i) => {
  router.push(`/${i}`)
  count.value = i
}

</script>

<template>
  <div class="body-content">
    <!-- 头像 -->
    <el-popover placement="right-end">
      <template #reference>
        <div class="avatar">
          <el-avatar shape="square" :src="userStore.user.avatar || avatarUrl"/>
        </div>
      </template>
      <el-form>
        <el-form-item>
          {{ userStore.user.username }}
        </el-form-item>
      </el-form>
    </el-popover>

    <!-- 菜单栏 -->
    <div class="menu">
      <div class="menu-item" :class="[count=='message'?'active':'']" @click="active('message')" ><message-one theme="outline" size="30" fill="#ffffff"/></div>
      <div class="menu-item" :class="[count=='contacts'?'active':'']" @click="active('contacts')"><address-book theme="outline" size="30" fill="#ffffff"/></div>
      <div class="menu-item" :class="[count=='part3'?'active':'']" @click="active('part3')"><Tag theme="outline" size="30" fill="#ffffff"/></div>
    </div>
    <!-- 功能 -->
    <div @click="logout" class="bottom">
      <el-dropdown placement="top" @command="handleCommand">
        <config theme="outline" size="30" fill="#ffffff"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="change" :icon="UserFilled">基本资料</el-dropdown-item>
            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>
.body-content {
  /* width: 100%; */
  height: 100%;
  background: #3F51B5;
  border-radius: 10px;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu-item {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin: 10px;
  }
  .menu-item:hover {
    transform: scale(1.2);
    background: #00BFFF;
    transition: all .5s;
  }
  .active {
  background: #00BFFF;
  }
}

.bottom {
  position: absolute;
  bottom: 20px;
  left: 18px;
}
</style>