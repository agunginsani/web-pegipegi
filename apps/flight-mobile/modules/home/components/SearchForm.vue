<script lang="ts" setup>
  import { Button, Switch } from '@pegipegi/web-pegipegi-ui';
  import SearchFormItem from 'home-module/components/SearchFormItem.vue';
  import ModalPassenger from 'home-module/components/ModalPassenger.vue';
  import ModalClass from 'home-module/components/ModalClass.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  // import dateUtil from 'common-module/utils/date';
  import { add, format } from 'date-fns';

  const { searchForm, setSearchForm } = useSearchForm();

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
    const from = searchForm.origin.value;
    const to = searchForm.destination.value;
    const departureDate = searchForm.departureDate.value
      ? format(new Date(searchForm.departureDate.value), 'dd-MM-yyyy')
      : undefined;
    const returnDate = searchForm.returnDate?.value
      ? format(new Date(searchForm.returnDate.value), 'dd-MM-yyyy')
      : undefined;
    const adult = searchForm.passengers.value.adult;
    const child = searchForm.passengers.value.child;
    const infant = searchForm.passengers.value.infant;
    const seatClass = searchForm.class.value;

    let queryParams = `from=${from}&to=${to}&adult=${adult}&child=${child}&infant=${infant}&seatClass=${seatClass}&isNoTransit=0`;

    if (departureDate) {
      queryParams = `${queryParams}&departureDate=${departureDate}`;
    }

    if (returnDate) {
      queryParams = `${queryParams}&returnDate=${returnDate}`;
    }

    const baseUrl = useRuntimeConfig().public.homeUrl;
    return `${baseUrl}/flight/search-result/departure?${queryParams}`;
  });

  function onSwap() {
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
    >
      <button
        class="border-purple-affair-700 absolute top-full right-4 z-10 aspect-square -translate-y-1/3 rounded-full border-2 bg-white p-2"
        @click="onSwap"
        aria-label="Swap Origin and Destination"
      >
        <NuxtImg
          src="/icon-search-swap.svg"
          alt="Swap"
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
    />

    <SearchFormItem
      id="class"
      label="Kelas"
      :value="searchForm.class"
      placeholder="Pilih Kelas"
      icon="/icon-search-class.svg"
      :to="`${$route.path}?showClass=1`"
    />

    <NuxtLink :to="searchUrl">
      <Button block class="mt-2">Cari Tiket Pesawat</Button>
    </NuxtLink>

    <ModalPassenger />
    <ModalClass />
  </div>
</template>
