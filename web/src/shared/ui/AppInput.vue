<script setup lang="ts">
const model = defineModel();
defineProps<{ placeholder?: string; type?: string }>();
</script>

<template>
  <input v-model="model" :type="type || 'text'" :placeholder="placeholder" />
</template>

<style scoped>
input {
  height: 30px;
}
</style>
