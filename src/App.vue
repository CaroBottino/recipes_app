<template>
  <div>
    <TheNavbar />

    <RouterView />
    <TheCart />

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheCart from './components/TheCart.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<style scoped></style>
