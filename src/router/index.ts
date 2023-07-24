import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (User.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/edit-recipe/:id',
      name: 'edit-recipe',
      component: () => import('@/views/EditRecipeView.vue')
    },
    {
      path: '/notfound',
      component: NotFoundView,
      meta: { title: 'Not Found' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
