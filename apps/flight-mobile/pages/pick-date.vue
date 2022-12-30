<script lang="ts" setup>
  import Calendar from 'home-module/components/Calendar.vue';
  import useSearchForm from 'home-module/composables/use-search-form';
  import date from 'common-module/utils/date';

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
</script>

<template>
  <Calendar
    :isReturn="$route.query.type === 'return'"
    :disabledDates="
      (input: Date) => date.isBefore(input, date.startOfDay(new Date()))
    "
    @back="$router.go(-1)"
  >
    <!-- TODO: integrate cheapest price -->
    <p class="text-neutral-tuna-300 text-[10px]">315</p>
  </Calendar>
</template>
