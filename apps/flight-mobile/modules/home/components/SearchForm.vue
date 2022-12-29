<script lang="ts" setup>
  import { Button, Switch } from '@pegipegi/web-pegipegi-ui';
  import SearchFormInput from 'home-module/components/SearchFormInput.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import date from 'common-module/utils/date';

  const { searchForm, setSearchForm } = useSearchForm();
  const returnModel = ref([]);
  const isReturn = computed(() => returnModel.value.length > 0);

  watch(
    () => isReturn.value,
    () => {
      const tommorow = date.add(
        new Date(String(searchForm.departureDate.value)),
        { days: 1 }
      );
      setSearchForm({
        returnDate: {
          label: date.format(tommorow, 'EEEE, dd MMM yyyy'),
          value: tommorow.toString(),
        },
      });
    }
  );

  function onSearch() {
    console.log('search', JSON.stringify(searchForm));
  }
</script>

<template>
  <div class="z-1 relative rounded-2xl bg-white p-3">
    <SearchFormInput
      id="origin"
      label="Asal"
      :value="searchForm.origin"
      icon="/icon-search-origin.svg"
      @click="$router.push('/origin-location')"
    />

    <SearchFormInput
      id="destination"
      label="Tujuan"
      :value="searchForm.destination"
      icon="/icon-search-destination.svg"
      @click="$router.push('/destination-location')"
    />

    <SearchFormInput
      id="departureDate"
      label="Pergi"
      :value="searchForm.departureDate"
      icon="/icon-search-departure-date.svg"
      toggleable
      @click="$router.push('/departure-date')"
    >
      <label
        for="toggle-return"
        class="text-neutral-tuna-300 whitespace-nowrap text-xs"
      >
        Pulang Pergi?
      </label>
      <Switch v-model="returnModel" value="return" id="toggle-return" />
    </SearchFormInput>

    <SearchFormInput
      v-if="isReturn"
      id="returnDate"
      label="Pulang"
      :value="searchForm.returnDate"
      icon="/icon-search-return-date.svg"
      @click="$router.push('/return-date')"
    />

    <SearchFormInput
      id="passenger"
      label="Penumpang"
      :value="searchForm.passenger"
      icon="/icon-search-passenger.svg"
    />

    <SearchFormInput
      id="class"
      label="Kelas"
      :value="searchForm.class"
      icon="/icon-search-class.svg"
    />

    <Button block class="mt-2" @click="onSearch">Cari Tiket Pesawat</Button>
  </div>
</template>
