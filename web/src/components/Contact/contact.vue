<script setup>
import { useUserStore,useFuntionStore } from '@/stores'
import { ref } from 'vue';
import { searchContactService } from '@/api/funtion.js'
import avatar from '@/assets/default.png'
const userStore = useUserStore()
const funtionStore = useFuntionStore()

const input = ref('')
const search = async () => {
  const user = await searchContactService(input.value)
  funtionStore.setSearch(user.data)
}

const active = (item) => {
    funtionStore.setActiveContact(item)
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
      <input class="input" v-model="input"/> 
      <button @click="search">搜索</button>
    </div>
    <!-- <div v-if="funtionStore.search">
      <div>查找结果</div>
      <div class="item">
        <el-avatar shape="circle" :src="funtionStore.search.avatar || avatar"/>
        <div class="name">{{ funtionStore.search.username }}</div>
      </div>
    </div> -->
    <!-- 好友列表 -->
    <div>好友列表</div>
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