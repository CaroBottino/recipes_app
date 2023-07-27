<template>
  <div class="body">
    <div v-if="status === 'success'">
      <h1>🌸 Gracias por tu compra! 🌸</h1>
      <p>Podés ver tus nuevas recetas en tu menú de usuario</p>

      <button type="button" class="btn btn-primary" @click="backToUser">Volver al menú</button>
    </div>
    <div v-else>
      <h1>Ups! 😬</h1>
      <p>
        Algo ocurrió al momento de comprar. Por favor volvé a intentar y si no funciona comunicate
        con nosotros.
      </p>

      <button type="button" class="btn btn-primary" @click="backToUser">Volver al menú</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const status: string = route.params.status.toString()

const backToUser = () => router.push({ name: 'user' })
</script>

<style scoped></style>
