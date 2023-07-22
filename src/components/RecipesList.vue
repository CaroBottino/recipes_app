<template>
  <div>
    <div v-if="store.getRecipes.length == 0" class="spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="cards">
      <div v-for="(recipe, i) in store.getRecipes" :key="i">
        <RecipeCard :recipe="recipe" @showInfo="showInfoHandler" />
      </div>
    </div>

    <RecipeInfo :recipe="infoRecipe.recipe" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeInfo from '@/components/RecipeInfo.vue'
import type { Recipe } from '@/models/Recipe'
import { useRecipesStore } from '@/stores/recipes'

const store = useRecipesStore()
store.getRecipesFromApi()
const infoRecipe = reactive<{ recipe: Recipe }>({
  recipe: {
    id: '',
    name: '',
    img: '',
    ingredients: [],
    steps: [],
    price: 0,
    time: 0,
    servings: 0,
    tags: [],
    user: ''
  }
})

const showInfoHandler = (recipe: Recipe) => {
  infoRecipe.recipe = recipe
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
</style>
@/models/Recipes @/stores/recipes
