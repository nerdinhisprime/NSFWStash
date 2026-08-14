<script setup lang="ts">
import { AppInput, AppButton } from '@/shared';
import { createUser } from '@/entities/user';
import { ref } from 'vue';

const username = ref<string>('');
const password = ref<string>('');

const fn = async () => {
  try {
    const data = await createUser(username.value, password.value);
    console.log(data);
  } catch {
    console.error;
  }
};
</script>

<template>
  <h2>create user</h2>
  <form @submit.prevent="fn">
    <AppInput
      v-model="username"
      type="text"
      name="username"
      autocomplete="username"
      placeholder="user name"
    />
    <AppInput
      v-model="password"
      type="password"
      name="password"
      autocomplete="current-password"
      placeholder="password"
    />
    <AppButton type="submit">submit</AppButton>
  </form>
</template>
