<script lang="ts" setup>
  import Calendar from 'home-module/components/Calendar.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import date from 'common-module/utils/date';

  definePageMeta({
    middleware(to, from) {
      const { searchForm } = useSearchForm();
      if (
        !['/departure-date', '/return-date'].includes(to.path) ||
        !searchForm.departureDate.value
      ) {
        return '/';
      }

      if (['/departure-date', '/return-date'].includes(from.path)) {
        to.meta.pageTransition = false;
      }
    },
  });
</script>

<template>
  <Calendar
    :isReturn="$route.params.type === 'return'"
    :disabledDates="
      (input) => date.isBefore(input, date.startOfDay(new Date()))
    "
    @back="$router.go(-1)"
  >
    <!-- TODO: integrate cheapest price -->
    <p class="text-neutral-tuna-300 text-[10px]">315</p>
  </Calendar>
</template>
