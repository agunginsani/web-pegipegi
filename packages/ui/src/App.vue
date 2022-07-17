<script lang="ts" setup>
import Button from './components/Button/Button.vue';
</script>

<template>
  <div>
    <Button>Hello World</Button>
    <Button variant="outline">Hello World</Button>
    <Button variant="text">Hello World</Button>
  </div>
  <div>
    <Button size="sm" disabled>Hello World</Button>
    <Button variant="outline" size="lg" disabled>Hello World</Button>
    <Button variant="text" disabled>Hello World</Button>
  </div>
</template>
