<script setup>
import { useUserStore} from '@/stores'
import { useRouter } from 'vue-router'
import asideMenu from '@/components/asideMenu.vue'
const userStore = useUserStore()
const router = useRouter()
</script>

<template>
  <div class="body-content">
    <el-row>
      <div class="aside">
        <asideMenu></asideMenu>
      </div>
      <el-col :span="5" class="col">
        <router-view></router-view>
      </el-col>
      <el-col :span="18" class="col">

      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.body-content {
  width: 100%;
  height: 100%;
}
.aside {
  height: 98vh;
}
.col {
  height: 100%;
}
</style>