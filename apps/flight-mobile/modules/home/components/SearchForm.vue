<script lang="ts" setup>
  import { Button, Switch } from '@pegipegi/web-pegipegi-ui';
  import SearchFormInput from 'home-module/components/SearchFormInput.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import date from 'common-module/utils/date';

  const { searchForm, setSearchForm } = useSearchForm();

  const returnModel = ref(searchForm.returnDate ? ['return'] : []);

  const isReturn = computed(() => returnModel.value.length > 0);

  function setReturn() {
    const today = new Date(String(searchForm.departureDate.value));
    const tommorow = date.add(today, { days: 1 });
    if (isReturn.value) {
      setSearchForm({
        returnDate: {
          label: date.format(tommorow, 'EEEE, dd MMM yyyy'),
          value: tommorow.toString(),
        },
      });
    } else {
      setSearchForm({ returnDate: undefined });
    }
  }

  watch(
    () => isReturn.value,
    () => setReturn()
  );

  function setDefault() {
    if (!searchForm.departureDate.value) {
      /* date needs to be initiated from client side
         due to server & client tz difference possibility */
      setSearchForm({
        departureDate: {
          label: date.format(new Date(), 'EEEE, dd MMM yyyy'),
          value: date.startOfDay(new Date()).toString(),
        },
      });
    }
  }

  onMounted(() => {
    setDefault();
  });

  function onSearch() {
    console.log('search', JSON.stringify(searchForm));
  }

  function onSwap() {
    const origin = JSON.parse(JSON.stringify(searchForm.destination));
    const destination = JSON.parse(JSON.stringify(searchForm.origin));
    setSearchForm({ origin, destination });
  }
</script>

<template>
  <div class="z-1 relative rounded-2xl bg-white p-3">
    <SearchFormInput
      id="origin"
      label="Asal"
      :value="searchForm.origin"
      placeholder="Pilih Keberangkatan"
      icon="/icon-search-origin.svg"
      @click="$router.push('/origin-location')"
    >
      <button
        class="border-purple-affair-700 absolute top-full right-4 z-10 aspect-square -translate-y-1/3 rounded-full border-2 bg-white p-2"
        @click="onSwap"
      >
        <NuxtImg class="h-6 w-6" src="/icon-search-swap.svg" />
      </button>
    </SearchFormInput>

    <SearchFormInput
      id="destination"
      label="Tujuan"
      :value="searchForm.destination"
      placeholder="Pilih Tujuan"
      icon="/icon-search-destination.svg"
      @click="$router.push('/destination-location')"
    />

    <SearchFormInput
      id="departureDate"
      label="Pergi"
      :value="searchForm.departureDate"
      placeholder="Pilih Tanggal"
      icon="/icon-search-departure-date.svg"
      toggleable
      @click="$router.push('/pick-date?type=departure')"
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
    </SearchFormInput>

    <SearchFormInput
      v-if="isReturn"
      id="returnDate"
      label="Pulang"
      :value="searchForm.returnDate"
      placeholder="Pilih Tanggal"
      icon="/icon-search-return-date.svg"
      @click="$router.push('/pick-date?type=return')"
    />

    <SearchFormInput
      id="passenger"
      label="Penumpang"
      :value="searchForm.passenger"
      placeholder="Masukkan Penumpang"
      icon="/icon-search-passenger.svg"
    />

    <SearchFormInput
      id="class"
      label="Kelas"
      :value="searchForm.class"
      placeholder="Pilih Kelas"
      icon="/icon-search-class.svg"
    />

    <Button block class="mt-2" @click="onSearch">Cari Tiket Pesawat</Button>
  </div>
</template>
