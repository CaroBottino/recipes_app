<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, j) in items" :key="item.id">
        <th scope="row">{{ j + 1 }}</th>
        <td v-for="(header, k) in headers" :key="k">
          <template v-if="header === 'img'">
            <img :src="item[header]" class="img-fluid rounded-start" alt="..." />
          </template>
          <template v-else>
            {{ item[header as keyof Recipe] }}
          </template>
        </td>
        <td v-if="actions">
          <button
            v-if="actions.includes('edit')"
            type="button"
            class="btn btn-primary"
            @click="editItem(item.id)"
          >
            <i class="bi bi-pencil"></i>
          </button>
          <button
            v-if="actions.includes('delete')"
            type="button"
            class="btn btn-primary"
            @click="deleteItem(item.id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Recipe } from '@/models/Recipe'

const emits = defineEmits(['editItem', 'deleteItem'])

defineProps({
  headers: {
    type: Array<string>,
    required: true
  },
  items: {
    type: Array<Recipe>,
    required: true
  },
  actions: {
    type: Array
  }
})

const editItem = (itemId: string) => {
  emits('editItem', itemId)
}

const deleteItem = (itemId: string) => {
  emits('deleteItem', itemId)
}
</script>

<style scoped>
button {
  padding: 5px;
  margin-left: 2px;
  margin-right: 2px;
}
</style>
