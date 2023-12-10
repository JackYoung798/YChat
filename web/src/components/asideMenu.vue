<script setup>
import { useUserStore} from '@/stores'
import { useRouter } from 'vue-router'
import { Config } from '@icon-park/vue-next'
import { userExitService } from '@/api/user.js'
import socket from "@/utils/socket.js"
import avatarUrl from '@/assets/default.png'
const userStore = useUserStore()
const router = useRouter()

//左下功能栏
const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userExitService(userStore.user.username)
    userStore.removeToken()
    userStore.setUser({})
    userStore.setUserList([])
    userStore.setActiveUser({})
    // chatStore.reset()
    socket.disconnect()
    router.push('/')
  } 
  else if (key === 'change'){ 
    details.value = true
  }
}
</script>

<template>
  <div class="body-content">
    <div class="avatar">
      <el-avatar shape="square" :src="userStore.user.avatar || avatarUrl"/>
    </div>
    <div class="bottom">
      <el-dropdown placement="top" @command="handleCommand">
        <config theme="outline" size="30" fill="#333"/>        
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
  width: 100%;
  height: 100%;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}
.bottom {
  /* border: 1px black solid; */
  position: absolute;
  bottom: 20px;
  left: 12px;
}
</style>