import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import msg from '@/components/subcomponents/message.vue'
import chatBox from '@/components/chatBox.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/',component: () => import('@/views/login/index.vue')},
        { 
          path: '/layout',
          component: () => import('@/views/layout/index.vue'),
          redirect: '/message',
          children: [
            {
              path: '/message',
              components: {
                default: msg,
                right: chatBox
              }
            },
            {
              path: '/contacts',
              component: () => import('@/components/subcomponents/contacts.vue'),
            },
            {
              path: '/part3',
              component: () => import('@/components/subcomponents/part3.vue'),
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