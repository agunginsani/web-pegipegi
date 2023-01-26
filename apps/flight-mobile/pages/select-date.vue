<script lang="ts" setup>
  import { RouteMeta } from 'vue-router';
  import Calendar, {
    CalendarModelValue,
  } from 'home-module/components/Calendar.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import useFetchPrice from 'home-module/composables/use-fetch-price';
  // import dateUtil from 'common-module/utils/date';
  import { add, format, isBefore, isAfter, startOfDay } from 'date-fns';

  definePageMeta({
    middleware(to, from) {
      const { searchForm } = useSearchForm();
      if (!searchForm.departureDate.value) {
        return navigateTo('/');
      }

      if (!['departure', 'return'].includes(String(to.query.type))) {
        return navigateTo('/select-date?type=departure');
      }

      const transition: RouteMeta['pageTransition'] = {
        enterActiveClass:
          'fixed left-0 right-0 top-0 transition-all duration-[0.4s]',
        leaveActiveClass:
          'fixed left-0 right-0 top-0 transition-all duration-[0.4s]',
        enterFromClass: 'translate-x-full',
        enterToClass: 'translate-x-0',
        leaveToClass: 'translate-x-[-100%] brightness-50',
        mode: 'in-out',
      };

      to.meta.pageTransition = transition;
      from.meta.pageTransition = transition;
    },
  });

  const { searchForm, setSearchForm } = useSearchForm();
  const route = useRoute();
  const startDate = new Date();
  const endDate = add(startDate, { months: 12 });

  const modelValue = computed<CalendarModelValue>({
    get() {
      return [
        new Date(String(searchForm.departureDate.value)),
        searchForm.returnDate
          ? new Date(String(searchForm.returnDate.value))
          : undefined,
      ];
    },
    set(value) {
      setSearchForm({
        departureDate: {
          label: format(new Date(String(value[0])), 'EEEE, dd MMM yyyy'),
          value: String(value[0]),
        },
        returnDate: value[1]
          ? {
              label: format(value[1], 'EEEE, dd MMM yyyy'),
              value: String(value[1]),
            }
          : undefined,
      });
    },
  });

  const bestPrice = reactive<{
    [key: string]: {
      [key: string]: {
        cheapest: boolean;
        fare: string | number;
      };
    };
  }>({});

  async function fetchBestPrice(selectedDate: Date) {
    const month = format(selectedDate, 'MM');
    const year = format(selectedDate, 'yyyy');
    const monthKey = `${month}-${year}`;

    if (!!bestPrice[monthKey]) return;

    const query = {
      from:
        route.query.type === 'departure'
          ? searchForm.origin.value
          : searchForm.destination.value,
      to:
        route.query.type === 'departure'
          ? searchForm.destination.value
          : searchForm.origin.value,
      month,
      year,
      flightClass: searchForm.class.value,
    };

    const { data } = await useFetchPrice(query);
    if (!!data.value && data.value?.length > 0) {
      data.value.forEach((item) => {
        if (!bestPrice[monthKey]) bestPrice[monthKey] = {};
        if (item.shortFare) {
          bestPrice[monthKey][item.dateObj.day] = {
            fare: item.shortFare,
            cheapest: item.cheapest,
          };
        }
      });
    }
  }

  function getBestPrice(selectedDate: Date) {
    const month = format(selectedDate, 'MM-yyyy');
    const date = format(selectedDate, 'dd');
    return bestPrice[month]?.[date];
  }

  function parseTitle(input: string) {
    return input.replace(/\(.+\)/, '');
  }

  function disabledDates(input: Date) {
    return (
      isBefore(input, startOfDay(new Date())) ||
      isAfter(input, add(startOfDay(new Date()), { years: 1 }))
    );
  }

  await fetchBestPrice(startDate);
</script>

<template>
  <Calendar
    :startDate="startDate"
    :endDate="endDate"
    :isReturn="$route.query.type === 'return'"
    :disabledDates="disabledDates"
    v-model="modelValue"
    @select="fetchBestPrice"
    @back="$router.go(-1)"
  >
    <template #header="{ value }">
      <div class="flex flex-col justify-center">
        <h1 class="font-bold">
          <span>
            {{ parseTitle(searchForm.origin.label) }}
          </span>
          <NuxtImg
            class="mx-1 inline-block"
            width="16"
            height="16"
            :src="
              value[1] ? '/icon-arrow-roundtrip.svg' : '/icon-arrow-oneway.svg'
            "
            alt="To"
          />
          <span>
            {{ parseTitle(searchForm.destination.label) }}
          </span>
        </h1>
        <p class="text-neutral-tuna-300 text-xs">
          {{ searchForm.class.label }}
        </p>
      </div>
    </template>

    <template #addon="{ isDisabled, fullDate }">
      <p
        class="text-neutral-tuna-300 h-4 text-[10px]"
        :class="{ 'text-green-emerald-600': getBestPrice(fullDate)?.cheapest }"
      >
        {{ isDisabled ? '-' : getBestPrice(fullDate)?.fare }}
      </p>
    </template>
  </Calendar>
</template>
