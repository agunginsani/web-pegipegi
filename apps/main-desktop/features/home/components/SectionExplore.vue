<script lang="ts" setup>
  import HomeSection from './HomeSection.vue';
  import CardExplore from 'home-module/components/CardExplore.vue';
  import ChipTab from 'common-module/components/ChipTab.vue';
  import {
    ExploreItem,
    hotel,
    flight,
    train,
    bus,
  } from 'home-module/enums/explores';

  type MerchantsEnum = 'FLIGHT' | 'HOTEL' | 'TRAIN' | 'BUS';
  const tabOptions = [
    { label: 'Hotel', value: 'HOTEL' },
    { label: 'Pesawat', value: 'FLIGHT' },
    { label: 'Kereta Api', value: 'TRAIN' },
    { label: 'Bus & Travel', value: 'BUS' },
  ];
  const activeTab = ref<MerchantsEnum>('HOTEL');
  const activeData = computed<Array<ExploreItem>>(() => {
    if (activeTab.value === 'HOTEL') return hotel;
    if (activeTab.value === 'FLIGHT') return flight;
    if (activeTab.value === 'BUS') return bus;
    if (activeTab.value === 'TRAIN') return train;
    return [];
  });
</script>

<template>
  <ChipTab
    class="m-auto mb-[20px] w-fit"
    :options="tabOptions"
    v-model="activeTab"
  >
    <template #HOTEL="{ label }">
      <div class="flex items-center gap-2">
        <NuxtImg
          src="/icon-explore-hotel.svg"
          width="24px"
          height="24px"
          class="transition duration-300"
          :class="{ 'brightness-200': activeTab === 'HOTEL' }"
          role="presentation"
        />
        <p>{{ label }}</p>
      </div>
    </template>
    <template #FLIGHT="{ label }">
      <div class="flex items-center gap-2">
        <NuxtImg
          src="/icon-explore-flight.svg"
          width="24px"
          height="24px"
          class="transition duration-300"
          :class="{ 'brightness-200': activeTab === 'FLIGHT' }"
          role="presentation"
        />
        <p>{{ label }}</p>
      </div>
    </template>
    <template #TRAIN="{ label }">
      <div class="flex items-center gap-2">
        <NuxtImg
          src="/icon-explore-train.svg"
          width="24px"
          height="24px"
          class="transition duration-300"
          :class="{ 'brightness-200': activeTab === 'TRAIN' }"
          role="presentation"
        />
        <p>{{ label }}</p>
      </div>
    </template>
    <template #BUS="{ label }">
      <div class="flex items-center gap-2">
        <NuxtImg
          src="/icon-explore-bus.svg"
          width="24px"
          height="24px"
          class="transition duration-300"
          :class="{ 'brightness-200': activeTab === 'BUS' }"
          role="presentation"
        />
        <p>{{ label }}</p>
      </div>
    </template>
  </ChipTab>
  <HomeSection section-id="explore-section">
    <template #title v-if="activeTab === 'HOTEL'">
      Mau staycation di hotel? Ayoo, sini merapat 🏨 ✨
    </template>
    <template #title v-if="activeTab === 'FLIGHT'">
      Waktunya terbang ke destinasi favorit kita semua ✈️ 🌍
    </template>
    <template #title v-if="activeTab === 'TRAIN'">
      Cobain bepergian naik kereta ke rute populer ini 🚂
    </template>
    <template #title v-if="activeTab === 'BUS'">
      Naik bus & travel buat tembus ke mana ajaa 🚌 💨
    </template>

    <div class="grid grid-cols-3 gap-4">
      <CardExplore
        v-for="(item, index) in activeData"
        :key="`explore-${activeTab}-${index}`"
        :name="item.name"
        :inventory="item.inventory"
        :image="item.image"
        :price="item.price"
        :url="item.url"
        :merchant="activeTab"
      />
    </div>
  </HomeSection>
</template>
