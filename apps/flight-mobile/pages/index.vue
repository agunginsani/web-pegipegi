<script lang="ts" setup>
  import SectionSearch from 'home-module/components/SectionSearch.vue'
  import useHomeStore from 'home-module/composables/use-home-store';

  const { fetch } = useHomeStore()
  await fetch()
</script>

<template>
  <header>
    header
  </header>
  
  <main class="bg-[#ffc09a] mb-auto flex-grow block">
    <SectionSearch/>
  </main>

  <footer>
    footer
  </footer>
</template>
