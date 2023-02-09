<script lang="ts" setup>
  import { Button } from '@pegipegi/web-pegipegi-ui';
  const props = defineProps({
    error: Object,
  });

  const isNotFound = computed(() => String(props.error?.statusCode) === '404');

  const home = `${useRuntimeConfig().public.homeUrl}/flight`;

  const content = computed(() => {
    if (isNotFound.value) {
      return {
        title: 'Sepertinya kamu tersesat',
        description: 'Coba puter balik dulu ke halaman sebelumnya ya',
        img: '/figure-not-found.svg',
        action: 'Oke, puter balik',
      };
    }
    return {
      title: 'Maaf ada sedikit gangguan',
      description: 'Cek koneksi internetmu dan coba lagi ya',
      img: '/figure-error.svg',
      action: 'Muat ulang',
    };
  });
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center p-5 text-center"
  >
    <NuxtImg :src="content.img" width="250" height="250" class="mb-5" />
    <h1 class="mb-1 text-lg font-bold">
      {{ content.title }}
    </h1>
    <p class="mb-5">
      {{ content.description }}
    </p>
    <a :href="home">
      <Button>
        {{ content.action }}
      </Button>
    </a>
  </div>
</template>
