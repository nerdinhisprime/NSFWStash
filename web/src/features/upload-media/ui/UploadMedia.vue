<script setup lang="ts">
import { AppInput, AppButton, API_HOSTNAME } from '@/shared';
import { ref, markRaw } from 'vue';

const file = ref<File>();

const handleChange = (event: Event) => {
  const f = (event.target as HTMLInputElement).files?.[0];
  if (f) file.value = markRaw(f);
};

const upload = async () => {
  if (!file.value) return;
  const res = await fetch(`${API_HOSTNAME}/upload/${encodeURIComponent(file.value.name)}`, {
    method: 'PUT',
    body: file.value,
  });
  if (!res.ok) throw new Error(`upload failed: ${res.status}`);
  console.log('uploaded:', file.value.name);
};
</script>
<template>
  <h2>upload files</h2>
  <form @submit.prevent="upload">
    <AppInput type="file" placeholder="drag a file?" @change="handleChange" />
    <AppButton type="submit">upload</AppButton>
  </form>
</template>
