<script lang="ts" setup>
import { Button, Rating, Input } from '@pegipegi/pegipegi-web-ui';
const rating = ref(0);
const input = ref('');
</script>

<template>
  <div class="">
    <Button>Hello</Button>
    <Rating v-model="rating" />
    <Input v-model="input" />
  </div>
</template>
