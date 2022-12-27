<script lang="ts" setup>
  import { Button, Switch } from "@pegipegi/web-pegipegi-ui";
  import SearchFormInput from "home-module/components/SearchFormInput.vue";
</script>

<template>
  <section aria-labelledby="search-form" class="relative p-4 pt-[200px]">
    <NuxtImg
      src="/figure-search-hero.svg"
      class="absolute left-0 top-0 w-full"
      alt="Naik Pesawat"
    />

    <div class="relative p-4 bg-white rounded-2xl z-1">
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
          class="text-xs whitespace-nowrap text-neutral-tuna-300"
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

      <Button class="w-full mt-2">Cari Tiket Pesawat</Button>
    </div>
  </section>
</template>
