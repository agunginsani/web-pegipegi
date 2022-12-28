<script lang="ts" setup>
  const config = useRuntimeConfig();
  const url = config.public.homeUrl || 'https://pegipegi.com';

  const body = ref<Element | null>(null);
  const isTop = ref(true);

  function onScroll(event: Event) {
    if ((event.target as Element).scrollTop <= 0 && !isTop.value) {
      isTop.value = true;
    } else if (isTop.value) {
      isTop.value = false;
    }
  }

  onMounted(() => {
    body.value = document.querySelector('#body');
    body.value?.addEventListener('scroll', onScroll);
  });

  onBeforeUnmount(() => {
    body.value?.removeEventListener('scroll', onScroll);
  });
</script>

<template>
  <header
    class="sticky left-0 right-0 top-0 z-10 flex h-12 items-center transition-all"
    :class="isTop ? 'bg-transparent' : 'bg-white'"
  >
    <a
      :href="url"
      class="flex h-12 w-12 items-center justify-center"
      aria-label="Back to Pegipegi.com homepage"
    >
      <NuxtImg class="block h-5 w-5" src="/icon-back.svg" alt="Back" />
    </a>
    <h1 class="text-neutral-tuna-800 font-bold">Cari Tiket Pesawat</h1>
  </header>
</template>
