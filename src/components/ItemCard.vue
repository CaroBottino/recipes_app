<template>
  <div class="card">
    <img :src="props.item.img" :alt="props.item.name" style="opacity: 1" />
    <header>
      <h4>{{ props.item.name }}</h4>
      <p>$ {{ props.item.price }}</p>
    </header>
    <footer>
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="showInfo"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i class="bi bi-info-lg"></i>
      </button>
      <button
        v-if="store.getItemFromCart(props.item.id).length > 0"
        type="button"
        class="btn btn-primary icon-check"
      >
        <i class="bi bi-check-lg"></i>
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i class="bi bi-cart-plus"></i>
      </button>
      <!-- 
        <b-button
          v-b-modal.modal-info
          v-on:click="showInfo(item)"
          :disabled="item.stock < 0"
        >
          <b-icon icon="info-lg" class="nav-icon"></b-icon>
        </b-button>
        <b-button v-if="isInCart(item)" class="icon-check">
          <b-icon icon="check-lg"></b-icon>
        </b-button>
        <b-button v-else v-on:click="addToCart(item)">
          <b-icon icon="cart-plus" class="nav-icon"></b-icon>
        </b-button> 
        -->
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Item } from '@/models/Item'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const emits = defineEmits(['showInfo'])

const props = defineProps<{
  item: {
    type: Item
    required: true
  }
}>()

const showInfo = () => {
  emits('showInfo', props.item)
}
</script>

<style scoped>
.icon-check {
  background-color: green;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80vw;
  margin: 4rem auto;
}

.card {
  position: relative;
  margin: 2rem;
  width: 14rem;
  height: 26rem;
  border-radius: 1rem;
  background-color: #eee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.card img {
  border-radius: 1rem 1rem 0 0;
  height: 16rem;
  width: 14rem;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease;
}

.card header {
  margin: 1rem;
}
.card h4 {
  font-weight: 700;
  margin: 0;
  font-size: larger;
}
.card p {
  font-size: 1rem;
}

.card button {
  width: 3rem;
  height: 3rem;
  border-radius: 5px;
  border: none;
  transition: opacity 0.2s ease;
  transition: background-color 0.6 ease;
  margin-left: 1rem;
  margin-right: 1rem;
}

.card footer {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
}
</style>
