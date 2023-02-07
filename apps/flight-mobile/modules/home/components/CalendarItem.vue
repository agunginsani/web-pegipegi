<script lang="ts" setup>
  import {
    endOfMonth,
    format,
    isBefore,
    isAfter,
    isSameDay,
    startOfDay,
  } from 'date-fns';
  import { CalendarModelValue } from 'home-module/components/Calendar.vue';

  type CalendarItemSlotProps = {
    date: number;
    dayNum: number;
    monthNum: number;
    year: number;
    fullDate: Date;
    label: string;
    isActive: boolean;
    isInBetween: boolean;
    isInRange: boolean;
    isPast: boolean;
    isToday: boolean;
    isHoliday: boolean;
    isStart: boolean;
    isEnd: boolean;
    isDisabled: boolean;
  };

  type CalendarItemEmits = {
    (e: 'select', payload: Date): void;
  };

  type CalendarItemProps = {
    date: Date;
    holiday?: { [key: number]: String };
    modelValue: CalendarModelValue;
    disabledDates?: (date: Date) => boolean;
  };

  const props = defineProps<CalendarItemProps>();
  const emit = defineEmits<CalendarItemEmits>();

  function parseDate(input: any) {
    return input ? new Date(input) : 0;
  }

  const header = computed(() => format(new Date(props.date), 'MMMM yyyy'));

  const dates = computed(() => {
    const pointer = new Date(props.date);

    const today = startOfDay(new Date());
    const year = Number(format(pointer, 'yyyy'));
    const monthNum = Number(format(pointer, 'MM'));
    const numOfDays = Number(format(endOfMonth(pointer), 'd'));

    const returnValue: Array<CalendarItemSlotProps> = [];

    for (let i = 1; i <= numOfDays; i++) {
      const fullDate = new Date(year, monthNum - 1, i);
      const label = format(fullDate, 'dd MMMM yyyy');
      const dayNum = Number(format(fullDate, 'i'));
      const isStart = isSameDay(
        fullDate,
        props.modelValue[0] ? new Date(props.modelValue[0]) : 0
      );
      const isEnd = isSameDay(
        fullDate,
        props.modelValue[1] ? new Date(props.modelValue[1]) : 0
      );
      const isActive = isStart || isEnd;
      const isInBetween =
        isBefore(fullDate, parseDate(props.modelValue[1])) &&
        isAfter(fullDate, parseDate(props.modelValue[0]));

      returnValue.push({
        date: i,
        dayNum,
        monthNum,
        year,
        fullDate,
        label,
        isActive,
        isStart,
        isEnd,
        isInBetween,
        isInRange: isInBetween || isActive,
        isPast: isBefore(fullDate, today),
        isToday: isSameDay(fullDate, today),
        isDisabled: props.disabledDates?.(fullDate) || false,
        isHoliday: !!props.holiday?.[i],
      });
    }

    const lastMonthDates = Array.from(
      { length: returnValue[0].dayNum - 1 },
      () => ({
        monthNum,
        date: null,
      })
    );

    return [...lastMonthDates, ...returnValue];
  });
</script>

<template>
  <li class="border-yellow-candle-400 m-3 rounded-xl border bg-white">
    <h2 class="mb-2 p-3 font-bold">{{ header }}</h2>
    <div class="grid grid-cols-7">
      <div
        v-for="(date, index) in dates"
        :key="`date-${date.monthNum}-${index}`"
        class="mb-4"
      >
        <button
          v-if="date.date"
          class="relative w-full"
          :class="{ 'pointer-events-none': date.isDisabled }"
          @click="emit('select', date.fullDate)"
          :aria-label="date.label"
        >
          <p
            v-if="date.isToday"
            class="text-neutral-tuna-300 absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs"
          >
            Hari ini
          </p>
          <div
            v-if="date.isToday"
            class="border-neutral-tuna-50 absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full border"
          />
          <div
            v-if="date.isStart && modelValue[1]"
            class="bg-orange-inter-50 absolute left-1/2 top-0 h-9 w-1/2"
          />
          <div
            v-if="date.isEnd"
            class="bg-orange-inter-50 absolute right-1/2 top-0 h-9 w-1/2"
          />
          <div
            v-if="date.isInBetween"
            class="bg-orange-inter-50 absolute left-0 top-0 h-9 w-full"
          />
          <div
            v-if="date.isActive"
            class="bg-orange-inter-600 absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full"
          />
          <p
            class="relative mb-1 h-9 text-sm leading-9"
            :class="{
              'opacity-30': date.isDisabled,
              '!text-white': date.isActive,
              'text-orange-inter-600': date.isInBetween && !date.isHoliday,
              'text-red-flower-700': date.isHoliday,
            }"
          >
            {{ date.date }}
          </p>
          <div class="relative">
            <slot v-bind="date" />
          </div>
        </button>
      </div>
    </div>
    <ul class="px-3 pb-3">
      <li
        v-for="(eventName, date) in holiday"
        class="mb-1 flex text-xs last:mb-0"
      >
        <p class="text-red-flower-700 w-7">{{ date }}</p>
        <p>{{ eventName }}</p>
      </li>
    </ul>
  </li>
</template>
