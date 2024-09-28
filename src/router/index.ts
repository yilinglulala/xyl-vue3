/*
 * @FilePath: \tools\src\router\index.ts
 * @Description: 路由
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
export const routes = [
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
      {
        path: '/configForm',
        name: 'configForm',
        component: () => import('@/views/toolView/configForm.vue')
      },
      {
        path: '/configTable',
        name: 'configTable',
        component: () => import('@/views/toolView/configTable/index.vue')
      },
      {
        path: '/chart',
        name: 'chart',
        component: () => import('@/views/toolView/chart/index.vue')
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router



  