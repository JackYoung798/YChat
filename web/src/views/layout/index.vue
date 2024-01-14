<script setup>
import { useUserStore} from '@/stores'
import { useRouter } from 'vue-router'
import asideMenu from '@/components/asideMenu.vue'
const userStore = useUserStore()
const router = useRouter()
</script>

<template>
  <div class="body-content">
    <div class="aside">
      <asideMenu></asideMenu>
    </div>
    <div class="left">
      <router-view></router-view>
    </div>
    <div class="right">
      <router-view name="right"></router-view>
    </div>
  </div>
</template>

<style scoped>
.body-content {
  height: 98vh;
  display: flex;
}
.aside {
  width: 70px;
}
.left {
  width: 22vw;
  min-width: 200px;
  border-right: 1px #f1f1f1 solid;
}
.right {
  width: 80vw;
}
</style>