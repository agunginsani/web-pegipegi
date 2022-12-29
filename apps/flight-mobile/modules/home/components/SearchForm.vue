<script lang="ts" setup>
  import { Button, Switch } from '@pegipegi/web-pegipegi-ui';
  import SearchFormInput from 'home-module/components/SearchFormInput.vue';

  const returnModel = ref([]);
  const isReturn = computed(() => returnModel.value.length > 0);
</script>

<template>
  <div class="z-1 relative rounded-2xl bg-white p-3">
    <SearchFormInput
      id="origin"
      label="Asal"
      :value="{ label: 'Jakarta (JKT)', value: 'JKT' }"
      icon="/icon-search-origin.svg"
      @click="$router.push('/origin-location')"
    />

    <SearchFormInput
      id="destination"
      label="Tujuan"
      :value="{ label: 'Bali (DPS)', value: 'DPS' }"
      icon="/icon-search-destination.svg"
      @click="$router.push('/destination-location')"
    />

    <SearchFormInput
      id="departDate"
      label="Pergi"
      :value="{ label: 'Jumat, 25 Jun 2022', value: '25-06-2022' }"
      icon="/icon-search-depart-date.svg"
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
      :value="{ label: 'Jumat, 25 Jun 2022', value: '25-06-2022' }"
      icon="/icon-search-return-date.svg"
      @click="$router.push('/return-date')"
    />

    <SearchFormInput
      id="passenger"
      label="Penumpang"
      :value="{ label: '1 Dewasa', value: '1' }"
      icon="/icon-search-passenger.svg"
    />

    <SearchFormInput
      id="class"
      label="Kelas"
      :value="{ label: 'Ekonomi', value: 'EKO' }"
      icon="/icon-search-class.svg"
    />

    <Button block class="mt-2">Cari Tiket Pesawat</Button>
  </div>
</template>
