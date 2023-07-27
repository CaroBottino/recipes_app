<template>
  <div>
    <div class="centered">
      <h1>Resultados para tu búsqueda...</h1>
    </div>

    <RecipesList :recipes="filteredRecipes" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipesStore } from '@/stores/recipes'
import RecipesList from '@/components/RecipesList.vue'

const route = useRoute()
const store = useRecipesStore()

const search = computed(() => {
  return route.params.search.toString()
})

const filteredRecipes = computed(() => {
  return store.filterRecipeByCriteria(search.value)
})
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
}

h1 {
  margin-top: 3rem;
  margin-bottom: -4rem;
}
</style>
