<script lang="ts" setup>
  import { Button } from "@pegipegi/web-pegipegi-ui";
  import SearchForm from "home-module/components/SearchForm/index.vue";
  import SearchFormInput from "home-module/components/SearchForm/SearchFormInput.vue";

  const router = useRouter();
</script>

<template>
  <section aria-labelledby="search-form" class="p-3 pt-[200px]">
    <SearchForm>
      <SearchFormInput
        id="origin"
        label="Asal"
        :value="{ label: 'Jakarta (JKT)', value: 'JKT' }"
        icon="/icon-search-origin.svg"
        @click="router.push('/origin-location')"
      />
      <SearchFormInput
        id="destination"
        label="Tujuan"
        :value="{ label: 'Bali (DPS)', value: 'DPS' }"
        icon="/icon-search-destination.svg"
        @click="router.push('/destination-location')"
      />
      <SearchFormInput
        id="departDate"
        label="Pergi"
        :value="{ label: 'Jumat, 25 Jun 2022', value: '25-06-2022' }"
        icon="/icon-search-depart-date.svg"
        @click="router.push('/depart-date')"
      />
      <SearchFormInput
        id="passenger"
        label="Penumpang"
        :value="{ label: '1 Dewasa', value: '1' }"
        icon="/icon-search-passenger.svg"
      />
      <Button class="w-full mt-2">Cari Tiket Pesawat</Button>
    </SearchForm>
  </section>
</template>
