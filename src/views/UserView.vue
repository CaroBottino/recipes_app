<template>
  <div class="body">
    <h1 class="user-header">Información de usuario</h1>
    <div class="col d-flex justify-content-center">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-6 card-photo">
            <img :src="userStore.getUser.avatar" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h4 class="card-title">{{ userStore.getUser.fullname }}</h4>
              <div v-if="edit">
                <form @submit.prevent="editUserInfo">
                  <div class="mb-3">
                    <label for="fullname" class="form-label col-form-label-sm">Fullname</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="fullname"
                      v-model="editUser.user.fullname"
                      name="fullname"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label col-form-label-sm">Email</label>
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      id="email"
                      v-model="editUser.user.email"
                      name="email"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label col-form-label-sm">Password</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="pass"
                      v-model="editUser.user.pass"
                      name="pass"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label col-form-label-sm">Avatar</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="avatar"
                      v-model="editUser.user.avatar"
                      name="avatar"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary"><i class="bi bi-check"></i></button>
                </form>
              </div>
              <div v-else>
                <p class="card-text">email: {{ userStore.getUser.email }}</p>
                <p class="card-text">Password: {{ userStore.getUser.pass }}</p>

                <button type="button" class="btn btn-primary" v-on:click="showEditMode">
                  <i class="bi bi-pencil"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3>Tus recetas</h3>
    <div class="new-item">
      <button type="button" class="btn btn-primary" @click="createRecipe">
        <i class="bi bi-file-earmark-plus"></i>
        Nueva Receta
      </button>
    </div>

    <CustomTable
      :headers="headersRecipes"
      :items="recipesStore.getRecipesByUser(userStore.getUser.id)"
      :actions="actionsPropias"
      @viewItem="viewItemHandler"
      @editItem="editItemHandler"
      @deleteItem="deleteItemHandler"
    />

    <h3>Tus recetas compradas</h3>
    <div v-if="userStore.getRecipesBought.length > 0">
      <CustomTable
        :headers="headersRecipes"
        :items="userStore.getRecipesBought"
        :actions="actionsCompradas"
        @deleteItem="deleteBoughtHandler"
      />
    </div>
    <div v-else>
      <h6>No compraste recetas aún</h6>
    </div>

    <RecipeInfo :recipe="infoRecipe.recipe" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRecipesStore } from '@/stores/recipes'
import type { User } from '@/models/User'
import type { Recipe } from '@/models/Recipe'
import CustomTable from '@/components/CustomTable.vue'
import RecipeInfo from '@/components/RecipeInfo.vue'

const userStore = useUserStore()
const recipesStore = useRecipesStore()
const router = useRouter()

const edit = ref(false)
const editUser = reactive<{ user: User }>({
  user: { ...userStore.getUser }
})

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

const headersRecipes = ['id', 'name', 'img', 'time', 'servings', 'tags', 'price']
const actionsPropias = ['view', 'edit', 'delete']
const actionsCompradas = ['delete']

const editUserInfo = () => {
  userStore.editUserInfo(editUser.user)
  alert('usuario editado correctamente')
  edit.value = false
}

const showEditMode = () => {
  edit.value = !edit.value
}

const createRecipe = () => {}

const viewItemHandler = (id: string) => {
  const aux = recipesStore.getRecipeById(id)
  if (aux) infoRecipe.recipe = aux
}

const editItemHandler = (id: string) => {
  router.push({
    name: 'edit-recipe',
    params: { id: id }
  })
}

const deleteItemHandler = (id: string) => {}

const deleteBoughtHandler = () => {}
</script>

<style scoped>
.body {
  margin-bottom: 6rem;
}
.user-header {
  padding-top: 25px;
}

.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: black;
}

label {
  margin-right: 1rem;
  margin-bottom: 0;
}

img {
  max-height: 16rem;
  max-width: 16rem;
  padding: 1rem;
}

.card-text {
  align-items: flex-end;
}

.card-body {
  margin-left: 2rem;
}
</style>
