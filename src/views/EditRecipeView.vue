<template>
  <div>
    <h1>Editar receta</h1>
    <div class="card-photo">
      <img :src="editRecipe.recipe.img" class="img-fluid rounded-start" alt="..." />
    </div>
    <div>
      <div class="card-body">
        <form @submit.prevent="editRecipeInfo">
          <div class="row mb-3">
            <label for="name" class="col-sm-4 col-form-label col-form-label-sm"> Nombre </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control form-control-sm"
                id="name"
                v-model="editRecipe.recipe.name"
                name="name"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="img" class="col-sm-4 col-form-label col-form-label-sm"> Foto </label>
            <div class="col-sm-8">
              <input
                type="email"
                class="form-control form-control-sm"
                id="img"
                v-model="editRecipe.recipe.img"
                name="img"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="time" class="col-sm-4 col-form-label col-form-label-sm">
              Tiempo (minutos)
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control form-control-sm"
                id="time"
                v-model="editRecipe.recipe.time"
                name="time"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="servings" class="col-sm-4 col-form-label col-form-label-sm">
              Porciones
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control form-control-sm"
                id="servings"
                v-model="editRecipe.recipe.servings"
                name="servings"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="ingredients" class="col-sm-4 col-form-label col-form-label-sm">
              Ingredientes
            </label>
            <div class="col-sm-8">
              <ul>
                <li v-for="(ingredient, i) in editRecipe.recipe.ingredients" :key="i">
                  {{ ingredient }}
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="deleteIngredient(ingredient)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control form-control-sm"
                id="servings"
                v-model="newIngredient"
                name="servings"
              />
            </div>
            <div class="col-sm-2">
              <button type="button" class="btn btn-primary" @click="addIngredient">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <div class="row mb-3">
            <label for="steps" class="form-label col-form-label-sm">Pasos a seguir</label>
          </div>
          <div class="row mb-3">
            <ul>
              <li v-for="(step, i) in editRecipe.recipe.steps" :key="i">
                {{ i + 1 }} - {{ step }}
                <button type="button" class="btn btn-primary" @click="deleteStep(step)">
                  <i class="bi bi-trash"></i>
                </button>
              </li>
            </ul>
          </div>
          <div class="row mb-3">
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control form-control-sm"
                id="newStep"
                v-model="newStep"
                name="newStep"
              />
            </div>
            <div class="col-sm-2">
              <button type="button" class="btn btn-primary" @click="addStep">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Guardar receta!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import type { Recipe } from '@/models/Recipe'
import { useRecipesStore } from '@/stores/recipes'

const route = useRoute()
const recipeId: string = route.params.id.toString()
const recipeStore = useRecipesStore()

const editRecipe = reactive<{ recipe: Recipe }>({
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
const newIngredient = ref('')
const newStep = ref('')

const setRecipe = () => {
  const aux = recipeStore.getRecipeById(recipeId)

  if (aux) editRecipe.recipe = aux
}

const deleteIngredient = (ingredient: string) => {
  const aux = editRecipe.recipe.ingredients.filter((ing) => ing !== ingredient)
  editRecipe.recipe.ingredients = aux
}

const addIngredient = () => {
  editRecipe.recipe.ingredients.push(newIngredient.value)
  newIngredient.value = ''
}

const deleteStep = (step: string) => {
  const aux = editRecipe.recipe.steps.filter((st) => st !== step)
  editRecipe.recipe.steps = aux
}

const addStep = () => {
  editRecipe.recipe.steps.push(newStep.value)
  newStep.value = ''
}

const editRecipeInfo = () => {}

onBeforeMount(() => {
  setRecipe()
})
</script>

<style scoped></style>
