<script setup>
import { ref,Transition,watch } from 'vue';
import { User, Lock, ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { userLogService,userRegService } from '@/api/user.js'
import { contactListService } from '@/api/funtion.js'
import { useUserStore,useFuntionStore } from '@/stores'
import { useRouter } from 'vue-router'
import socket from "@/utils/socket.js"
const userStore = useUserStore()
const funtionStore = useFuntionStore()
const router = useRouter()

//表单控件
const show = ref(true)
const change = () => show.value = !show.value
watch(show, () => {
  formModel.value = {
      username: '',
      password: ''
  }
  setTimeout(() => {
      form.value.clearValidate()
  },30)
})

//表单数据
const form = ref()
const formModel = ref({
  username: 'jiege',
  password: '123321'
})

//表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 1,max: 11,message: '用户名必须是 5-11位 的字符',trigger: 'change'}
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/,message: '密码必须是 6-15位 的非空字符',trigger: 'change'}
  ]
}

//注册
const register = async () => {
    await form.value.validate()
    const res = await userRegService(formModel.value)
    ElMessage.success(res.msg)
    show.value = true
    setTimeout(() => {
        form.value.clearValidate()
    },30)
}

//登录
const login = async () => {
    await form.value.validate()
    //获取用户信息
    const user = await userLogService(formModel.value)
    userStore.setToken(user.data.token)
    userStore.setUser(user.data.userData)
    //菜单控件初始化
    funtionStore.setOption('message')
    //获取通讯录列表
    const contact = await contactListService(userStore.user.userid)
    funtionStore.setContactList(contact.data)
    //socket连接
    socket.connect()
    socket.emit('login',user.data.userData)
    socket.on('online',(data) => {
        const res = data.filter(item => item.username != userStore.user.username)
        funtionStore.setMessageList(res)
    })
    ElMessage.success(user.msg)
    ElNotification({
        type: 'success',
        message: '用户：' + user.data.userData.username + ' 上线',
    })
    router.push('/layout')
}

</script>

<template >
  <div class="body-content">
    <el-row>
      <el-col :span="14" class="col">
        <div class="title">
          WELCOME TO <br>&nbspONLINE YCHAT
        </div>
      </el-col>
      <el-col :span="10" class="col">
        <Transition name="el-zoom-in-center" mode="out-in">
          <div v-if="show" class="form">
            <el-form ref="form" :model="formModel" :rules="rules" size="large">
              <el-form-item>
                <div class="text">Login</div>
              </el-form-item>
              <el-form-item prop="username">
                <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入账号" clearable></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" type="password" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <div @click="login" class="btn">Log in</div>              
              </el-form-item>
            </el-form>
          </div>
          <div v-else class="form">
            <el-form ref="form" :model="formModel" :rules="rules" size="large">
              <el-form-item>
                <div class="text">Register</div>
              </el-form-item>
              <el-form-item prop="username">
                <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入账号" clearable></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" type="password" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="register" class="btn">Sign up</el-button>
              </el-form-item>
            </el-form>
          </div>
        </Transition>
        <div v-if="show" class="sub_btn" @click="change"><el-icon><ArrowRightBold /></el-icon></div>
        <div v-else class="sub_btn" @click="change"><el-icon><ArrowLeftBold /></el-icon></div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.body-content {
  width: 100%;
  height: 100%;;
}
.col {
  height: 98vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
  text-shadow: -50px -20px 80px  #1326f9, 50px 20px 80px #b70422 ;
}
.form {
  border-radius: 20px;
  box-shadow: 2px 2px 5px #DDDDDD,-2px -2px 5px #DDDDDD;
  width: 350px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
  color: #00bfff;
}
.text::before {
  width: 18px;
  height: 18px;
}
.text::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}
.text::before,.text::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #00bfff;
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
.el-input {
  width: 300px;
}
.btn {
  width: 120px;
  height: 40px;
  margin-left: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 20px;
  background-image: linear-gradient(to right, #4460f1 0%, #4facfe 51%, #4460f1 100%); 
  background-size: 200% auto; 
  cursor: pointer;/* 设置指针为手型 */
  box-shadow: #4460f1 10px 10px 30px -10px;
  transition: all .3s;
  &:hover {
    background-position: right center; 
  }
  &:active {
    scale: 0.95;
  }
}
.sub_btn {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50px;
  background-image: linear-gradient(to right, #4460f1 0%, #4facfe 51%, #4460f1 100%); 
  background-size: 200% auto; 
  cursor: pointer;/* 设置指针为手型 */
  transition: all .3s;
  &:hover {
    background-position: right center; 
  }
}
</style>
