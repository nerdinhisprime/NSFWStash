<script setup lang="ts">
import { GetUserData } from '@/features/get-user-data';
import { CreateUser } from '@/features/create-user';
import { DeleteUser } from '@/features/delete-user';
import { UpdateUserData } from '@/features/update-user-data';
</script>

<template>
  <GetUserData />
  <CreateUser />
  <DeleteUser />
  <UpdateUserData />
</template>
