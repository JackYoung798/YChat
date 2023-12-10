<script setup>
import { useUserStore} from '@/stores'
import { useRouter } from 'vue-router'
import avatarUrl from '@/assets/default.png'
import asideMenu from '@/components/asideMenu.vue'
const userStore = useUserStore()
const router = useRouter()
</script>

<template>
  <div class="body-content">
    <el-row>
      <el-col :span="1" class="col">
        <asideMenu></asideMenu>
      </el-col>
      <el-col :span="5" class="col">
        <router-view></router-view>
      </el-col>
      <el-col :span="18">

      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.body-content {
  width: 100%;
  height: 100%;
}
.col {
  height: 98vh;
  border-right: 1px black solid;
}
</style>