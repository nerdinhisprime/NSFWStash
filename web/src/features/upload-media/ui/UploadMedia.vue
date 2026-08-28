<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { AppInput, AppButton, API_HOSTNAME } from '@/shared';
import { uploadMedia } from '@/entities/media';

const file = ref<File>();

const handleChange = (event: Event) => {
  const f = (event.target as HTMLInputElement).files?.[0];
  if (f) file.value = markRaw(f);
};

const handleUpload = async () => {
  try {
    const res = await uploadMedia(file);
    console.log('uploaded:', res.filename);
  } catch (err) {
    console.error(err);
  }
};
</script>
<template>
  <h2>upload files</h2>
  <form @submit.prevent="handleUpload">
    <AppInput type="file" placeholder="drag a file?" @change="handleChange" />
    <AppButton type="submit">upload</AppButton>
  </form>
</template>
