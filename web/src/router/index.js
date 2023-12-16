import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/',component: () => import('@/views/login/index.vue')},
        { 
          path: '/layout',
          component: () => import('@/views/layout/index.vue'),
          redirect: '/message',
          children: [
            {
              path: '/message',
              component: () => import('@/components/subcomponents/message.vue'),
            },
            {
              path: '/contacts',
              component: () => import('@/components/subcomponents/contacts.vue'),
            }
          ]
        }

    ]
  })
  
  //导航守卫
  router.beforeEach((to) => {
    const useStore = useUserStore()
    if (!useStore.token && to.path !== '/') return '/'
    return true
  })

  export default router