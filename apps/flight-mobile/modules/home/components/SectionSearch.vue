<script lang="ts" setup>
  import { Button, Switch } from '@pegipegi/web-pegipegi-ui';
  import SearchFormInput from 'home-module/components/SearchFormInput.vue';
</script>

<template>
  <main aria-labelledby="search-form" class="relative p-4 pt-[180px]">
    <div
      class="absolute inset-x-0 -top-16 h-[500px] w-full bg-gradient-to-b from-[#ffdc8e] via-[#ffc09f] to-white"
    />

    <NuxtImg
      src="/figure-search-hero.svg"
      class="absolute left-0 top-[-48px] w-full"
      alt="Naik Pesawat"
    />

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
        @click="$router.push('/depart-date')"
      >
        <label
          for="toggle-return"
          class="text-neutral-tuna-300 whitespace-nowrap text-xs"
        >
          Pulang Pergi?
        </label>
        <Switch id="toggle-return" />
      </SearchFormInput>

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

      <Button class="mt-2 w-full">Cari Tiket Pesawat</Button>
    </div>
  </main>
</template>
