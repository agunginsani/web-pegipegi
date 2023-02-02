<script lang="ts" setup>
  import { Button, Switch } from '@pegipegi/web-pegipegi-ui';
  import SearchFormItem from 'home-module/components/SearchFormItem.vue';
  import ModalPassenger from 'home-module/components/ModalPassenger.vue';
  import ModalClass from 'home-module/components/ModalClass.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import { add, format } from 'date-fns';

  const { searchForm, setSearchForm, bestPrice, clearBestPrice } =
    useSearchForm();

  const returnModel = computed({
    get() {
      return searchForm.returnDate ? ['return'] : [];
    },
    set(value) {
      if (value.length > 0) {
        const today = new Date(String(searchForm.departureDate.value));
        const tommorow = add(today, { days: 1 });
        setSearchForm({
          returnDate: {
            label: format(tommorow, 'EEEE, dd MMM yyyy'),
            value: tommorow.toString(),
          },
        });
      } else {
        setSearchForm({ returnDate: undefined });
      }
    },
  });

  const searchUrl = computed(() => {
    const queryParams = new URLSearchParams({
      from: searchForm.origin.value,
      to: searchForm.destination.value,
      adult: String(searchForm.passengers.value.adult),
      child: String(searchForm.passengers.value.child),
      infant: String(searchForm.passengers.value.infant),
      seatClass: searchForm.class.value,
      isNoTransit: '0',
    });

    const departureDate = searchForm.departureDate.value
      ? format(new Date(searchForm.departureDate.value), 'dd-MM-yyyy')
      : undefined;
    const returnDate = searchForm.returnDate?.value
      ? format(new Date(searchForm.returnDate.value), 'dd-MM-yyyy')
      : undefined;

    if (departureDate) queryParams.set('departureDate', departureDate);
    if (returnDate) queryParams.set('returnDate', returnDate);

    const baseUrl = useRuntimeConfig().public.homeUrl;
    return `${baseUrl}/flight/search-result/departure?${queryParams.toString()}`;
  });

  const bestPriceStorage = useLocalStorage('flight-mweb.best-price', {});
  bestPriceStorage.value = {};

  function saveBestPrice() {
    bestPriceStorage.value = bestPrice;
  }

  const isRotated = ref(false);
  function onSwap() {
    isRotated.value = !isRotated.value;
    clearBestPrice();
    const origin = JSON.parse(JSON.stringify(searchForm.destination));
    const destination = JSON.parse(JSON.stringify(searchForm.origin));
    setSearchForm({ origin, destination });
  }
</script>

<template>
  <div class="z-1 relative rounded-2xl bg-white p-3">
    <SearchFormItem
      id="origin"
      label="Asal"
      :value="searchForm.origin"
      placeholder="Pilih Keberangkatan"
      icon="/icon-search-origin.svg"
      to="/select-location?type=origin"
      @click="clearBestPrice()"
    >
      <button
        class="border-purple-affair-700 absolute top-full right-4 z-10 aspect-square -translate-y-1/3 rounded-full border-2 bg-white p-2 transition-transform duration-500"
        :class="{
          'rotate-0': !isRotated,
          'rotate-180': isRotated,
        }"
        @click="onSwap"
      >
        <NuxtImg
          src="/icon-search-swap.svg"
          alt="Swap Origin and Destination"
          width="24"
          height="24"
        />
      </button>
    </SearchFormItem>

    <SearchFormItem
      id="destination"
      label="Tujuan"
      :value="searchForm.destination"
      placeholder="Pilih Tujuan"
      icon="/icon-search-destination.svg"
      to="/select-location?type=destination"
      @click="clearBestPrice()"
    />

    <SearchFormItem
      id="departureDate"
      label="Pergi"
      :value="searchForm.departureDate"
      placeholder="Pilih Tanggal"
      icon="/icon-search-departure-date.svg"
      toggleable
      to="/select-date?type=departure"
    >
      <template v-if="searchForm.departureDate.value">
        <label
          for="toggle-return"
          class="text-neutral-tuna-300 whitespace-nowrap text-xs"
        >
          Pulang Pergi?
        </label>
        <Switch v-model="returnModel" value="return" id="toggle-return" />
      </template>
    </SearchFormItem>

    <SearchFormItem
      v-if="returnModel.length > 0"
      id="returnDate"
      label="Pulang"
      :value="searchForm.returnDate"
      placeholder="Pilih Tanggal"
      icon="/icon-search-return-date.svg"
      to="/select-date?type=return"
    />

    <SearchFormItem
      id="passenger"
      label="Penumpang"
      :value="searchForm.passengers"
      placeholder="Masukkan Penumpang"
      icon="/icon-search-passenger.svg"
      :to="`${$route.path}?showPassenger=1`"
      @click="clearBestPrice()"
    />

    <SearchFormItem
      id="class"
      label="Kelas"
      :value="searchForm.class"
      placeholder="Pilih Kelas"
      icon="/icon-search-class.svg"
      :to="`${$route.path}?showClass=1`"
      @click="clearBestPrice()"
    />

    <NuxtLink :to="searchUrl" @click="saveBestPrice">
      <Button block class="mt-2">Cari Tiket Pesawat</Button>
    </NuxtLink>

    <ModalPassenger />
    <ModalClass />
  </div>
</template>
