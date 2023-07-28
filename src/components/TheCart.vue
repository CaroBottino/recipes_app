<template>
  <div
    class="offcanvas offcanvas-end"
    data-bs-scroll="true"
    tabindex="-1"
    id="cart"
    aria-labelledby="cartLabel"
  >
    <div class="offcanvas-header">
      <h5 id="cartLabel">Carrito</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div v-if="userStore.cartItemsQ == 0">No hay items en tu carrito</div>
      <div
        v-else
        v-for="item in userStore.getUserCart"
        :key="item.id"
        class="card mb-3"
        style="max-width: 540px"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="item.img" class="img-fluid rounded-start" :alt="item.id" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <div class="row desc">
                <div class="col">
                  <p class="card-text">$ {{ item.price }}</p>
                </div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="userStore.deleteItemFromCart(item.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="offcanvas-footer">
      <div class="row">
        <div class="col"><strong>Total:</strong> $ {{ userStore.cartPrice }}</div>
        <div class="col" v-if="userStore.getUser.id === ''">
          <button type="button" class="btn btn-primary btn-sm" @click="registerUser">
            Registrate y comprá ✨
          </button>
        </div>
        <div class="col" v-else>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="buyItems"
            :disabled="userStore.cartItemsQ === 0"
          >
            Comprar!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Offcanvas } from 'bootstrap'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const buyItems = () => {
  userStore
    .buyItems()
    .then(() => {
      Offcanvas.getInstance('#cart')?.hide()
      router.push({ name: 'bought', params: { status: 'success' } })
    })
    .catch(() => {
      router.push({ name: 'bought', params: { status: 'error' } })
    })
}

const registerUser = () => {
  Offcanvas.getInstance('#cart')?.hide()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.offcanvas-footer {
  padding: 1rem;
  background-color: lightgray;
}

.desc {
  margin-top: 1rem;
}

img {
  min-height: 7rem;
}
</style>
