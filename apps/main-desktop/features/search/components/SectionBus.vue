<script lang="ts" setup>
  import LocationSearch from 'search-module/components/LocationSearch.vue';
  import SearchFormInput from 'search-module/components/SearchFormInput.vue';
  import Calendar from 'search-module/components/Calendar.vue';
  import PaxBus from 'search-module/components/PaxBus.vue';
  import LastSearchBus from './LastSearchBus.vue';
  import useBusSearch from 'search-module/composables/use-bus-search';
  import usePopover from 'common-module/composables/use-popover';
  import useRoundtripCalendar from 'search-module/composables/use-roundtrip-calendar';
  import type { CalendarModelValue } from 'search-module/components/Calendar.vue';
  import useGenericModal from 'common-module/composables/use-generic-modal';
  import { format, startOfDay } from 'date-fns';

  const {
    form,
    isDuplicateSearch,
    assignForm,
    isSwapped,
    swapLocation,
    constructSearchUrl,

    search,
    searchResult,
    searchPending,
    onSearchLocation,

    popularDestination,
    popularOrigin,

    currentLocation,
    getNearbyCity,

    parsedLastSearch,
    lastSearchOrigin,
    lastSearchDestination,
    clearLastSearch,
  } = await useBusSearch();
  const dateDepartureLabel = computed<{ label: string }>(() => ({
    label: format(form.value.dateDeparture, 'dd MMM yyyy'),
  }));
  const dateReturnLabel = computed<{ label: string }>(() => ({
    label: form.value.dateReturn
      ? format(form.value.dateReturn, 'dd MMM yyyy')
      : '',
  }));

  const dateModel = ref<CalendarModelValue>([
    startOfDay(new Date()),
    undefined,
  ]);
  const {
    checkboxValue,
    isRoundTrip,
    isDepartActive,
    isReturnActive,
    disabledDates,
    onClick,
    onClose,
    onSelect,
  } = useRoundtripCalendar(dateModel);

  watch(dateModel, (newVal) => {
    assignForm('dateDeparture', newVal[0]);
    assignForm('dateReturn', newVal[1]);
  });
  function submitSearch() {
    window.location.href = constructSearchUrl(form.value);
  }

  const {
    triggerRef: calendarTrigger,
    top: calendarTop,
    left: calendarLeft,
  } = usePopover();

  const {
    triggerRef: paxTrigger,
    targetRef: paxTarget,
    top: paxTop,
    left: paxLeft,
    active: isPaxActive,
    toggle: paxToggle,
  } = usePopover();

  const {
    triggerRef: lastSearchTrigger,
    targetRef: lastSearchTarget,
    top: lastSearchTop,
    right: lastSearchRight,
    active: isLastSearchActive,
    toggle: lastSearchToggle,
  } = usePopover();

  const { warn } = useGenericModal();
  function onGpsFetchError() {
    warn({
      title: 'Kita gak tahu kamu di mana, nih',
      figure: '/figure-confused-cat.svg',
      description:
        'Nyalakan akses lokasi di pengaturan browser-mu ya, biar bisa lebih akurat.',
      actionText: 'Oke, mengerti',
    });
  }
</script>

<template>
  <div class="mb-2 flex items-center gap-2">
    <LocationSearch
      :last-search="lastSearchOrigin"
      :model-value="form.origin"
      :popularDestination="popularOrigin"
      :searchResult="(!!search && searchResult) || []"
      :pending="searchPending"
      :near-location="currentLocation"
      :pending-gps-fetch="!currentLocation.value"
      icon="/icon-search-bus-origin.svg"
      label="Asal"
      class="w-full"
      placeholder="Masukkan nama kota atau terminal"
      no-child
      @search="(e) => onSearchLocation(e, true)"
      @update:model-value="assignForm('origin', $event)"
      @nearby-fetched="getNearbyCity($event.lat, $event.lng)"
      @nearby-error="onGpsFetchError"
      @clear="clearLastSearch"
    />
    <button
      class="border-orange-inter-600 h-10 w-10 shrink-0 rounded-full border-2 p-2 transition-transform"
      :class="{ 'rotate-180': isSwapped }"
      @click="swapLocation"
    >
      <NuxtImg src="/icon-search-swap.svg" alt="Swap Origin & Destination" />
    </button>
    <LocationSearch
      :model-value="form.destination"
      :last-search="lastSearchDestination"
      :popularDestination="popularDestination || []"
      :searchResult="(!!search && searchResult) || []"
      :pending="searchPending"
      :near-location="currentLocation"
      :pending-gps-fetch="!currentLocation.value"
      :popover-active="isDuplicateSearch"
      popover-text="Kota asal dan tujuan tidak boleh sama."
      icon="/icon-search-bus-destination.svg"
      label="Tujuan"
      class="w-full"
      location-btn-hidden
      no-child
      placeholder="Masukkan nama kota atau terminal tujuan"
      @search="(e) => onSearchLocation(e, false)"
      @update:model-value="assignForm('destination', $event)"
      @clear="clearLastSearch"
      @nearby-fetched="getNearbyCity($event.lat, $event.lng)"
      @nearby-error="onGpsFetchError"
    />
  </div>

  <div class="mb-4 flex items-center gap-2">
    <SearchFormInput
      label="Pergi"
      placeholder="Masukkan tanggal berangkat"
      icon="/icon-search-depart.svg"
      ref="calendarTrigger"
      :value="dateDepartureLabel"
      :active="isDepartActive"
      @click="onClick('departure')"
    />

    <SearchFormInput
      label="Pulang"
      icon="/icon-search-return.svg"
      :class="{ 'cursor-not-allowed': !isRoundTrip }"
      :placeholder="isRoundTrip ? 'Pilih Tanggal Pulang' : 'Sekali Jalan'"
      :value="dateReturnLabel"
      :active="isReturnActive"
      @click="onClick('return')"
    >
      <Checkbox v-model="checkboxValue" value="return"></Checkbox>
    </SearchFormInput>

    <SearchFormInput
      ref="paxTrigger"
      label="Penumpang"
      icon="/icon-search-bus-pax.svg"
      placeholder="Masukkan jumlah penumpang"
      block
      :value="{ label: `${form.paxNum} Kursi` }"
      :active="isPaxActive"
      @click="paxToggle"
    />

    <Button
      size="large"
      class="w-fit shrink-0"
      :class="{ 'pointer-events-none': isDuplicateSearch }"
      @click="submitSearch"
    >
      Cari Bus & Travel
    </Button>
  </div>

  <div class="flex">
    <button
      ref="lastSearchTrigger"
      class="text-neutral-tuna-300 ml-auto flex items-center gap-1 text-sm font-bold"
      v-if="parsedLastSearch.length > 0"
      @click="lastSearchToggle"
    >
      <p>Pencarian Terakhir</p>
      <NuxtImg
        src="/icon-chevron.svg"
        class="transition"
        :class="[isLastSearchActive ? '-rotate-90' : 'rotate-90']"
        role="presentation"
      />
    </button>
  </div>

  <LastSearchBus
    v-if="isLastSearchActive"
    :style="{
      top: `${lastSearchTop + 5}px`,
      right: `calc(100% - ${lastSearchRight}px)`,
    }"
    ref="lastSearchTarget"
    class="fixed"
  />

  <Calendar
    v-if="isDepartActive || isReturnActive"
    class="fixed"
    :style="{
      top: `${calendarTop}px`,
      left: `${calendarLeft}px`,
    }"
    :model-value="dateModel"
    :disabled-dates="disabledDates"
    @close="onClose"
    @select="onSelect"
  />

  <PaxBus
    v-if="isPaxActive"
    class="fixed"
    ref="paxTarget"
    :style="{
      top: `${paxTop}px`,
      left: `${paxLeft}px`,
    }"
  />
</template>
