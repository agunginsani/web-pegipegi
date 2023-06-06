<script lang="ts" setup>
  import CalendarMonth from './CalendarMonth.vue';
  import useHoliday from 'common-module/composables/use-holiday';
  import type { BestPrice } from 'api/flight/best-price.get';
  import {
    startOfMonth,
    addMonths,
    addYears,
    getYear,
    getMonth,
    isAfter,
    isBefore,
    isSameDay,
    isThisMonth,
    startOfDay,
  } from 'date-fns';

  export type CalendarModelValue = [Date | undefined, Date | undefined];

  type CalendarProps = {
    modelValue: CalendarModelValue;
    ranged?: boolean;
    bestPrice?: BestPrice;
    disabledDates?: (param: Date) => boolean;
  };
  type CalendarEmits = {
    (e: 'update:modelValue', payload: CalendarModelValue): void;
    (e: 'select', payload: Date): void;
    (e: 'close'): void;
  };
  const props = defineProps<CalendarProps>();
  const emit = defineEmits<CalendarEmits>();

  function defaultDisabledDates(current: Date) {
    return (
      isBefore(current, startOfDay(new Date())) ||
      isAfter(current, addYears(startOfDay(new Date()), 1))
    );
  }

  // month picker
  const activeMonth = ref(props.modelValue[0] ?? startOfMonth(new Date()));
  const isPrevDisabled = computed(() => isThisMonth(activeMonth.value));
  const isNextDisabled = computed(() =>
    isBefore(startOfMonth(addMonths(new Date(), 11)), activeMonth.value)
  );
  function onMonthIncrement(increment: number) {
    activeMonth.value = addMonths(activeMonth.value, increment);
  }

  // holiday parser
  const { holiday } = await useHoliday();
  const segmentedHoliday = computed<Array<Record<string, string> | undefined>>(
    () => {
      return [activeMonth.value, addMonths(activeMonth.value, 1)].map(
        (month) => holiday.value?.[getYear(month)]?.[getMonth(month) + 1]
      );
    }
  );

  // event handler
  function onUpdate(input: Date) {
    emit('select', input);

    if (!props.ranged) {
      emit('update:modelValue', [input, undefined]);
    } else if (!!props.modelValue[1]) {
      emit('update:modelValue', [input, undefined]);
    } else if (
      !!props.modelValue[0] &&
      isBefore(input, props.modelValue[0]) &&
      !isSameDay(input, props.modelValue[0])
    ) {
      emit('update:modelValue', [input, props.modelValue[0]]);
    } else if (
      !!props.modelValue[0] &&
      !isSameDay(input, props.modelValue[0])
    ) {
      emit('update:modelValue', [props.modelValue[0], input]);
    }
  }
  const calendarRef = ref(null);
  onClickOutside(calendarRef, () => emit('close'));
</script>

<template>
  <div
    ref="calendarRef"
    class="shadow-raised z-30 flex w-[780px] gap-4 rounded-xl bg-white p-2 outline-none"
  >
    <button
      class="absolute left-5 top-5 disabled:opacity-25"
      @click="onMonthIncrement(-1)"
      :disabled="isPrevDisabled"
    >
      <NuxtImg
        class="-scale-x-100"
        src="/icon-chevron.svg"
        alt="Previous Month"
      />
    </button>

    <button
      class="absolute right-5 top-5 disabled:opacity-25"
      @click="onMonthIncrement(1)"
      :disabled="isNextDisabled"
    >
      <NuxtImg src="/icon-chevron.svg" alt="Next Month" />
    </button>

    <CalendarMonth
      :date="activeMonth"
      :modelValue="props.modelValue"
      :holiday="segmentedHoliday[0]"
      :disabledDates="props.disabledDates ?? defaultDisabledDates"
      @select="onUpdate"
    >
      <template #default="{ ...slotProps }">
        <slot v-bind="slotProps">
          <p
            class="text-neutral-tuna-300 h-4 text-[10px]"
            :class="{
              '!text-green-emerald-600':
                bestPrice?.[`${slotProps.monthNum}-${slotProps.year}`]?.[
                  slotProps.date
                ]?.cheapest,
            }"
          >
            {{
              slotProps.isDisabled
                ? '-'
                : bestPrice?.[`${slotProps.monthNum}-${slotProps.year}`]?.[
                    slotProps.date
                  ]?.shortFare
            }}
          </p>
        </slot>
      </template>
    </CalendarMonth>

    <CalendarMonth
      :date="addMonths(activeMonth, 1)"
      :modelValue="props.modelValue"
      :holiday="segmentedHoliday[1]"
      :disabledDates="props.disabledDates ?? defaultDisabledDates"
      @select="onUpdate"
    >
      <template #default="{ ...slotProps }">
        <slot v-bind="slotProps">
          <p
            class="text-neutral-tuna-300 h-4 text-[10px]"
            :class="{
              '!text-green-emerald-600':
                bestPrice?.[`${slotProps.monthNum}-${slotProps.year}`]?.[
                  slotProps.date
                ]?.cheapest,
            }"
          >
            {{
              slotProps.isDisabled
                ? '-'
                : bestPrice?.[`${slotProps.monthNum}-${slotProps.year}`]?.[
                    slotProps.date
                  ]?.shortFare
            }}
          </p>
        </slot>
      </template>
    </CalendarMonth>
  </div>
</template>
