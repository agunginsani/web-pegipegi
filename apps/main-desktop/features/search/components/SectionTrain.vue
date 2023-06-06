<script lang="ts" setup>
  import PaxTrain from 'search-module/components/PaxTrain.vue';
  import SearchFormInput from 'search-module/components/SearchFormInput.vue';
  import Calendar from 'search-module/components/Calendar.vue';
  import LocationSearch from 'search-module/components/LocationSearch.vue';
  import useRoundtripCalendar from 'search-module/composables/use-roundtrip-calendar';
  import useTrainStations from 'search-module/composables/use-train-stations';
  import useTrainSearchForm from 'search-module/composables/use-train-search-form';
  import usePopover from 'common-module/composables/use-popover';
  import { format } from 'date-fns';
  import type { TrainFormValue } from 'search-module/composables/use-train-search-form';
  import type { LocationSearchItem } from 'search-module/types/search-types';

  const { form, dateModel, lastSearch, setForm } = useTrainSearchForm();
  const {
    keyword,
    filteredStations,
    popularStations,
    history,
    pending,
    addHistory,
    clearHistory,
  } = useTrainStations();

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

  const {
    checkboxValue,
    isDepartActive,
    isReturnActive,
    isRoundTrip,
    disabledDates,
    onClick,
    onClose,
    onSelect,
  } = useRoundtripCalendar(dateModel, paxToggle);

  // handle location
  const destinationRef = ref();
  const isSwapped = ref(false);
  const isLocationDuplicated = computed(
    () => form.value.origin.value === form.value.destination.value
  );

  function swapDestination() {
    setForm({
      origin: JSON.parse(JSON.stringify(form.value.destination)),
      destination: JSON.parse(JSON.stringify(form.value.origin)),
    });
    isSwapped.value = !isSwapped.value;
  }

  function revertItemTitle(item: LocationSearchItem) {
    return {
      ...item,
      title: item.description ?? '',
      description: item.title,
    };
  }

  function onLocationSelect(
    type: 'origin' | 'destination',
    location: LocationSearchItem
  ) {
    const isLastSearch =
      !location.description?.includes('Semua Stasiun - ') &&
      !location.title.includes(' - ');

    const isCity = location.type === 'Kota';

    const newValue: LocationSearchItem =
      isLastSearch && !isCity ? revertItemTitle(location) : location;

    setForm({
      [type]: {
        value: newValue.value,
        label: newValue.title,
      },
    });

    addHistory(!isCity ? revertItemTitle(newValue) : newValue);

    if (type === 'origin') destinationRef.value?.show();
    if (type === 'destination') onClick('departure');
  }

  // handle submit
  function constructSearchUrl(formInput: TrainFormValue) {
    const publicConfig = useRuntimeConfig().public;
    const baseUrl = publicConfig.homeAltUrl || publicConfig.homeUrl;
    const origin = formInput.origin.value;
    const destination = formInput.destination.value;
    const departureDate = formInput.departureDate.value
      ? format(new Date(formInput.departureDate.value), 'dd-MM-yyyy')
      : '';
    const returnDate = formInput.returnDate?.value
      ? format(new Date(formInput.returnDate.value), 'dd-MM-yyyy')
      : '';
    const pax = `${formInput.passengers.value.adult}/${formInput.passengers.value.infant}`;

    if (returnDate) {
      return `${baseUrl}/kereta-api/search/round/${origin}/${destination}/${departureDate}/${returnDate}/${pax}/EBK`;
    }
    return `${baseUrl}/kereta-api/search/direct/${origin}/${destination}/${departureDate}/${pax}/EBK`;
  }

  function onSearch() {
    lastSearch.value = [
      form.value,
      ...lastSearch.value.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(form.value)
      ),
    ].slice(0, 5);
  }

  function onDeleteLastSearch(index: number) {
    lastSearch.value = lastSearch.value.filter((_, i) => index !== i);
    lastSearchToggle();
  }
</script>

<template>
  <div class="mb-2 flex items-center gap-2">
    <LocationSearch
      :last-search="history"
      :popular-destination="popularStations"
      :search-result="!!keyword && !!filteredStations ? filteredStations : []"
      :pending="!!pending && !!keyword"
      :model-value="form.origin"
      icon="/icon-search-train-origin.svg"
      label="Asal"
      class="w-full"
      placeholder="Masukkan nama kota atau stasiun"
      @search="keyword = $event"
      @select="onLocationSelect('origin', $event)"
      @clear="clearHistory"
    />
    <button
      class="border-orange-inter-600 h-10 w-10 shrink-0 rounded-full border-2 p-2 transition-transform"
      :class="{ 'rotate-180': isSwapped }"
      @click="swapDestination"
    >
      <NuxtImg src="/icon-search-swap.svg" alt="Swap Origin & Destination" />
    </button>
    <LocationSearch
      ref="destinationRef"
      :last-search="history"
      :popular-destination="popularStations"
      :search-result="!!keyword && !!filteredStations ? filteredStations : []"
      :pending="!!pending && !!keyword"
      :model-value="form.destination"
      :popover-active="isLocationDuplicated"
      popover-text="Kota asal dan tujuan tidak boleh sama."
      icon="/icon-search-train-destination.svg"
      label="Tujuan"
      class="w-full"
      placeholder="Masukkan nama kota atau stasiun"
      @search="keyword = $event"
      @select="onLocationSelect('destination', $event)"
      @clear="clearHistory"
    />
  </div>

  <div class="mb-4 flex items-center gap-2">
    <SearchFormInput
      label="Pergi"
      placeholder="Masukkan tanggal berangkat"
      icon="/icon-search-depart.svg"
      ref="calendarTrigger"
      :value="form.departureDate"
      :active="isDepartActive"
      @click="onClick('departure')"
    />

    <SearchFormInput
      label="Pulang"
      icon="/icon-search-return.svg"
      :class="{ 'cursor-not-allowed': !isRoundTrip }"
      :placeholder="isRoundTrip ? 'Pilih Tanggal Pulang' : 'Sekali Jalan'"
      :value="form.returnDate"
      :active="isReturnActive"
      @click="onClick('return')"
    >
      <Checkbox v-model="checkboxValue" value="return"></Checkbox>
    </SearchFormInput>

    <SearchFormInput
      ref="paxTrigger"
      label="Penumpang"
      icon="/icon-search-pax.svg"
      placeholder="Masukkan jumlah penumpang"
      block
      :value="form.passengers"
      :active="isPaxActive"
      @click="paxToggle"
    />

    <NuxtLink
      :to="constructSearchUrl(form)"
      class="w-[450px]"
      :class="{ 'pointer-events-none': isLocationDuplicated }"
    >
      <Button size="large" class="whitespace-nowrap" @click="onSearch">
        Cari Kereta Api
      </Button>
    </NuxtLink>
  </div>

  <button
    ref="lastSearchTrigger"
    class="text-neutral-tuna-300 ml-auto flex items-center gap-1 text-sm font-bold"
    v-if="lastSearch.length > 0"
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
  <ul
    v-if="isLastSearchActive"
    ref="lastSearchTarget"
    class="shadow-raised fixed z-10 min-w-[250px] rounded-xl bg-white"
    :style="{
      top: `${lastSearchTop + 5}px`,
      right: `calc(100% - ${lastSearchRight}px)`,
    }"
  >
    <li
      v-for="(item, index) in lastSearch"
      :key="`last-search-train-${item.origin.value}-${item.destination.value}-${item.departureDate.value}-${item.returnDate?.value}`"
    >
      <NuxtLink
        :to="constructSearchUrl(item)"
        class="border-neutral-tuna-25 block border-b p-3"
      >
        <div class="flex gap-4">
          <div class="text-sm">
            <div class="flex gap-2 whitespace-nowrap">
              <span>{{ item.origin.label }}</span>
              <span>{{ item.returnDate ? '⟷' : '⟶' }}</span>
              <span>{{ item.destination.label }}</span>
            </div>
            <p class="text-neutral-tuna-300">
              {{ item.departureDate.label }}
              {{ item.returnDate ? `- ${item.returnDate.label}` : '' }}
              &bull;
              {{ item.passengers.value.adult + item.passengers.value.infant }}
              Penumpang
            </p>
          </div>
          <button
            class="ml-auto"
            @click.stop.prevent="onDeleteLastSearch(index)"
          >
            <NuxtImg
              src="/icon-close-red.svg"
              width="12px"
              height="12px"
              alt="Delte"
            />
          </button>
        </div>
      </NuxtLink>
    </li>
  </ul>

  <Calendar
    v-if="isDepartActive || isReturnActive"
    class="fixed z-10"
    :model-value="dateModel"
    :ranged="isRoundTrip"
    :disabled-dates="disabledDates"
    :style="{
      top: `${calendarTop}px`,
      left: `${calendarLeft}px`,
    }"
    @select="onSelect"
    @close="onClose"
  />

  <PaxTrain
    v-if="isPaxActive"
    class="fixed z-10"
    ref="paxTarget"
    :style="{
      top: `${paxTop}px`,
      left: `${paxLeft}px`,
    }"
  />
</template>
