import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // { path: '/',component: () => import('@/views/home/homePage.vue')},
    ]
  })
  
  //拦截
  router.beforeEach((to) => {
    const useStore = useUserStore()
    if (!useStore.token && to.path !== '/login') return '/login'
    return true
  })

  export default router