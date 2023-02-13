<script lang="ts" setup>
  const backUrl = useRuntimeConfig().public.homeUrl || 'https://pegipegi.com';

  const body = ref<HTMLElement | null>(null);
  const { arrivedState } = useScroll(body, {
    offset: { top: 150 },
  });
  onMounted(() => {
    body.value = document.querySelector('#homepage');
  });
</script>

<template>
  <header
    class="sticky left-0 right-0 top-0 z-30 flex h-12 items-center transition-all"
    :class="
      arrivedState.top
        ? 'bg-gradient-to-b from-[#ffdc8e] to-transparent'
        : 'shadow-raised bg-white'
    "
  >
    <a
      :href="backUrl"
      class="flex h-12 w-12 items-center justify-center"
      aria-label="Back to Pegipegi.com homepage"
    >
      <NuxtImg
        class="block"
        width="20"
        height="20"
        src="/icon-back.svg"
        alt="Back"
        role="presentation"
      />
    </a>
    <h1 class="text-neutral-tuna-800 font-bold">Cari Tiket Pesawat</h1>
  </header>
</template>
