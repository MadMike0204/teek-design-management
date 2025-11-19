<script setup lang="ts">
import { useTestStore } from "@pinia/stores/test/test";

const testStore = useTestStore();
</script>

<template>
  <div>
    <p>增量：{{ testStore.amount }}</p>
    <button @click="testStore.addAmount()">增量++</button>
  </div>
</template>

<style scoped lang="scss"></style>
