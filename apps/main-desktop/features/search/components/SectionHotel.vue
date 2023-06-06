<script lang="ts" setup>
  import LocationSearch from 'search-module/components/LocationSearch.vue';
  import type { LocationSearchSelection } from 'search-module/types/search-types';
  import HotelStar from 'search-module/components/HotelStar.vue';
  import HotelPrice from 'search-module/components/HotelPrice.vue';
  import HotelDate from 'search-module/components/HotelDate.vue';
  import HotelGuestRoom from 'search-module/components/HotelGuestRoom.vue';
  import HotelLastSearch from 'search-module/components/HotelLastSearch.vue';
  import useHotelSearchForm, {
    HotelLocation,
    mapData,
  } from 'search-module/composables/use-hotel-search-form';
  import useHotelHistory from 'search-module/composables/use-hotel-history';
  import useGenericModal from 'common-module/composables/use-generic-modal';
  import { useStorage } from '@vueuse/core';

  const { form, searchResult, searchPending, setForm, search, getRoute } =
    await useHotelSearchForm();

  const { data: initData } = await useFetch('/api/hotel/autocomplete');
  setForm({ traceId: initData.value?.traceId });

  const popularList = computed(() => initData.value?.dataList || []);

  const { history, addHistory, clearHistory } = useHotelHistory(
    'autocomplete-search'
  );
  const historyAutocomplete = computed(() => mapData(history.value));

  function onSearch(keyword: string) {
    search.value = keyword;
  }

  const selectedLocation = ref<LocationSearchSelection<HotelLocation>>({
    label: '',
    value: '',
    payload: form.value.location,
  });

  const hotelDateRef = ref();
  const locationRef = ref();

  function onClose() {
    if (!selectedLocation.value.value && historyAutocomplete.value.length > 0) {
      const { title, payload, value } = historyAutocomplete.value[0];
      setForm({ location: payload });
      selectedLocation.value = {
        label: title,
        payload,
        value,
      };
    }
  }

  async function onSelectLocation(item: LocationSearchSelection<any>) {
    if (item.label !== 'Hotel Terdekat') {
      const payload: HotelLocation = item.payload!;
      setForm({ location: payload });

      addHistory(payload);
    }
    search.value = '';
    await nextTick();
    hotelDateRef.value.show();
  }

  const nearLocation = {
    title: 'Hotel Terdekat',
    description: 'Cari hotel di sekitarmu',
    value: 'Hotel Terdekat',
    objectTypeDescription: 'near',
  };
  function selectNearby(latitude: number, longitude: number) {
    setForm({
      location: {
        ...form.value.location,
        ...nearLocation,
        latitude,
        longitude,
      },
    });
  }

  let lastSearch = ref();
  onMounted(() => {
    lastSearch = useStorage('hotel-web.last-search', '', window.sessionStorage);
    if (!!lastSearch.value) {
      const lastSearchForm = JSON.parse(lastSearch.value);
      setForm({
        ...lastSearchForm,
        checkInDate: new Date(lastSearchForm.checkInDate),
        checkOutDate: new Date(lastSearchForm.checkOutDate),
      });
      selectedLocation.value = {
        label: form.value.location.title,
        payload: form.value.location,
        value: form.value.location.title,
      };
    }
  });

  async function applySearch() {
    const { location, checkOutDate } = form.value;
    if (!location.title || !checkOutDate) {
      if (!location.title) {
        locationRef.value.show();
      } else {
        hotelDateRef.value.show();
      }
    } else {
      lastSearch.value = JSON.stringify(form.value);
      window.location.href = getRoute();
    }
  }

  const { warn } = useGenericModal();
  function onGpsFetchError() {
    warn({
      title: 'Kita gak tahu kamu di mana, nih',
      figure: '/figure-confused-cat.svg',
      description:
        'Nyalakan akses lokasi di pengaturan browser-mu ya, biar bisa lebih akurat.',
      actionText: 'Oke, mengerti',
    });
  }
</script>

<template>
  <div>
    <div class="flex w-full items-center justify-between gap-2">
      <LocationSearch
        ref="locationRef"
        class="min-w-[275px] grow"
        :last-search="historyAutocomplete"
        :popular-destination="popularList"
        :searchResult="searchResult"
        :pending="searchPending && !!search"
        label="Tujuan"
        icon="/icon-search-hotel.svg"
        placeholder="Masukkan nama kota/hotel"
        :near-location="nearLocation"
        v-model="selectedLocation"
        no-child
        @update:modelValue="onSelectLocation($event)"
        @search="onSearch($event)"
        @clear="clearHistory"
        @close="onClose"
        @nearby-fetched="selectNearby($event.lat, $event.lng)"
        @nearby-error="onGpsFetchError"
      />

      <HotelDate ref="hotelDateRef" class="w-[281px]" />
      <HotelGuestRoom class="w-[200px] xl:w-[281px]" />

      <Button size="large" class="shrink-0" @click="applySearch"
        >Cari Hotel</Button
      >
    </div>

    <div class="mt-4 flex w-full items-center gap-3">
      <p class="text-sm">Filter</p>
      <HotelStar />
      <HotelPrice />
      <HotelLastSearch class="ml-auto" />
    </div>
  </div>
</template>
