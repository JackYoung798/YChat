<template>
  <div class="body-content">
    <router-view v-slot="{ Component }">
      <transition name="router" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>  
  </div>
</template>

<style scoped>
.body-content {
  width: 100%;
  height: 100%;
}
.router-enter-active,
.router-leave-active {
  transition: all 0.3s ease;
}
.router-enter-from,
.router-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>