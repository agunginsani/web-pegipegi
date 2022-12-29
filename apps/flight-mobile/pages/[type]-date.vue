<script lang="ts" setup>
  import { Button } from '@pegipegi/web-pegipegi-ui';
  import CalendarItem from 'home-module/components/CalendarItem.vue';

  // TODO: validate route params
  definePageMeta({
    middleware(to, from) {
      if (['/departure-date', '/return-date'].includes(from.path))
        to.meta.pageTransition = false;
    },
  });

  const router = useRouter();
  const route = useRoute();
  const isReturn = computed(() => route.params.type === 'return');
  function onBack() {
    // TODO: check history stack first
    router.go(-1);
  }

  function onClearReturn() {
    // TODO; integration
    router.replace('/departure-date');
  }

  function onPick(event: Date) {
    console.log(event);
  }
</script>

<template>
  <div class="bg-[#fffbe7]">
    <header class="sticky inset-x-0 top-0 flex flex-col rounded-b-2xl bg-white">
      <div class="flex">
        <button
          class="flex h-12 w-12 items-center justify-center"
          @click="onBack"
        >
          <NuxtImg class="h-5 w-5" src="/icon-back.svg" alt="Back" />
        </button>
        <div class="flex flex-col justify-center">
          <h1 class="font-bold">
            <span>Jakarta</span>
            <NuxtImg
              class="mx-1 inline-block h-4 w-4"
              :src="
                isReturn
                  ? '/icon-arrow-roundtrip.svg'
                  : '/icon-arrow-oneway.svg'
              "
              alt="To"
            />
            <span>Bali / Denpasar</span>
          </h1>
          <p class="text-neutral-tuna-300 text-xs">Ekonomi</p>
        </div>
      </div>
      <ul class="flex w-full justify-between py-3 px-4">
        <li
          v-for="(day, index) in [
            'Sen',
            'Sel',
            'Rab',
            'Kam',
            'Jum',
            'Sab',
            'Min',
          ]"
          class="w-9 text-center"
          :class="index >= 5 ? 'text-red-flower-700' : ''"
        >
          {{ day }}
        </li>
      </ul>
    </header>

    <main>
      <ul>
        <!-- TODO: scroll to selected date on mounted -->
        <CalendarItem v-for="i in 6" @pick="onPick" />
      </ul>
    </main>

    <footer class="sticky inset-x-0 bottom-0">
      <div class="bg-neutral-tuna-50 rounded-t-2xl py-2 px-4 text-sm">
        <p>
          <NuxtImg
            class="mr-2 inline-block h-5 w-5"
            src="/icon-info-round.svg"
            alt="Info"
          />
          Harga yang ditampilkan adalah yang termurah
        </p>
      </div>

      <div class="bg-white p-4">
        <div class="mb-2 flex justify-between">
          <div>
            <p class="text-neutral-tuna-300 text-sm">Pergi</p>
            <NuxtLink class="font-bold" to="/departure-date" replace
              >9 Jun 2022</NuxtLink
            >
          </div>

          <div class="text-right" v-if="!isReturn">
            <p class="text-neutral-tuna-300 text-sm">Untuk lebih murah</p>
            <NuxtLink
              class="text-orange-inter-600 font-bold"
              to="/return-date"
              replace
              >Pilih Pulang Juga</NuxtLink
            >
          </div>

          <div class="text-right" v-else>
            <p class="text-neutral-tuna-300 text-sm">
              <span>Pulang</span>
              <button class="ml-1" @click="onClearReturn">
                <NuxtImg
                  class="h-3 w-3 align-middle"
                  src="/icon-close-round.svg"
                  alt="Clear"
                />
              </button>
            </p>
            <p class="font-bold">Pilih Tanggal</p>
          </div>
        </div>

        <Button block @click="onBack">Simpan</Button>
      </div>
    </footer>
  </div>
</template>
