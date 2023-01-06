<script lang="ts" setup>
  import LocationSearch from 'home-module/components/LocationSearch.vue';
  import LocationSearchItem from 'home-module/components/LocationSearchItem.vue';

  const keyword = ref('');
</script>

<template>
  <LocationSearch v-model="keyword">
    <div class="flex py-2 px-4">
      <h2 class="font-bold">Pencarian Terakhir</h2>
      <button class="text-orange-inter-600 ml-auto text-sm font-bold">
        Hapus Semua
      </button>
    </div>
    <ul>
      <LocationSearchItem />
      <LocationSearchItem />
      <LocationSearchItem />
    </ul>

    <div class="flex py-2 px-4">
      <h2 class="font-bold">Destinasi Populer</h2>
    </div>
    <ul>
      <LocationSearchItem />
      <LocationSearchItem />
      <LocationSearchItem />
    </ul>
  </LocationSearch>
</template>
