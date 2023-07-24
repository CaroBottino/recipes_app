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
        <!-- 
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> 
        -->
      </div>
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
              <li><router-link :to="{ name: 'user' }"> Profile </router-link></li>
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
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const signOut = () => {
  userStore.logoutUser()
  router.push({ name: 'home' })
}
</script>

<style scoped>
button {
  border-radius: 50%;
  margin-right: 2px;
  margin-left: 2px;
  min-height: 1rem;
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
</style>
