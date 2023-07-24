<template>
  <div class="centered">
    <img :src="robot" alt="..." class="robot" />
    <h1>NOT FOUND</h1>
  </div>
</template>

<script setup lang="ts">
const robot = './src/assets/img/eva2.webp'
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  vertical-align: baseline;
}

.robot {
  max-height: 16rem;
  max-width: 16rem;
}
</style>
