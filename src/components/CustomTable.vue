<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th v-for="(header, i) in headers" :key="i" data-test="table-header">{{ header }}</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, j) in items" :key="item.id">
        <th scope="row">{{ j + 1 }}</th>
        <td v-for="(header, k) in headers" :key="k">
          <template v-if="header === 'img'">
            <img
              :src="(item[header as keyof Recipe] as string)"
              class="img-fluid rounded-start"
              alt="..."
              data-test="item-img"
            />
          </template>
          <template v-else-if="header === 'tags'">
            <span
              v-for="(tag, i) in item[header as keyof Recipe]"
              :key="i"
              class="badge rounded-pill bg-primary tag"
              data-test="item-tag"
            >
              {{ tag }}
            </span>
          </template>
          <template v-else>
            {{ item[header as keyof Recipe] }}
          </template>
        </td>
        <td v-if="actions">
          <button
            v-if="actions.includes('view')"
            type="button"
            class="btn btn-primary"
            @click="viewItem(item.id)"
            data-bs-toggle="modal"
            data-bs-target="#infoRecipe"
            data-test="item-action-view"
          >
            <i class="bi bi-search-heart"></i>
          </button>
          <button
            v-if="actions.includes('edit')"
            type="button"
            class="btn btn-primary"
            @click="editItem(item.id)"
            data-test="item-action-edit"
          >
            <i class="bi bi-pencil"></i>
          </button>
          <button
            v-if="actions.includes('delete')"
            type="button"
            class="btn btn-primary"
            @click="deleteItem(item.id)"
            data-test="item-action-delete"
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

const emits = defineEmits(['editItem', 'deleteItem', 'viewItem'])

defineProps<{
  headers: String[]
  items: Recipe[]
  actions: String[]
}>()

const editItem = (itemId: string) => {
  emits('editItem', itemId)
}

const deleteItem = (itemId: string) => {
  emits('deleteItem', itemId)
}

const viewItem = (itemId: string) => {
  emits('viewItem', itemId)
}
</script>

<style scoped>
button {
  padding: 5px;
  margin-left: 2px;
  margin-right: 2px;
}

img {
  max-height: 6rem;
}
</style>
