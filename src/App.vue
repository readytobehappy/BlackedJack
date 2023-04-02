<template>
  <RouterView/>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { provideStore } from '@/store/store.provider';
provideStore();
</script>
