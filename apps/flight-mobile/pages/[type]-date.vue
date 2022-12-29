<script lang="ts" setup>
  import date from 'common-module/utils/date';
  import { Button } from '@pegipegi/web-pegipegi-ui';
  import CalendarItem from 'home-module/components/CalendarItem.vue';
  import useSearchForm from 'home-module/composables/use-search-form';

  definePageMeta({
    middleware(to, from) {
      // TODO: find a more elegant way to reintroduce composables inside middleware
      const { searchForm } = useSearchForm();
      if (
        !['/departure-date', '/return-date'].includes(to.path) ||
        !searchForm.departureDate.value
      )
        return '/';
      if (['/departure-date', '/return-date'].includes(from.path))
        to.meta.pageTransition = false;
    },
  });

  const { searchForm, setSearchForm } = useSearchForm();
  const route = useRoute();
  const router = useRouter();

  const tempValue = {
    departureDate: searchForm.departureDate,
    returnDate: searchForm.returnDate,
  };

  function onBack() {
    setSearchForm(tempValue);
    router.go(-1);
  }

  function onSave() {
    router.go(-1);
  }

  function onClearReturn() {
    setSearchForm({
      returnDate: undefined,
    });
  }

  const startDate = computed(() => date.startOfMonth(new Date()));
  const endDate = computed(() =>
    date.endOfMonth(date.add(startDate.value, { months: 12 }))
  );
  const monthDifference = computed(() =>
    date.differenceInMonths(endDate.value, startDate.value)
  );

  // TODO: simplify
  const renderedMonths = computed(() => {
    const months = [];
    let pointer = new Date(startDate.value);

    for (let i = 0; i <= monthDifference.value; i++) {
      months.push(pointer);
      pointer = date.add(pointer, { months: 1 });
    }

    return months;
  });

  function parseDate(input: any) {
    return new Date(String(input));
  }

  const modelValue = computed<[Date, Date | undefined]>(() => [
    new Date(String(searchForm.departureDate.value)),
    searchForm.returnDate ? parseDate(searchForm.returnDate?.value) : undefined,
  ]);

  const departureDateText = computed(() => {
    return date.format(parseDate(searchForm.departureDate.value), 'd MMM yyyy');
  });

  const returnDateText = computed(() => {
    if (modelValue.value[1])
      return date.format(
        parseDate(searchForm.departureDate.value),
        'd MMM yyyy'
      );
    return 'Pilih Tanggal';
  });

  function onPick(event: Date) {
    // TODO: handle picking depart after return & return before depart
    const newValue = {
      label: date.format(event, 'EEEE, dd MMM yyyy'),
      value: event.toString(),
    };

    if (route.params.type === 'return') {
      setSearchForm({ returnDate: newValue });
    } else {
      setSearchForm({ departureDate: newValue });
    }
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
                searchForm.returnDate
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
        <CalendarItem
          v-for="month in renderedMonths"
          :date="month"
          :modelValue="modelValue"
          @pick="onPick"
        >
          <!-- TODO: integarte cheapest price -->
          <p class="text-neutral-tuna-300 text-xs">315</p>
        </CalendarItem>
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
            <NuxtLink
              class="font-bold"
              :class="{
                'text-orange-inter-600':
                  !!searchForm.returnDate && $route.params.type === 'departure',
              }"
              to="/departure-date"
              replace
            >
              {{ departureDateText }}
            </NuxtLink>
          </div>

          <div
            class="text-right"
            v-if="!!searchForm.returnDate || $route.params.type === 'return'"
          >
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
            <NuxtLink
              class="font-bold"
              :class="{
                'text-orange-inter-600':
                  !!searchForm.returnDate && $route.params.type === 'return',
              }"
              to="/return-date"
              replace
            >
              {{ returnDateText }}
            </NuxtLink>
          </div>

          <div class="text-right" v-else>
            <p class="text-neutral-tuna-300 text-sm">Untuk lebih murah</p>
            <NuxtLink
              class="text-orange-inter-600 font-bold"
              to="/return-date"
              replace
            >
              Pilih Pulang Juga
            </NuxtLink>
          </div>
        </div>

        <Button block @click="onSave">Simpan</Button>
      </div>
    </footer>
  </div>
</template>
