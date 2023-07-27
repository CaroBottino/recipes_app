<template>
  <main>
    <RecipesList :recipes="store.getRecipes" />
  </main>
</template>

<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes'
import RecipesList from '@/components/RecipesList.vue'

const store = useRecipesStore()
store.getRecipesFromApi()
</script>
