/*
 * @FilePath: \tools\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
          component: () => import('@views/toolView/moment.vue')
        },
        {
          path: '/json',
          name: 'json',
          component: () => import('@views/toolView/json.vue')
        },
      ]
    }
  ]
})

export default router
