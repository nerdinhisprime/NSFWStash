<script setup lang="ts">
import { updateUserData } from '@/entities/user';
import { AppButton, AppInput, AppDialog } from '@/shared';

import { ref } from 'vue';

const modalRef = ref<InstanceType<typeof AppDialog> | null>(null);

const newUserName = ref<string>('');
const newPassword = ref<string>('');
const currentUsername = ref<string>('');
const currentPassword = ref<string>('');

const handleOpenModal = () => {
  if (newUserName.value?.trim() !== '' || newPassword.value?.trim() !== '') {
    modalRef.value?.open();
  }
};

const handleUpdate = async () => {
  const data = await updateUserData(
    newUserName.value,
    currentUsername.value,
    newPassword.value,
    currentPassword.value,
  );
  console.log(data);
};
</script>

<template>
  <form @submit.prevent="handleUpdate">
    <h2>update user data</h2>
    <AppInput v-model="newUserName" placeholder="new user name" />
    <AppInput v-model="newPassword" placeholder="new password" />
    <AppButton @click="handleOpenModal">submit</AppButton>
    <AppDialog ref="modalRef">
      <div class="update-modal">
        <AppInput v-model="currentUsername" placeholder="current user name" />
        <AppInput v-model="currentPassword" placeholder="current password" />
        <AppButton type="submit">confirm</AppButton>
      </div>
    </AppDialog>
  </form>
</template>

<style scoped>
.update-modal {
  background-color: grey;
}
</style>
