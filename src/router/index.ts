/*
 * @FilePath: \tools\src\router\index.ts
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/moment',
          name: 'moment',
          component: () => import('@/views/toolView/moment.vue')
        },
        {
          path: '/json',
          name: 'json',
          component: () => import('@/views/toolView/json.vue')
        },
      ]
    }
  ]
})

export default router
