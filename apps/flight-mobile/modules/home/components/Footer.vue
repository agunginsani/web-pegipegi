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
  <footer class="bg-neutral-tuna-600 mt-auto">
    <div class="mx-16">
      <NuxtImg
        class="mx-auto mt-6"
        src="/icon-pegipegi-logo.svg"
        alt="icon"
        width="86px"
        height="16px"
      />

      <ul class="mt-[18px]">
        <li v-for="(menu, index) in footerMenus" :key="index" class="mb-2">
          <a
            class="flex justify-between"
            :href="`${menu.link}`"
            target="_blank"
          >
            <p class="text-sm text-white">{{ menu.title }}</p>
            <NuxtImg
              src="/icon-chevron-right.svg"
              alt="icon"
              width="24px"
              height="24px"
            />
          </a>
        </li>
      </ul>

      <div class="mt-[18px] mb-6 text-center">
        <p class="text-sm font-bold text-white">Temukan Kami</p>
        <ul class="mt-2 flex justify-center gap-x-[18px]">
          <li>
            <a href="https://www.facebook.com/Pegipegi/" target="_blank"
              ><NuxtImg
                src="/icon-facebook.svg"
                alt="icon"
                width="24px"
                height="24px"
            /></a>
          </li>
          <li>
            <a href="https://www.instagram.com/pegipegi/" target="_blank"
              ><NuxtImg
                src="/icon-instagram.svg"
                alt="icon"
                width="24px"
                height="24px"
            /></a>
          </li>
          <li>
            <a href="https://twitter.com/pegipegi" target="_blank"
              ><NuxtImg
                src="/icon-twitter.svg"
                alt="icon"
                width="24px"
                height="24px"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
