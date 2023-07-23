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
            <div>
              <span
                v-for="(tag, i) in props.recipe.tags"
                :key="i"
                class="badge rounded-pill bg-primary tag"
              >
                {{ tag }}
              </span>
            </div>
            <div class="desc">
              <p>⏰ Tiempo: {{ props.recipe.time }} minutos</p>
              <p>🍽️ Porciones: {{ props.recipe.servings }}</p>
            </div>

            <div>
              <h6>Ingredientes</h6>
              <ul>
                <li v-for="(ingredient, i) in props.recipe.ingredients" :key="i">
                  {{ ingredient }}
                </li>
              </ul>
            </div>

            <p>🧁 Conseguí la receta completa por ${{ props.recipe.price }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">
              <i class="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Recipe } from '@/models/Recipe'

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true
  }
})
</script>

<style scoped>
img {
  width: 100%;
  max-height: 22rem;
}

.modal-header {
  padding: 0;
}

p {
  margin-bottom: 0;
  margin-top: 0;
}

.desc {
  margin: 10px;
}

.tag {
  margin: 3px;
}
</style>