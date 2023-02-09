<script lang="ts" setup>
  import Calendar, {
    CalendarModelValue,
  } from 'home-module/components/Calendar.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import useCalendarBestPrice from 'home-module/composables/use-calendar-best-price';
  import { add, format, isBefore, isAfter, startOfDay } from 'date-fns';

  definePageMeta({
    middleware(to) {
      const { searchForm } = useSearchForm();
      if (!searchForm.departureDate.value) {
        return navigateTo('/');
      }

      if (!['departure', 'return'].includes(String(to.query.type))) {
        return navigateTo('/select-date?type=departure');
      }
    },
  });

  useHead({
    meta: [{ hid: 'robots', name: 'robots', content: 'noindex, nofollow' }],
  });

  const router = useRouter();
  const startDate = new Date();
  const endDate = add(startDate, { months: 12 });
  const { searchForm, setSearchForm, setBestPrice } = useSearchForm();
  const { bestPrice } = await useCalendarBestPrice(startDate, endDate);

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

  function parseTitle(input: string) {
    return input.replace(/\(.+\)/, '');
  }

  function disabledDates(input: Date) {
    return (
      isBefore(input, startOfDay(new Date())) ||
      isAfter(input, add(startOfDay(new Date()), { years: 1 }))
    );
  }

  function onSave() {
    const departureMonth = format(
      new Date(searchForm.departureDate.value),
      'MM-yyyy'
    );
    const departureDate = format(
      new Date(searchForm.departureDate.value),
      'dd'
    );

    if (searchForm.returnDate?.value) {
      const returnMonth = format(
        new Date(searchForm.returnDate?.value),
        'MM-yyyy'
      );
      const returnDate = format(new Date(searchForm.returnDate?.value), 'dd');

      setBestPrice({
        departurePrice: bestPrice.value[departureMonth]?.[departureDate]?.fare,
        returnPrice: bestPrice.value[returnMonth]?.[returnDate]?.fare,
      });
    } else {
      setBestPrice({
        departurePrice: bestPrice.value[departureMonth]?.[departureDate]?.fare,
        returnPrice: undefined,
      });
    }

    router.go(-1);
  }
</script>

<template>
  <Calendar
    :startDate="startDate"
    :endDate="endDate"
    :isReturn="$route.query.type === 'return'"
    :disabledDates="disabledDates"
    v-model="modelValue"
    @back="onSave"
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

    <template #addon="{ isDisabled, monthNum, date, year }">
      <p
        class="text-neutral-tuna-300 h-4 text-[10px]"
        :class="{
          'text-green-emerald-600':
            bestPrice[`${monthNum}-${year}`]?.[date]?.cheapest,
        }"
      >
        {{
          isDisabled ? '-' : bestPrice[`${monthNum}-${year}`]?.[date]?.shortFare
        }}
      </p>
    </template>
  </Calendar>
</template>
