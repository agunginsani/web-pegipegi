<script lang="ts" setup>
  import { Button } from "@pegipegi/web-pegipegi-ui";
  import SearchForm from "home-module/components/SearchForm/index.vue";
  import SearchFormInput from "home-module/components/SearchForm/SearchFormInput.vue";

  const inputItems = computed(() => [
    {
      id: "form",
      label: "Asal",
      icon: "/icon-search-from.svg",
      value: {
        label: "Jakarta (JKT)",
        value: "JKT",
      },
    },
    {
      id: "to",
      label: "Tujuan",
      icon: "/icon-search-to.svg",
      value: {
        label: "Bali/Denpasar (DPS)",
        value: "DPS",
      },
    },
    {
      id: "departDate",
      label: "Pergi",
      icon: "/icon-search-depart-date.svg",
      value: {
        label: "Jumat, 25 Jun 2022",
        value: "25-06-2022",
      },
    },
    {
      id: "passengers",
      label: "Penumpang",
      icon: "/icon-search-passenger.svg",
      value: {
        label: "1 Dewasa",
        value: "1",
      },
    },
  ]);
</script>

<template>
  <section aria-labelledby="search-form" class="p-3 pt-[200px]">
    <SearchForm>
      <!-- TODO: drop v-for -->
      <SearchFormInput
        v-for="item in inputItems"
        :id="item.id"
        :label="item.label"
        :value="item.value"
        :icon="item.icon"
      />
      <Button class="w-full mt-2">Cari Tiket Pesawat</Button>
    </SearchForm>
  </section>
</template>
