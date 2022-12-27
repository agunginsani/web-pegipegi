<script lang="ts" setup>
  const config = useRuntimeConfig();
  const url = config.public.homeUrl || "https://pegipegi.com";

  const body = ref<Element | null>(null);
  const isTop = ref(true);

  // TODO: set evet type
  function onScroll(event: any) {
    if (event.target.scrollTop <= 0 && !isTop.value) {
      isTop.value = true;
    } else if (isTop.value) {
      isTop.value = false;
    }
  }

  onMounted(() => {
    body.value = document.querySelector("#body");
    body.value?.addEventListener("scroll", onScroll);
  });

  onBeforeUnmount(() => {
    body.value?.removeEventListener("scroll", onScroll);
  });
</script>

<template>
  <header
    class="sticky z-10 left-0 right-0 top-0 flex items-center h-12 transition-all"
    :class="isTop ? 'bg-transparent' : 'bg-white'"
  >
    <a
      :href="url"
      class="w-12 h-12 flex items-center justify-center"
      aria-label="Back to Pegipegi.com homepage"
    >
      <NuxtImg class="block w-5 h-5" src="/icon-back.svg" alt="Back" />
    </a>
    <h1 class="font-bold text-neutral-tuna-800">Cari Tiket Pesawat</h1>
  </header>
</template>
