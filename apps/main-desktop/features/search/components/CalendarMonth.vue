<script lang="ts" setup>
  import {
    endOfMonth,
    format,
    isBefore,
    isAfter,
    isSameDay,
    startOfDay,
  } from 'date-fns';

  import type { CalendarModelValue } from './Calendar.vue';

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

  type CalendarItemProps = {
    date: Date;
    holiday?: Record<string, string>;
    modelValue: CalendarModelValue;
    disabledDates?: (date: Date) => boolean;
  };

  type CalendarItemEmits = {
    (e: 'select', payload: Date): void;
  };

  const props = defineProps<CalendarItemProps>();
  const emit = defineEmits<CalendarItemEmits>();

  function parseDate(input: any) {
    return input ? startOfDay(new Date(input)) : 0;
  }

  const header = computed(() => format(new Date(props.date), 'MMMM yyyy'));

  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

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
        isHoliday: !!props.holiday?.[i] || dayNum > 5,
      });
    }

    const lastMonthDates = Array.from(
      { length: returnValue[0].dayNum - 1 },
      () => ({
        date: undefined,
        dayNum: undefined,
        monthNum,
        year: undefined,
        fullDate: undefined,
        label: '',
        isActive: false,
        isStart: false,
        isEnd: false,
        isInBetween: false,
        isInRange: false,
        isPast: true,
        isToday: false,
        isDisabled: true,
        isHoliday: false,
      })
    );

    return [...lastMonthDates, ...returnValue];
  });

  function onDateClick(input: Date | undefined) {
    if (input) emit('select', input);
  }
</script>

<template>
  <div class="w-full rounded-xl bg-white">
    <h2 class="mb-2 p-3 text-center font-bold">
      {{ header }}
    </h2>
    <div class="grid grid-cols-7">
      <p
        class="mb-4 text-center"
        :class="{
          'text-red-flower-700': i > 4,
        }"
        v-for="(day, i) in days"
        :key="`day-label-${i}`"
      >
        {{ day }}
      </p>

      <button
        v-for="(date, index) in dates"
        :key="`date-${date.monthNum}-${index}`"
        :disabled="date.isDisabled"
        :aria-label="date.label"
        class="mb-4"
        @click="onDateClick(date.fullDate)"
      >
        <div
          v-if="date.date"
          class="relative w-full"
          :class="{ 'pointer-events-none': date.isDisabled }"
        >
          <template v-if="date.isToday">
            <p
              class="text-neutral-tuna-300 absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs"
            >
              Hari ini
            </p>
            <div
              class="border-neutral-tuna-50 absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full border"
            />
          </template>
          <div
            v-if="date.isStart && modelValue[1] && !date.isEnd"
            class="bg-orange-inter-50 absolute left-1/2 top-0 h-9 w-1/2"
          />
          <div
            v-if="date.isEnd && !date.isStart"
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
          <!-- TODO: implement arrow cursor selection -->
          <!-- <div
            v-if="active"
            class="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full bg-gray-900 opacity-10"
          /> -->
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
        </div>
      </button>
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
  </div>
</template>
