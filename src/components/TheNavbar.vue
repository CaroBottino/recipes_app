<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand"> Recipes App </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarScroll">
        <form class="d-flex" @submit.prevent="searchRecipes">
          <input
            class="form-control me-2"
            type="search"
            placeholder="..."
            aria-label="Search"
            v-model="search"
            required
          />
          <button type="submit" class="btn btn-primary cart-btn">
            <i class="bi bi-search"></i>
          </button>
        </form>

        <div>
          <ul
            class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px"
          >
            <li v-if="userStore.logged">
              <button
                type="button"
                class="btn logged-user"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img :src="userStore.getUser.avatar" class="avatar" alt="..." />
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarScrollingDropdown">
                <li class="menu-li"><router-link :to="{ name: 'user' }"> Profile </router-link></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" @click="signOut">Sign Out</a></li>
              </ul>
            </li>
            <li v-else>
              <router-link :to="{ name: 'login' }">
                <button type="button" class="btn btn-primary cart-btn">
                  <i class="bi bi-person-circle"></i>
                </button>
              </router-link>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-primary cart-btn position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#cart"
                aria-controls="cart"
              >
                <i class="bi bi-cart"></i>
                <span
                  v-if="userStore.cartItemsQ > 0"
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {{ userStore.cartItemsQ }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const search = ref('')

const signOut = () => {
  userStore.logoutUser()
  router.push({ name: 'home' })
}

const searchRecipes = () => {
  router.push({ name: 'search', params: { search: search.value } })
}
</script>

<style scoped>
button {
  border-radius: 50%;
  margin-right: 2px;
  margin-left: 2px;
  min-height: 1rem;
}

.logged-user {
  border: white;
}

.avatar {
  width: 50px;
  border-radius: 50%;
  border-style: none;
}

.cart-btn {
  margin-top: 6px;
  min-width: 3rem;
  min-height: 3rem;
}

.dropdown-menu-end {
  margin-top: 0;
  margin-right: 4rem;
}

.menu-li {
  margin-left: 15px;
}
</style>
