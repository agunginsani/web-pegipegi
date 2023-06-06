<script lang="ts" setup>
  import useSSO from 'common-module/composables/use-sso';

  type UserLinks = {
    url: string;
    label: string;
    icon: string;
    extraInfo?: string;
  };

  const config = useRuntimeConfig();
  const { userPepepoin } = useSSO();
  const links = computed<Array<UserLinks>>(() => {
    return [
      {
        url: `${config.public.homeUrl}/user/change-profile`,
        label: 'Pengaturan Akun',
        icon: '/icon-user-profile.svg',
      },
      {
        url: `${config.public.homeUrl}/user/order-list`,
        label: 'Cek Pesanan',
        icon: '/icon-user-orders.svg',
      },
      {
        url: `${config.public.homeUrl}/user/pepepoin-history`,
        label: 'Pepepoint',
        icon: '/icon-user-pepepoin.svg',
        extraInfo: userPepepoin.value
          ? `${userPepepoin.value.data.point} Poin`
          : undefined,
      },
      {
        url: `${config.public.homeUrl}/help`,
        label: 'Pusat Bantuan',
        icon: '/icon-user-help.svg',
      },
      {
        url: `${config.public.homeUrl}/user/logout?redirect=${config.public.homeUrl}`,
        label: 'Logout',
        icon: '/icon-user-logout.svg',
      },
    ];
  });
</script>

<template>
  <div
    class="shadow-raised bg-neutral-tuna-0 z-10 min-w-[280px] rounded-xl py-2"
  >
    <a
      :href="link.url"
      class="flex gap-2 px-3 py-2"
      v-for="(link, index) in links"
      :key="`header-link-${index}`"
    >
      <NuxtImg
        class="shrink-0"
        :src="link.icon"
        width="24"
        height="24"
        role="presentation"
      />
      <p class="grow">{{ link.label }}</p>
      <strong v-if="link.extraInfo" class="shrink-0"
        >{{ link.extraInfo }}
      </strong>
      <NuxtImg
        class="shrink-0"
        src="/icon-chevron.svg"
        width="24"
        height="24"
        role="presentation"
      />
    </a>
  </div>
</template>
