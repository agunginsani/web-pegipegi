<script lang="ts" setup>
  import SeoModal from 'common-module/components/SeoModal.vue';
  import type { HotelIndex } from 'api/hotel/index-list.get';
  import {
    popularDestination,
    pegipegiPartner,
    products,
  } from 'common-module/enums/seo-backlink';
  import footerContent from 'common-module/enums/footer-content';
  import usePopover from 'common-module/composables/use-popover';

  interface FooterLink {
    text: string;
    url?: string;
    target?: string;
    image?: string;
  }

  interface FooterContent {
    header: string;
    class?: string;
    links?: Array<FooterLink>;
  }

  const contents: Array<FooterContent> = footerContent;

  const year = computed(() => new Date().getFullYear());

  const isShowPopularDestination = ref(false);
  const isShowPegipegiPartner = ref(false);

  const { data: hotelIndexList } = await useFetch<Array<HotelIndex>>(
    '/api/hotel/index-list'
  );

  const {
    triggerRef: productButtonRef,
    targetRef: productRef,
    active: isShowProducts,
    toggle: productToggle,
  } = usePopover();
</script>

<template>
  <div class="relative flex justify-center">
    <footer class="bg-neutral-tuna-0 border-orange-inter-600 w-full border-t-8">
      <div class="mx-auto w-[calc(100vw-128px)] min-w-[975px] max-w-[1366px]">
        <div class="flex items-start justify-start justify-between gap-8 py-8">
          <div class="min-w-[279px]">
            <NuxtImg src="/icon-logo.svg" alt="Pegipegi" />
            <h2 class="text-neutral-tuna-800 mb-3 mt-6 text-sm font-bold">
              Download Aplikasi
            </h2>
            <div class="flex gap-2">
              <a
                target="_blank"
                rel="noopener"
                href="https://play.google.com/store/apps/details?id=com.pegipegi.android&referrer=af_tranid%3DRDPVcAKIh_dU_5n1CEkJ1g%26pid%3Dinternal%26c%3Dsp_main_homepage%26utm_source%3Dinternal%26utm_campaign%3Dsp_main_homepage"
              >
                <NuxtImg src="/figure-google-play.webp" alt="Google Play" />
              </a>
              <a
                target="_blank"
                rel="noopener"
                href="https://apps.apple.com/ID/app/id1054846518?mt=8"
              >
                <NuxtImg src="/figure-app-store.webp" alt="App Store" />
              </a>
            </div>
          </div>
          <div
            v-for="(content, index) in contents"
            :key="content.header"
            class="flex min-w-[140px] flex-col"
            :class="{ 'w-[272px]': index === 2, 'w-[164px]': index === 3 }"
          >
            <h2 class="text-neutral-tuna-800 mb-3 text-sm font-bold">
              {{ content.header }}
            </h2>
            <ul
              v-bind="{ class: content.class }"
              class="text-neutral-tuna-800 flex gap-3 text-sm"
            >
              <li
                v-for="link in content.links"
                :key="link.text"
                class="hover:text-orange-inter-600"
              >
                <a v-if="link.url" :href="link.url" :target="link.target">
                  <NuxtImg
                    v-if="link.image"
                    :src="link.image"
                    :alt="link.text"
                  />
                  <p v-else>{{ link.text }}</p>
                </a>
                <NuxtImg
                  v-else-if="link.image"
                  :src="link.image"
                  :alt="link.text"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-neutral-tuna-50 text-neutral-tuna-800 py-2 text-sm">
        <div
          class="mx-auto flex w-[calc(100vw-128px)] min-w-[975px] max-w-[1366px] items-center justify-between"
        >
          <div class="flex items-center gap-5">
            <button
              class="hover:text-orange-inter-600"
              @click="isShowPopularDestination = true"
            >
              Destinasi Populer
            </button>
            <button
              class="hover:text-orange-inter-600"
              @click="isShowPegipegiPartner = true"
            >
              Partner Pegipegi
            </button>
            <button
              ref="productButtonRef"
              @click="productToggle"
              class="hover:text-orange-inter-600"
            >
              Produk
            </button>
          </div>
          <div class="flex items-center gap-5">
            <p>
              {{ `© ${year} All Rights Reserved | PT Go Online Destinations` }}
            </p>
          </div>
        </div>
      </div>
    </footer>

    <div
      v-show="isShowProducts"
      ref="productRef"
      class="shadow-floating absolute bottom-14 flex w-max gap-6 rounded-2xl bg-white p-2"
    >
      <a
        v-for="product in products"
        :key="product.title"
        :href="product.url"
        class="hover:bg-neutral-tuna-25 after:border-neutral-tuna-200 relative flex flex-row items-center justify-center gap-2 px-5 py-3 outline-none after:absolute after:-right-3 after:h-1/4 after:w-1/2 after:border-r last:after:hidden"
      >
        <NuxtImg :src="product.icon" alt="Close" />
        <div>
          <h3 class="text-neutral-tuna-800 text-base font-bold">
            {{ product.title }}
          </h3>
          <p class="text-neutral-tuna-300 text-xs">{{ product.description }}</p>
        </div>
      </a>
    </div>

    <SeoModal
      title="Destinasi Popular"
      @close="isShowPopularDestination = false"
      :show="isShowPopularDestination"
      :categories="popularDestination"
      :index-list="hotelIndexList"
    />

    <SeoModal
      title="Partner Pegipegi"
      @close="isShowPegipegiPartner = false"
      :show="isShowPegipegiPartner"
      :categories="pegipegiPartner"
    />
  </div>
</template>
