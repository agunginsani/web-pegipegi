<script lang="ts" setup>
  import Calendar, {
    CalendarModelValue,
  } from 'home-module/components/Calendar.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import dateUtil from 'common-module/utils/date';

  definePageMeta({
    middleware(to, from) {
      const { searchForm } = useSearchForm();
      if (!searchForm.departureDate.value) {
        return navigateTo('/');
      }

      if (!['departure', 'return'].includes(String(to.query.type))) {
        return navigateTo('/select-date?type=departure');
      }

      const transition = {
        enterActiveClass:
          'fixed left-0 right-0 top-0 transition-all duration-[0.4s]',
        leaveActiveClass:
          'fixed left-0 right-0 top-0 transition-all duration-[0.4s]',
        enterFromClass: 'translate-x-full',
        enterToClass: 'translate-x-0',
        leaveToClass: 'translate-x-[-100%] brightness-50',
        mode: 'in-out',
      };

      to.meta.pageTransition = transition as typeof to.meta.pageTransition;
      from.meta.pageTransition = transition as typeof from.meta.pageTransition;
    },
  });

  function parseTitle(input: string) {
    return input.replace(/\(.+\)/, '');
  }

  function disabledDates(input: Date) {
    return (
      dateUtil.isBefore(input, dateUtil.startOfDay(new Date())) ||
      dateUtil.isAfter(
        input,
        dateUtil.add(dateUtil.startOfDay(new Date()), { years: 1 })
      )
    );
  }

  const { searchForm, setSearchForm } = useSearchForm();
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
          label: dateUtil.format(
            new Date(String(value[0])),
            'EEEE, dd MMM yyyy'
          ),
          value: String(value[0]),
        },
        returnDate: value[1]
          ? {
              label: dateUtil.format(value[1], 'EEEE, dd MMM yyyy'),
              value: String(value[1]),
            }
          : undefined,
      });
    },
  });

  const startDate = new Date();
  const endDate = dateUtil.add(startDate, { months: 12 });
</script>

<template>
  <Calendar
    :startDate="startDate"
    :endDate="endDate"
    :isReturn="$route.query.type === 'return'"
    :disabledDates="disabledDates"
    v-model="modelValue"
    @back="$router.go(-1)"
  >
    <template #header="{ value }">
      <div class="flex flex-col justify-center">
        <h1 class="font-bold">
          <span>
            {{ parseTitle(searchForm.origin.label) }}
          </span>
          <NuxtImg
            class="mx-1 inline-block h-4 w-4"
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

    <!-- TODO: integrate cheapest price -->
    <template #addon="{ isDisabled }">
      <p class="text-neutral-tuna-300 text-[10px]">
        {{ isDisabled ? '-' : '315' }}
      </p>
    </template>
  </Calendar>
</template>
