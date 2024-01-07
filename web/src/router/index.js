import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import message from '@/components/Message/message.vue'
import chatBox from '@/components/Message/chatBox.vue'
import contact from '@/components/Contact/contact.vue'
import detail from '@/components/Contact/detail.vue'

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
                default: message,
                right: chatBox
              }
            },
            {
              path: '/contact',
              components: {
                default: contact,
                right: detail
              }
            },
            {
              path: '/part3',
              component: () => import('@/components/part3.vue'),
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