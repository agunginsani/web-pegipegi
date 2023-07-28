<script lang="ts" setup>
  import HomeSection from './HomeSection.vue';
  import SaleTimer from './SaleTimer.vue';
  import HotelList from 'home-module/components/HotelList.vue';
  import type {
    HotelDealsItemsRequest,
    HotelDealsItem,
  } from 'api/hotel-deals-items.get';
  import type { HotelDealsDetail } from 'api/hotel-deals.get';
  import toLeadingZero from 'common-module/utils/to-leading-zero';
  import { format } from 'date-fns';

  const config = useRuntimeConfig();

  //#region hotel quickfilter fetch
  const key = 'hotel-deals-qf';
  const { data: hotelDeals, pending: pendingHotelDeals } = useLazyFetch(
    '/api/hotel-deals',
    {
      key,
      params: {
        device_origin: 'web',
      },
    }
  );

  function removeDeals(quickFilterId: string) {
    if (!hotelDeals.value) return;
    const idx = hotelDeals.value.findIndex(
      (val) => val.quickFilterId == quickFilterId
    );
    if (idx < 0) return;
    hotelDeals.value.splice(idx, 1);
  }
  //#endregion

  //#region hotel list initial fetch
  const today = new Date();
  function getFirstSelection(dealsDetail: HotelDealsDetail) {
    return dealsDetail.labels[0];
  }
  const bulkParams = hotelDeals.value?.reduce(
    (acc, currVal, index, arr) => ({
      quickFilterIds:
        acc.quickFilterIds +
        currVal.quickFilterId +
        (index === arr.length - 1 ? '' : ','),
      flashSaleFlags:
        acc.flashSaleFlags +
        currVal.isFlashSale +
        (index === arr.length - 1 ? '' : ','),
      labelCds:
        acc.labelCds +
        getFirstSelection(currVal).labelCd +
        (index === arr.length - 1 ? '' : ','),
      labelNames:
        acc.labelNames +
        getFirstSelection(currVal).labelName +
        (index === arr.length - 1 ? '' : ','),
    }),
    { quickFilterIds: '', flashSaleFlags: '', labelCds: '', labelNames: '' }
  );
  const hotelListParams: HotelDealsItemsRequest = {
    room: 1,
    night: 1,
    adultNumMax: 2,
    stayDay: `${today.getFullYear()}-${toLeadingZero(
      today.getMonth() + 1
    )}-${toLeadingZero(today.getDate())}`,
    device_origin: 'web',
    quickFilterIds: bulkParams?.quickFilterIds || '',
    flashSaleFlags: bulkParams?.flashSaleFlags || '',
    labelCds: bulkParams?.labelCds || '',
    labelNames: bulkParams?.labelNames || '',
  };
  const { data: hotelLists, execute: executeItems } = useLazyFetch(
    '/api/hotel-deals-items',
    {
      params: hotelListParams,
      transform: (data): Record<string, HotelDealsItem> =>
        data.reduce(
          (acc, currVal) => ({ ...acc, [currVal.quickFilterId]: currVal }),
          {}
        ),
      immediate: false,
    }
  );
  function onFilterSelected(result: HotelDealsItem) {
    if (!hotelLists.value) return;
    hotelLists.value[result.quickFilterId] = result;
  }
  //#endregion
  function getSearchUrl(
    deal: HotelDealsDetail
  ): { link: string; label: string } | undefined {
    if (
      hotelLists.value &&
      hotelLists.value[deal.quickFilterId]?.hotelCards?.length
    ) {
      const searchParams = new URLSearchParams();
      searchParams.append('quickFilter', deal.quickFilterId);
      searchParams.append('stayDay', format(new Date(), 'yyyy-MM-dd'));
      searchParams.append('night', '1');
      searchParams.append('room', '1');
      searchParams.append('adultNumMax', '2');
      searchParams.append(
        'cityCd',
        hotelLists.value[deal.quickFilterId].labelCd
      );

      return {
        link: `${config.public.homeUrl}/hotel/${
          hotelLists.value[deal.quickFilterId].labelName
        }?${searchParams.toString()}`,
        label: 'Lihat semua',
      };
    }
    return undefined;
  }

  onMounted(async () => {
    if (hotelDeals.value?.length) {
      await executeItems();
    }
  });
</script>

<template>
  <HomeSection
    v-for="deal in hotelDeals"
    :section-id="`sale-${deal.quickFilterId}`"
    :icon="
      Number(deal.isFlashSale)
        ? '/icon-section-flashsale.svg'
        : '/icon-salecation.svg'
    "
    :href="getSearchUrl(deal)"
  >
    <template #title>
      {{ deal.quickFilterName }}
      <SaleTimer
        v-if="Number(deal.isFlashSale)"
        class="ml-3 inline-flex align-text-bottom"
        :duration="deal.endTime || 0"
        @finished="removeDeals(deal.quickFilterId)"
      />
    </template>

    <template #descriptions>
      {{ deal.quickFilterDescription }}
    </template>

    <HotelList
      :is-filters-loading="pendingHotelDeals"
      :deals-detail="deal"
      :deals-item="hotelLists ? hotelLists[deal.quickFilterId] : ({} as HotelDealsItem)"
      @filter="onFilterSelected"
    />
  </HomeSection>
</template>
