<script lang="ts" setup>
  import Calendar, {
    CalendarModelValue,
  } from 'home-module/components/Calendar.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import dateUtil from 'common-module/utils/date';

  definePageMeta({
    middleware(from, to) {
      const { searchForm } = useSearchForm();
      if (!searchForm.departureDate.value) {
        return '/';
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

  // const modelValue = ref<CalendarModelValue>([
  //   dateUtil.startOfDay(new Date()),
  //   dateUtil.startOfDay(dateUtil.add(new Date(), { days: 1 }))
  // ])
</script>

<template>
  <Calendar
    :isReturn="$route.query.type === 'return'"
    :disabledDates="disabledDates"
    v-model="modelValue"
    @back="$router.go(-1)"
  >
    <!-- TODO: integrate cheapest price -->
    <p class="text-neutral-tuna-300 text-[10px]">315</p>
  </Calendar>
</template>
