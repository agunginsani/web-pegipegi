<script lang="ts" setup>
  import {
    format,
    isSameYear,
    addYears,
    startOfDay,
    differenceInDays,
  } from 'date-fns';
  import SearchFormInput from 'search-module/components/SearchFormInput.vue';
  import Calendar, {
    type CalendarModelValue,
  } from 'search-module/components/Calendar.vue';
  import useHotelSearchForm from 'search-module/composables/use-hotel-search-form';
  import usePopover from 'common-module/composables/use-popover';

  const { form, dateModel, night } = await useHotelSearchForm();
  const {
    triggerRef: hotelDate,
    targetRef: hotelCalendar,
    active,
    toggle,
    show,
    hide,
  } = usePopover();

  defineExpose({ show });

  const label = computed(() => {
    const { checkInDate, checkOutDate } = form.value;
    const formatDate = isSameYear(checkInDate!, checkOutDate!)
      ? 'dd MMM'
      : 'dd MMM yy';
    return `${format(checkInDate, formatDate)} - ${
      checkOutDate ? format(checkOutDate, 'dd MMM yy') : ''
    }`;
  });

  watch([() => form.value.checkInDate, () => form.value.checkOutDate], () => {
    dateModel.value = [form.value.checkInDate, form.value.checkOutDate];
  });

  function disabledDates(current: Date) {
    const checkInDate = form.value.checkInDate;
    const checkOutDate = form.value.checkOutDate;
    if (checkInDate && !checkOutDate) {
      return (
        differenceInDays(startOfDay(new Date()), current) > 0 ||
        differenceInDays(current, checkInDate) > 15 ||
        differenceInDays(checkInDate, current) > 15
      );
    }
    const nextYear = addYears(startOfDay(new Date()), 1);
    return (
      differenceInDays(startOfDay(new Date()), current) > 0 ||
      differenceInDays(current, nextYear) > 0
    );
  }

  function onUpdate([checkin, checkout]: CalendarModelValue) {
    if (!!checkout) hide();
  }
</script>

<template>
  <div class="relative">
    <SearchFormInput
      ref="hotelDate"
      label="Tanggal Menginap"
      icon="/icon-search-hotel-date.svg"
      :value="{ label }"
      :active="active"
      @click="toggle"
    >
      <div
        @click="toggle"
        class="bg-purple-affair-200 text-purple-affair-700 w-max rounded px-1 text-xs font-bold"
      >
        {{ night }} Malam
      </div>
    </SearchFormInput>

    <Calendar
      v-model="dateModel"
      :disabledDates="disabledDates"
      ref="hotelCalendar"
      v-show="active"
      class="absolute -left-1/2 z-10 mt-2 xl:left-0"
      ranged
      @update:modelValue="onUpdate"
    />
  </div>
</template>
