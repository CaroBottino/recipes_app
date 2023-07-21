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
              <img rounded="top" :src="props.item.img" />
            </div>
          </div>
          <div class="modal-body">
            <h3>{{ props.item.name }}</h3>
            <p class="my-4">$ {{ props.item.price }}</p>
            <p>{{ props.item.desc }}</p>
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
import { ref } from 'vue'
import type { Item } from '@/models/Item'

const props = defineProps<{
  item: {
    type: Item
    required: true
  }
}>()

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
