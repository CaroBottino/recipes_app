<template>
  <div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="w-100">
              <img rounded="top" :src="props.recipe.img" />
            </div>
          </div>
          <div class="modal-body">
            <h3>{{ props.recipe.name }}</h3>
            <p class="my-4">$ {{ props.recipe.price }}</p>
            <p>Tiempo: {{ props.recipe.time }} minutos</p>

            <div>
              <h6>Ingredientes</h6>
              <ul>
                <li v-for="(step, i) in props.recipe.steps" :key="i">
                  {{ step }}
                </li>
              </ul>
            </div>
      
            <p>tené la receta completa por ${{ props.recipe.price }}</p>
          </div>
          <div class="modal-footer">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary">-</button>
              <button type="button" class="btn btn-primary" disabled>{{ quantity }}</button>
              <button type="button" class="btn btn-primary">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Recipe } from '@/models/Recipe'

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true
  }
})

const quantity = ref(1)
</script>

<style scoped>
img {
  width: 100%;
  max-height: 22rem;
}

.modal-header {
  padding: 0;
}
</style>
@/models/Recipes
