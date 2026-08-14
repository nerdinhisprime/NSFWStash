<script setup lang="ts">
import { deleteUser } from '@/entities/user';
import { AppInput, AppButton, AppDialog } from '@/shared';
import { ref } from 'vue';

const modalRef = ref<InstanceType<typeof AppDialog> | null>(null);
const username = ref<string>('');
const password = ref<string>('');

const handleOpenModal = () => {
  if (username.value.trim() !== '' && username.value) modalRef.value?.open();
};
const handleDelete = async () => {
  const res = await deleteUser(username.value, password.value);
  console.log(res);
};
</script>

<template>
  <form @submit.prevent="handleDelete">
    <h2>delete user</h2>
    <AppInput
      v-model="username"
      name="username"
      autocomplete="username"
      placeholder="user name"
    />
    <AppButton @click="handleOpenModal">submit</AppButton>
    <AppDialog ref="modalRef">
      <div class="confirm-menu">
        <p>before deleting accounts, you have to confirm the password</p>
        <AppInput
          v-model="password"
          name="password"
          autocomplete="current-password"
          placeholder="password"
        />
        <AppButton type="submit">confirm</AppButton>
      </div>
    </AppDialog>
  </form>
</template>

<style scoped>
.confirm-menu {
  background-color: gray;
}
</style>
