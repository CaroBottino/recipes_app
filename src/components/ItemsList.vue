<template>
  <div>
    <div v-if="store.getItems.length == 0" class="spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="cards">
      <div v-for="(item, i) in store.getItems" :key="i">
        <ItemCard :item="item" @showInfo="showInfoHandler" />
      </div>
    </div>

    <ItemInfo :item="infoItem.item" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemInfo from '@/components/ItemInfo.vue'
import type { Item } from '@/models/Item'
import { useItemsStore } from '@/stores/items'

const store = useItemsStore()
store.getItemsFromApi()
const infoItem = reactive({ item: {} })

const showInfoHandler = (item: Item) => {
  infoItem.item = item
}
</script>

<style scoped>
.icon-check {
  background-color: green;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80vw;
  margin: 4rem auto;
}
</style>
