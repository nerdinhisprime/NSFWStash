<script setup lang="ts">
import { AppInput, AppButton } from '@/shared';
import { getUserData } from '@/entities/user';
import { ref } from 'vue';

const id = ref<number | null>(null);
const fn = async () => {
  if (id.value === null) return;
  try {
    const data = await getUserData(id.value);
    console.log(data);
  } catch {
    console.error;
  }
};
</script>

<template>
  <h2>get users data</h2>
  <form @submit.prevent="fn">
    <AppInput v-model="id" type="text" placeholder="user id" />
    <AppButton type="submit">submit</AppButton>
  </form>
</template>
