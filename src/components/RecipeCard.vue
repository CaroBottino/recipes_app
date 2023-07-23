<template>
  <div class="card">
    <img :src="props.recipe.img" :alt="props.recipe.name" style="opacity: 1" />
    <header>
      <h4>{{ props.recipe.name }}</h4>
      <p>porciones: {{ props.recipe.servings }}</p>
      <p>tiempo: {{ props.recipe.time }} minutos</p>
    </header>
    <footer>
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="showInfo"
        data-bs-toggle="modal"
        data-bs-target="#infoRecipe"
      >
        <i class="bi bi-info-lg"></i>
      </button>
      <button
        v-if="store.getItemFromCart(props.recipe.id).length > 0"
        type="button"
        class="btn btn-primary icon-check"
      >
        <i class="bi bi-check-lg"></i>
      </button>
      <button
        v-else
        type="button"
        class="btn btn-primary"
        data-bs-toggle="offcanvas"
        data-bs-target="#cart"
        aria-controls="cart"
        @click="addItemToCart(props.recipe)"
      >
        <i class="bi bi-cart-plus"></i>
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Recipe } from '@/models/Recipe'
import type { CartItem } from '@/models/CartItem'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const emits = defineEmits(['showInfo'])

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true
  }
})

const showInfo = () => {
  emits('showInfo', props.recipe)
}

const addItemToCart = (recipe: Recipe) => {
  const recipeToCart: CartItem = {
    id: recipe.id,
    name: recipe.name,
    img: recipe.img,
    price: recipe.price
  }

  store.addItemToCart(recipeToCart)
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
  font-size: small;
  margin-bottom: 0;
}

.card button {
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
@/models/Recipes
