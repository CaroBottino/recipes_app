<template>
  <div>
    <div
      class="modal fade"
      id="infoRecipe"
      tabindex="-1"
      aria-labelledby="infoRecipeLabel"
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

            <div v-if="userCanSee(props.recipe.id)">
              <div>
                <h6>Ingredientes</h6>
                <ul>
                  <li v-for="(ingredient, i) in props.recipe.ingredients" :key="i">
                    {{ ingredient }}
                  </li>
                </ul>
              </div>

              <h6>Pasos a seguir...</h6>
              <ol>
                <li v-for="(step, i) in props.recipe.steps" :key="i">
                  {{ step }}
                </li>
              </ol>
            </div>
            <div v-else>
              <div>
                <h6>Ingredientes</h6>
                <ul class="blur">
                  <li v-for="(ingredient, i) in props.recipe.ingredients" :key="i">
                    {{ ingredient }}
                  </li>
                </ul>
              </div>

              <p>🧁 Conseguí la receta completa por ${{ props.recipe.price }}</p>
            </div>
          </div>
          <div v-if="!userCanSee(props.recipe.id)" class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="offcanvas"
              data-bs-target="#cart"
              aria-controls="cart"
              @click="addItemToCart(props.recipe)"
            >
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
import type { CartItem } from '@/models/CartItem'
import { useUserStore } from '@/stores/user'
import { useRecipesStore } from '@/stores/recipes'
import { Modal } from 'bootstrap'

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true
  }
})

const userStore = useUserStore()
const recipesStore = useRecipesStore()

const userCanSee = (recipeId: string): boolean => {
  const r = recipesStore.getRecipeById(recipeId)

  // it's his recipe
  if (r?.user === userStore.getUser.id) {
    return true
  }

  // he bought it
  if (userStore.getRecipesBought.find((r) => r.id === recipeId)) {
    return true
  }

  return false
}

const addItemToCart = (recipe: Recipe) => {
  const recipeToCart: CartItem = {
    id: recipe.id,
    name: recipe.name,
    img: recipe.img,
    price: recipe.price,
    user: recipe.user
  }

  userStore.addItemToCart(recipeToCart)

  Modal.getInstance('#infoRecipe')?.hide()
}
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

.blur {
  -webkit-mask-image: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, #fff 100%);
}
</style>
