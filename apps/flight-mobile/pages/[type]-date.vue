<script lang="ts" setup>
  import Calendar from 'home-module/components/Calendar.vue';

  // TODO: validate route params
  definePageMeta({
    middleware(to, from) {
      if (['/departure-date', '/return-date'].includes(from.path))
        to.meta.pageTransition = false;
    },
  });
</script>

<template>
  <Calendar :is-return="$route.params.type === 'return'" />
</template>
