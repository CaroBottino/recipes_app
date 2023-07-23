import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { type Recipe } from '@/models/Recipe'
import RecipesController from '@/controllers/RecipesController'

export const useRecipesStore = defineStore('recipes', () => {
  const state = reactive({ recipes: <Recipe[]>[] })

  const getRecipes = computed(() => state.recipes)

  function getRecipesByUser(userId: string) {
    return state.recipes.filter((recipe) => recipe.user === userId)
  }

  function getRecipeById(id: string) {
    return state.recipes.find((recipe) => recipe.id === id)
  }

  function getRecipesFromApi() {
    RecipesController.getRecipes().then((res) => {
      state.recipes = res.data
    })
  }

  function createRecipe(recipe: Recipe) {
    RecipesController.createRecipe(recipe)
  }

  function updateRecipe(recipe: Recipe) {
    RecipesController.updateRecipe(recipe.id, recipe)
  }

  function deleteRecipe(id: string) {
    RecipesController.deleteRecipe(id)
  }

  return {
    getRecipes,
    getRecipeById,
    getRecipesByUser,
    getRecipesFromApi,
    createRecipe,
    updateRecipe,
    deleteRecipe
  }
})
