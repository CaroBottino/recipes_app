import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import UserView from '@/views/UserView.vue'

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
      component: UserView
    },
    {
      path: '/edit-recipe/:id',
      name: 'edit-recipe',
      component: () => import('@/views/EditRecipeView.vue')
    },
    {
      path: '/bought/:status',
      name: 'bought',
      component: () => import('@/views/BoughtRecipesView.vue')
    },
    {
      path: '/search/:search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
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
