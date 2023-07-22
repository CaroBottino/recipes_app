<template>
  <div class="body">
    <h1 class="user-header">Información de usuario</h1>
    <div class="col d-flex justify-content-center">
      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="userStore.getUser.avatar" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ userStore.getUser.fullname }}</h5>
              <div v-if="edit">
                <div>
                  <label for="fullname">Fullname</label>
                  <input
                    type="text"
                    id="fullname"
                    v-model="editUser.user.fullname"
                    name="fullname"
                  />
                </div>
                <div>
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="editUser.user.email" name="email" />
                </div>
                <div>
                  <label for="pass">Password</label>
                  <input type="text" id="pass" v-model="editUser.user.pass" name="pass" />
                </div>
                <div>
                  <label for="role">Role</label>
                  <select id="role" v-model="editUser.user.role">
                    <option value="admin">admin</option>
                    <option value="buyer">buyer</option>
                  </select>
                </div>
                <div>
                  <label for="fullname">Avatar</label>
                  <input type="text" id="avatar" v-model="editUser.user.avatar" name="avatar" />
                </div>

                <button v-on:click="editUserInfo">
                  <i class="bi bi-check"></i>
                </button>
              </div>
              <div v-else>
                <p class="card-text">email: {{ userStore.getUser.email }}</p>
                <p class="card-text">Password: {{ userStore.getUser.pass }}</p>
                <p class="card-text">role: {{ userStore.getUser.role }}</p>

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
      :items="recipesStore.getRecipes"
      :actions="actionsPropias"
      @editItem="onEditItem"
      @deleteItem="onDeleteItem"
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRecipesStore } from '@/stores/recipes'
import type { User } from '@/models/User'
import CustomTable from '@/components/CustomTable.vue'

const userStore = useUserStore()
const recipesStore = useRecipesStore()

const edit = ref(false)
const editUser = reactive<{ user: User }>({
  user: { ...userStore.getUser }
})

const headersRecipes = [
  'id',
  'name',
  'img',
  'ingredients',
  'steps',
  'time',
  'servings',
  'tags',
  'price'
]
const actionsPropias = ['edit', 'delete']
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

const onEditItem = () => {}

const onDeleteItem = () => {}

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
}

img {
  min-height: 16rem;
  min-width: 16rem;
  padding: 1rem;
}

.card-text {
  align-items: flex-end;
}
</style>
