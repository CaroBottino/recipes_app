<template>
  <div class="card">
    <img :src="recipe.img" :alt="recipe.name" style="opacity: 1" />
    <header>
      <h4 data-test="card-header">{{ recipe.name }}</h4>
      <p data-test="card-servings">porciones: {{ recipe.servings }}</p>
      <p data-test="card-time">tiempo: {{ recipe.time }} minutos</p>
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
      <template v-if="!userCanSee(recipe.id)">
        <button
          v-if="store.getItemFromCart(recipe.id).length > 0"
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
          @click="addItemToCart(recipe)"
        >
          <i class="bi bi-cart-plus"></i>
        </button>
      </template>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/models/Recipe'
import type { CartItem } from '@/models/CartItem'
import { useUserStore } from '@/stores/user'
import { useRecipesStore } from '@/stores/recipes'

const store = useUserStore()
const recipesStore = useRecipesStore()

const props = defineProps<{ recipe: Recipe }>()
const emits = defineEmits(['showInfo'])

const showInfo = () => {
  emits('showInfo', props.recipe)
}

const userCanSee = (recipeId: string): boolean => {
  const r = recipesStore.getRecipeById(recipeId)

  // it's his recipe
  if (r?.user === store.getUser.id) {
    return true
  }

  // he bought it
  if (store.getRecipesBought.find((r) => r.id === recipeId)) {
    return true
  }

  return false
}

const addItemToCart = (recipe: Recipe) => {
  const recipeToCart: CartItem = {
    id: recipe.id,
    name: recipe.name,
    img: recipe.img,
    price: recipe.price,
    user: recipe.user
  }

  store.addItemToCart(recipeToCart)
}
</script>

<style scoped>
.icon-check {
  background-color: green;
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
  left: 0;
  margin: 1rem;
  display: flex;
  justify-content: center;
}

.centered {
  display: flex;
  justify-content: center;
}
</style>
