<script lang="ts" setup>
  const currLocation = ref<string>('');
  const baseUrl = useRuntimeConfig().public.homeUrl;

  const footerMenus = computed(() => [
    {
      title: 'FAQ',
      link: `${baseUrl}/help?referrer=${currLocation.value}`,
    },
    {
      title: 'Tentang Kami',
      link: `${baseUrl}/about-us`,
    },
    {
      title: 'Contact Us',
      link: `${baseUrl}/help?referrer=${currLocation.value}`,
    },
    {
      title: 'Karir',
      link: `${baseUrl}/career`,
    },
    {
      title: 'Register Hotel',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdD9VZDdHXLB_n9YlztH05rVHkbTtKaLNX3V6Kdk-vKjapzHQ/viewform',
    },
    {
      title: 'Mitra Login',
      link: 'https://wwws.pegipegi.com/extranet',
    },
  ]);

  onMounted(() => {
    currLocation.value = window.location.href;
  });
</script>

<template>
  <footer class="bg-neutral-tuna-600">
    <div class="mx-16">
      <NuxtImg
        class="mx-auto mt-6 mb-[18px]"
        src="/icon-pegipegi-logo.svg"
        alt="icon"
      />
      <div class="flex flex-col gap-y-2">
        <div
          v-for="(menu, index) in footerMenus"
          :key="index"
          class="flex justify-between"
        >
          <p class="text-sm text-white">{{ menu.title }}</p>
          <a :href="`${menu.link}`"
            ><NuxtImg src="/icon-chevron-right.svg" alt="icon"
          /></a>
        </div>
      </div>
      <div class="mt-[26px] mb-6 text-center">
        <p class="text-sm font-bold text-white">Temukan Kami</p>
        <div class="mt-2 flex justify-center gap-x-[18px]">
          <a href="https://www.facebook.com/Pegipegi/"
            ><NuxtImg src="/icon-facebook.svg" alt="icon"
          /></a>
          <a href="https://www.instagram.com/pegipegi/"
            ><NuxtImg src="/icon-instagram.svg" alt="icon"
          /></a>
          <a href="https://twitter.com/pegipegi"
            ><NuxtImg src="/icon-twitter.svg" alt="icon"
          /></a>
        </div>
      </div>
    </div>
  </footer>
</template>
