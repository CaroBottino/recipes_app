<template>
  <div class="body">
    <div class="top"></div>
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <p>Ups! Algo sucedió al intentar registrarte...</p>
      <ul>
        <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
      </ul>
    </div>

    <TheLogin @login="onLoginSubmit" @register="onRegisterSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheLogin from '@/components/TheLogin.vue'
import UsersController from '@/controllers/UsersController'
import type { User } from '@/models/User'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const errors = ref<string[]>([])

const router = useRouter()

const onLoginSubmit = (form: { email: string; pass: string }) => {
  errors.value = []

  UsersController.getUsers().then((res) => {
    const users = res.data

    const found = users.find((user: User) => user.email === form.email)

    if (!found) {
      errors.value.push('user o pass incorrecta')
      return
    }

    store.loginUser(found)
    router.push({ name: 'user' })
  })
}
const onRegisterSubmit = () => {}
</script>

<style scoped></style>
