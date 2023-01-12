<script lang="ts" setup>
  import LocationSearch from 'home-module/components/LocationSearch.vue';
  import LocationSearchItem from 'home-module/components/LocationSearchItem.vue';
  import useAirports from 'home-module/composables/use-airports';
  import useSearchForm, {
    SearchFormValue,
    SearchForm,
  } from 'home-module/composables/use-search-form';

  const router = useRouter();
  const route = useRoute();

  const { airports, initiateAirports } = useAirports();
  await initiateAirports();

  const keyword = ref('');
  const results = ref<
    Array<{
      title: string;
      description: string;
      type: string;
      value: SearchFormValue;
    }>
  >([]);

  watchDebounced(
    keyword,
    () => {
      // TODO: optimize, make faster
      if (keyword.value) {
        results.value = airports
          .filter((item) => {
            const key = keyword.value.toLowerCase();
            return (
              item.airport_name.toLowerCase().includes(key) ||
              item.airport_code.toLowerCase().includes(key) ||
              item.country_name.toLowerCase().includes(key) ||
              item.area_name.toLowerCase().includes(key)
            );
          })
          .map((item) => ({
            title: `${item.area_name}, ${item.country_name}`,
            description: `${item.airport_code} - ${item.airport_name}`,
            type: `${item.type[0].toUpperCase()}${item.type
              .slice(1)
              .toLowerCase()}`,
            value: {
              label: `${item.area_name} (${item.airport_code})`,
              value: item.airport_code,
            },
          }));
      } else {
        results.value = [];
      }
    },
    { debounce: 300 }
  );

  function onBack() {
    router.go(-1);
  }

  const { setSearchForm } = useSearchForm();
  function onSelect(value: SearchFormValue) {
    const payload: Partial<SearchForm> = {};
    payload[route.query.type as 'origin' | 'destination'] = value;
    setSearchForm(payload);
    onBack();
  }
</script>

<template>
  <LocationSearch v-model="keyword" @back="onBack">
    <!-- TODO: implement last search & popular destination -->
    <template v-if="!keyword">
      <div class="flex py-2 px-4">
        <h2 class="font-bold">Pencarian Terakhir</h2>
        <button class="text-orange-inter-600 ml-auto text-sm font-bold">
          Hapus Semua
        </button>
      </div>
      <ul>
        <LocationSearchItem
          title="Bali / Denpasar, Indonesia"
          description="DPS - Ngurah Rai International Airport"
          type="Bandara"
          :value="{
            label: 'Bali / Denpasar (DPS)',
            value: 'DPS',
          }"
          @select="onBack"
        />
      </ul>

      <div class="flex py-2 px-4">
        <h2 class="font-bold">Destinasi Populer</h2>
      </div>
      <ul>
        <LocationSearchItem
          title="Bali / Denpasar, Indonesia"
          description="DPS - Ngurah Rai International Airport"
          type="Bandara"
          :value="{
            label: 'Bali / Denpasar (DPS)',
            value: 'DPS',
          }"
          @select="onBack"
        />
        <LocationSearchItem
          title="Bali / Denpasar, Indonesia"
          description="DPS - Ngurah Rai International Airport"
          type="Bandara"
          :value="{
            label: 'Bali / Denpasar (DPS)',
            value: 'DPS',
          }"
          @select="onBack"
        />
      </ul>
    </template>

    <template v-else>
      <ul>
        <LocationSearchItem
          v-for="item in results"
          :title="item.title"
          :description="item.description"
          :type="item.type"
          :value="item.value"
          :key="item.value.value"
          :keyword="keyword"
          @select="onSelect"
        />
      </ul>
    </template>
  </LocationSearch>
</template>
