<script lang="ts" setup>
  import useHotelSearchForm, {
    HotelForm,
  } from 'search-module/composables/use-hotel-search-form';
  import usePopover from 'common-module/composables/use-popover';
  import { format } from 'date-fns';
  const config = useRuntimeConfig();

  const {
    triggerRef: lastHistory,
    targetRef: lastHistoryModal,
    active,
    toggle,
  } = usePopover();

  const { setForm, getRoute } = await useHotelSearchForm();
  const expires = new Date();
  expires.setTime(expires.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
  const historyCookie = useCookie<string>('SearchHotelhistory', {
    domain: `${config.domain}`,
    expires,
    encode: (v) => v,
  });
  const historyCookieList = computed(() =>
    historyCookie.value
      ? JSON.parse(historyCookie.value.replace(/\|/g, ','))
      : []
  );

  const historyList = computed(() =>
    historyCookieList.value.map((el: any) => {
      const { traceId, ...location } = el.selectedLocation;
      return {
        traceId,
        location,
        dates: [new Date(el.dateInfo.checkIn), new Date(el.dateInfo.checkOut)],
        room: el.guestRoomInfo.roomCount,
        guest: el.guestRoomInfo.guestCount,
      };
    })
  );

  function removeHistory(item: Partial<HotelForm>) {
    if (historyList.value.length <= 1) {
      historyCookie.value = '';
    } else {
      const filteredHistory = historyCookieList.value.filter(
        (el: any) => el.selectedLocation.title !== item.location?.title
      );
      const filteredHistoryRaw = JSON.stringify(filteredHistory).replaceAll(
        ',',
        '|'
      );
      historyCookie.value = filteredHistoryRaw;
    }
  }

  function onClickLastSearch(item: Partial<HotelForm>) {
    setForm({ ...item });

    window.location.href = getRoute();
  }
</script>

<template>
  <div class="relative" v-if="historyList.length > 0">
    <button @click="toggle" ref="lastHistory" class="flex">
      <p class="text-neutral-tuna-300 text-sm font-bold">Pencarian Terakhir</p>
      <NuxtImg
        src="/icon-chevron.svg"
        width="20"
        height="20"
        class="ml-1.5 inline-block rotate-90"
        role="presentation"
      />
    </button>
    <div
      ref="lastHistoryModal"
      v-if="active"
      class="shadow-floating absolute right-0 z-10 mt-2 flex w-[280px] flex-col gap-3 rounded-2xl bg-white px-4 py-2"
    >
      <button
        v-for="(item, index) in historyList"
        :key="`history-${index}`"
        class="flex justify-between py-2"
        @click="onClickLastSearch(item)"
      >
        <div class="text-left">
          <p>{{ item.location.titleInHistory }}</p>
          <p class="text-neutral-tuna-300 text-sm">
            {{ format(item.dates[0], 'dd MMM yyyy') }} -
            {{ format(item.dates[1], 'dd MMM yyyy') }}
          </p>
        </div>
        <button class="shrink-0" @click.stop="removeHistory(item)">
          <NuxtImg alt="Remove Hotel History" src="/icon-remove.svg" />
        </button>
      </button>
    </div>
  </div>
</template>
