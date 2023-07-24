<template>
  <div class="body">
    <div v-if="recipeId === 'new'">
      <h1>Nueva receta</h1>
    </div>
    <div v-else>
      <h1>Editar receta</h1>
    </div>

    <div class="photo">
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
            <label for="img" class="col-sm-4 col-form-label col-form-label-sm"> Foto (url) </label>
            <div class="col-sm-8">
              <input
                type="text"
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
                type="number"
                class="form-control form-control-sm"
                id="time"
                v-model.number="editRecipe.recipe.time"
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
                type="number"
                class="form-control form-control-sm"
                id="servings"
                v-model.number="editRecipe.recipe.servings"
                name="servings"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="price" class="col-sm-4 col-form-label col-form-label-sm"> Precio </label>
            <div class="col-sm-8">
              <input
                type="number"
                class="form-control form-control-sm"
                id="price"
                v-model.number="editRecipe.recipe.price"
                name="price"
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
          <div class="row mb-3" v-if="editRecipe.recipe.steps.length > 0">
            <ol>
              <li v-for="(step, i) in editRecipe.recipe.steps" :key="i">
                {{ step }}
                <button type="button" class="btn btn-primary" @click="deleteStep(step)">
                  <i class="bi bi-trash"></i>
                </button>
              </li>
            </ol>
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
          <div class="row mb-3">
            <label for="tags" class="col-sm-4 col-form-label col-form-label-sm"> Tags </label>
            <div class="col-sm-8">
              <div>
                <span
                  v-for="(tag, i) in editRecipe.recipe.tags"
                  :key="i"
                  class="badge rounded-pill bg-primary tag"
                >
                  {{ tag }}
                  <button type="button" class="btn btn-tag" @click="deleteTag(tag)">x</button>
                </span>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control form-control-sm"
                id="newTag"
                v-model="newTag"
                name="newTag"
              />
            </div>
            <div class="col-sm-2">
              <button type="button" class="btn btn-primary" @click="addTag">
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
import { useUserStore } from '@/stores/user'

const route = useRoute()
const recipeId: string = route.params.id.toString()
const recipeStore = useRecipesStore()
const userStore = useUserStore()

const editRecipe = reactive<{ recipe: Recipe }>({
  recipe: {
    id: '',
    name: '',
    img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
    ingredients: [],
    steps: [],
    price: 0,
    time: 0,
    servings: 0,
    tags: [],
    user: userStore.getUser.id
  }
})
const newIngredient = ref('')
const newStep = ref('')
const newTag = ref('')

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

const addTag = () => {
  editRecipe.recipe.tags.push(newTag.value)
  newTag.value = ''
}

const deleteTag = (tag: string) => {
  const aux = editRecipe.recipe.tags.filter((tg) => tg !== tag)
  editRecipe.recipe.tags = aux
}

const editRecipeInfo = () => {
  if (recipeId === 'new') {
    recipeStore
      .createRecipe(editRecipe.recipe)
      .then(() => {
        alert('Receta creada con exito')

        recipeStore.getRecipesFromApi()
      })
      .catch((err) => {
        alert('error al crear receta')
        console.log('err: ', err)
      })
  } else {
    recipeStore
      .updateRecipe(editRecipe.recipe)
      .then(() => {
        alert('Receta editada con exito')

        recipeStore.getRecipesFromApi()
      })
      .catch((err) => {
        alert('error al editar receta')
        console.log('err: ', err)
      })
  }
}

onBeforeMount(() => {
  setRecipe()
})
</script>

<style scoped>
.body {
  margin-top: 4rem;
  margin-bottom: 6rem;
}

.photo {
  padding: 1rem;
  display: flex;
  justify-content: center;
  max-height: 20rem;
  max-width: 20rem;
}

.tag {
  margin: 5px;
}

.btn-tag {
  padding: 1px;
}

li {
  font-size: small;
}
</style>
