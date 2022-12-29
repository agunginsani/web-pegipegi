<script lang="ts" setup>
  type urlProps = {
    baseUrl: string;
  };

  const currLocation = ref('');
  const props = withDefaults(defineProps<urlProps>(), {
    baseUrl: 'https://www.pegipegi.com',
  });

  const footerMenus = ref([
    {
      title: 'FAQ',
      link: computed(
        () => `${props.baseUrl}/help?referrer=${currLocation.value}`
      ),
    },
    {
      title: 'Tentang Kami',
      link: `${props.baseUrl}/about-us`,
    },
    {
      title: 'Contact Us',
      link: computed(
        () => `${props.baseUrl}/help?referrer=${currLocation.value}`
      ),
    },
    {
      title: 'Karir',
      link: `${props.baseUrl}/career`,
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
  <footer class="bg-[#47495D]">
    <div class="mx-[64px]">
      <NuxtImg
        class="mx-auto mt-[24px] mb-[18px]"
        src="/icon-pegipegi-logo.svg"
        alt="icon"
      />
      <div class="flex flex-col gap-y-2">
        <div
          v-for="(menu, index) in footerMenus"
          :key="index"
          class="flex justify-between"
        >
          <p class="text-sm text-[#FFFFFF]">{{ menu.title }}</p>
          <a :href="`${menu.link}`"
            ><NuxtImg src="/icon-chevron-right.svg" alt="icon"
          /></a>
        </div>
      </div>
      <div class="mt-[26px] mb-[24px] text-center">
        <p class="text-sm font-bold text-[#FFFFFF]">Temukan Kami</p>
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
