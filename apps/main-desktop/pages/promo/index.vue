<script lang="ts" setup>
  import Header from 'home-module/components/Header.vue';
  import Footer from 'common-module/components/Footer.vue';
  import ChipTab from 'common-module/components/ChipTab.vue';
  import CardPromo from 'promo-module/components/CardPromo.vue';
  import Snackbar from 'common-module/components/Snackbar.vue';
  import useSSO from 'common-module/composables/use-sso';
  import forceDesktopUrl from 'promo-module/utils/force-desktop-url';
  import type { BannerList, BannerRequestParams } from 'api/promo.get';
  import type { TagList } from 'api/promo-tag.get';

  const config = useRuntimeConfig();

  const activeTag = ref<string>('');
  const tagKey = 'promo-tag';
  const { data: cachedTag } = useNuxtData<TagList>(tagKey);
  const { data: tagData, pending: tagPending } = await useLazyFetch(
    '/api/promo-tag',
    {
      key: tagKey,
      default: () => cachedTag.value,
      onResponse({ response }) {
        if (!response._data?.length) return;
        const res = response._data as unknown as TagList;
        activeTag.value = res[0].id ? res[0].id.toString() : '';
      },
    }
  );
  const tagOptions = computed<Array<{ label: string; value: string }>>(() => {
    if (!tagData.value) return [];
    return tagData.value?.map((val) => ({
      label: val.name,
      value: val.id ? val.id.toString() : '',
    }));
  });

  const key = 'promo';
  const { data: cached } = useNuxtData<BannerList>(key);
  const { custInfo, deviceId, isLoggedIn } = useSSO();
  const promoParams = computed(() => {
    const params: BannerRequestParams = {
      device_id: deviceId.value,
      device_origin: 'web',
    };
    if (isLoggedIn.value) {
      params.email = custInfo.value.userEmail;
      params.member_id = custInfo.value.userId;
    }
    if (activeTag.value) params.tag = activeTag.value;
    return params;
  });
  const { data, pending } = await useLazyFetch('/api/promo-all', {
    key,
    default: () => cached.value,
    params: promoParams,
  });

  function getDuration(str: string): string {
    if (!/promo:/i.test(str)) return '';
    return str.split(/promo:/i)[1];
  }
</script>

<template>
  <div class="w-full">
    <Header light />
    <main
      class="mx-auto mt-6 grid w-[calc(100vw-128px)] min-w-[975px] max-w-[1366px] gap-8 pb-6"
    >
      <h1 class="text-4xl font-bold">Promo Pegipegi</h1>
      <NuxtImg
        class="w-full rounded-xl"
        alt="Pasti ada harga termurah"
        src="/figure-long-banner-v2.webp"
      />
      <ChipTab
        :options="tagOptions"
        v-model="activeTag"
        class="mx-auto"
        compact
      />
      <template v-if="!pending && !tagPending">
        <div
          v-if="!data?.length"
          class="h-[324px] w-full pt-[100px] text-center"
        >
          <strong class="mb-1 text-[21px]"> Yah, promo udah abis 🙏 </strong>
          <p class="mb-3">
            Coba cek promo lainnya, atau balik ke sini lagi besok yaa.
          </p>
        </div>
        <div v-else class="grid grid-cols-4 gap-5">
          <a :href="forceDesktopUrl(item.url)" v-for="item in data">
            <CardPromo
              class="h-full"
              :description="item.name"
              :image="item.image"
              :duration="getDuration(item.description)"
            />
          </a>
        </div>
      </template>
      <template v-else>
        <div class="grid grid-cols-4 gap-5">
          <CardPromo v-for="i in 16" loading />
        </div>
      </template>
    </main>
    <Footer />
    <Snackbar />
  </div>
</template>
