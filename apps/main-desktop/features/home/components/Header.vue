<script setup lang="ts">
  import HeaderLinks from './HeaderLinks.vue';
  import HeaderAvatar from './HeaderAvatar.vue';
  import HeaderUserPopup from './HeaderUserPopup.vue';
  import { TransitionRoot } from '@headlessui/vue';
  import SearchForm from 'search-module/components/SearchForm.vue';
  import useSSO from 'common-module/composables/use-sso';
  import usePopover from 'common-module/composables/use-popover';

  const props = defineProps<{ light?: boolean }>();

  const headerRef = ref(null);
  const { bottom } = useElementBounding(headerRef);

  const isFixed = ref(false);
  const isSearchActive = ref(false);

  if (props.light) isFixed.value = true;
  else {
    watch(bottom, (value) => {
      if (value < 0 && !isFixed.value) {
        isFixed.value = true;
      } else if (value > 0 && isFixed.value) {
        if (isSearchActive.value) isSearchActive.value = false;
        isFixed.value = false;
      }
    });
  }

  const {
    triggerRef: popUpTrigger,
    targetRef: popUpTarget,
    top: popUpTop,
    left: popUpLeft,
    active: isPopUpActive,
    toggle: popUpToggle,
  } = usePopover();

  const config = useRuntimeConfig();
  const { cachedCustInfo, isLoggedIn } = await useSSO();

  const floatingHeader = ref();
  const { top } = useElementBounding(floatingHeader);
</script>

<template>
  <div
    v-if="!light"
    ref="headerRef"
    class="from-orange-inter-600 to-orange-inter-400 absolute inset-x-0 top-0 h-52 bg-gradient-to-r"
  />

  <div
    v-if="isSearchActive && isFixed"
    class="fixed inset-0 z-10 cursor-pointer bg-[#000] opacity-40"
    @click="isSearchActive = false"
  />

  <HeaderLinks :light="light" />
  <header ref="floatingHeader" :class="{ 'sticky top-0 z-30': light }">
    <!-- static header -->
    <div
      v-if="!light"
      class="relative mx-auto flex w-[calc(100vw-128px)] min-w-[975px] max-w-[1366px] items-center gap-5 py-4 text-white"
    >
      <a :href="config.public.homeUrl" class="mr-auto">
        <NuxtImg src="/logo-pegipegi-white.svg" alt="Pegipegi" height="36px" />
      </a>

      <a
        :href="`${config.public.homeUrl}/promo`"
        class="flex items-center gap-1"
        target="_blank"
        rel="noopener"
      >
        <NuxtImg
          src="/icon-header-promo.svg"
          height="20px"
          width="20px"
          role="presentation"
        />
        <span class="font-bold">Promo Spesial</span>
      </a>

      <a
        :href="`${config.public.homeUrl}/user/order-list`"
        class="flex items-center gap-1"
      >
        <NuxtImg
          src="/icon-header-bookings.svg"
          height="20px"
          width="20px"
          role="presentation"
        />
        <span class="font-bold">Cek Pesanan</span>
      </a>

      <div class="h-4 w-[1px] bg-white" />

      <button
        ref="popUpTrigger"
        class="flex items-center gap-1"
        v-if="isLoggedIn && !!cachedCustInfo"
        @click="popUpToggle"
      >
        <HeaderAvatar
          :name="cachedCustInfo.name"
          :picture="cachedCustInfo.displayPicture"
        />
        <p class="max-w-[100px] overflow-hidden text-ellipsis font-bold">
          {{ cachedCustInfo.firstName }}
        </p>
        <NuxtImg
          src="/icon-header-dropdown.svg"
          width="20px"
          height="20px"
          role="presentation"
        />
      </button>
      <a
        v-else
        :href="`${config.public.homeUrl}/user/login?redirect=${config.public.homeUrl}`"
        class="bg-neutral-tuna-0 text-orange-inter-600 rounded-3xl px-4 py-2 text-sm font-bold"
      >
        Masuk
      </a>
    </div>

    <!-- fixed header -->
    <nav
      v-if="isFixed"
      class="shadow-lifted fixed inset-x-0 top-0 z-30 h-[64px] items-center bg-white"
      :class="{ relative: light }"
    >
      <div
        class="mx-auto flex h-full w-[calc(100vw-128px)] min-w-[975px] max-w-[1366px] items-center gap-5"
      >
        <a :href="config.public.homeUrl" class="mr-auto">
          <NuxtImg
            class="mr-12"
            src="/logo-pegipegi-color.svg"
            alt="Pegipegi"
            height="36px"
          />
        </a>

        <button
          v-if="!isSearchActive"
          class="bg-neutral-tuna-25 text-neutral-tuna-300 mr-auto shrink shrink-0 grow rounded-md px-3 py-2 text-left"
          @click="isSearchActive = true"
        >
          <p class="overflow-hidden text-ellipsis whitespace-nowrap">
            Cari hotel, pesawat, kereta, bus &amp; travel
          </p>
        </button>

        <SearchForm
          v-if="isSearchActive"
          class="self-end"
          fixed
          :offset="top"
        />

        <a
          :href="`${config.public.homeUrl}/promo`"
          class="ml-auto flex items-center gap-1"
          target="_blank"
          rel="noopener"
        >
          <NuxtImg
            src="/icon-header-promo-color.svg"
            height="20px"
            width="20px"
            role="presentation"
          />
          <p
            class="text-orange-inter-600 overflow-hidden text-ellipsis whitespace-nowrap font-bold"
          >
            Promo Spesial
          </p>
        </a>

        <a
          :href="`${config.public.homeUrl}/user/order-list`"
          class="flex items-center gap-1"
        >
          <NuxtImg
            src="/icon-header-bookings-color.svg"
            height="20px"
            width="20px"
            role="presentation"
          />
          <p
            class="text-orange-inter-600 overflow-hidden text-ellipsis whitespace-nowrap font-bold"
          >
            Cek Pesanan
          </p>
        </a>

        <div class="h-4 w-[1px] bg-gray-300" />

        <div class="min-w-[64px]">
          <client-only>
            <a
              v-if="isLoggedIn && !!cachedCustInfo"
              :href="`${config.public.homeUrl}/user/`"
              class="flex items-center gap-1"
            >
              <HeaderAvatar
                :name="cachedCustInfo.name"
                :picture="cachedCustInfo.displayPicture"
              />
              <p
                class="text-orange-inter-600 max-w-[100px] overflow-hidden text-ellipsis font-bold"
              >
                {{ cachedCustInfo.firstName }}
              </p>
              <NuxtImg
                src="/icon-header-dropdown.svg"
                width="20px"
                height="20px"
                role="presentation"
              />
            </a>
            <a
              v-else
              :href="`${config.public.homeUrl}/user/login?redirect=${config.public.homeUrl}`"
              class="text-neutral-tuna-0 bg-orange-inter-600 rounded-3xl px-4 py-2 text-sm font-bold"
            >
              Masuk
            </a>
          </client-only>
        </div>
      </div>
    </nav>

    <TransitionRoot
      ref="popUpTarget"
      appear
      as="template"
      enter="transform transition duration-[400ms] origin-top"
      enter-from="opacity-0 scale-y-50"
      enter-to="opacity-100 scale-y-100"
      leave="transform duration-200 transition ease-in-out origin-top"
      leave-from="opacity-100 scale-y-100 "
      leave-to="opacity-0 scale-y-95 "
      :show="isPopUpActive"
    >
      <HeaderUserPopup
        :style="{
          top: `${popUpTop + 10}px`,
          left: `${popUpLeft - 140}px`,
        }"
        class="fixed left-0 top-0"
      />
    </TransitionRoot>
  </header>
</template>
