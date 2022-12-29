<script lang="ts" setup>
  import date from 'common-module/utils/date';
  type CalendarItemEmits = {
    (e: 'pick', payload: Date): void;
  };

  type DateValue = Date | string;

  type CalendarItemProps = {
    date: DateValue;
    modelValue: [DateValue, DateValue | undefined];
    disabledDates?: (date: Date) => boolean;
  };

  const props = defineProps<CalendarItemProps>();
  const emit = defineEmits<CalendarItemEmits>();

  function parseDate(input: any) {
    return input ? new Date(input) : 0;
  }

  const header = computed(() => date.format(new Date(props.date), 'MMMM yyyy'));

  const dates = computed(() => {
    const pointer = new Date(props.date);

    const today = date.startOfDay(new Date());
    const year = Number(date.format(pointer, 'yyyy'));
    const month = Number(date.format(pointer, 'M'));
    const numOfDays = Number(date.format(date.endOfMonth(pointer), 'd'));

    const returnValue: Array<{
      date: number;
      dayNum: number;
      fullDate: Date;
      isActive: boolean;
      isInRange: boolean;
      isPast: boolean;
      isToday: boolean;
      isHoliday: boolean;
      isStart: boolean;
      isEnd: boolean;
      isDisabled: boolean;
    }> = [];

    for (let i = 1; i <= numOfDays; i++) {
      const fullDate = new Date(year, month - 1, i);
      const dayNum = Number(date.format(fullDate, 'i'));
      const isStart = date.isSameDay(
        fullDate,
        props.modelValue[0] ? new Date(props.modelValue[0]) : 0
      );
      const isEnd = date.isSameDay(
        fullDate,
        props.modelValue[1] ? new Date(props.modelValue[1]) : 0
      );
      const isActive = isStart || isEnd;

      returnValue.push({
        date: i,
        dayNum,
        fullDate,
        isActive,
        isStart,
        isEnd,
        isInRange:
          date.isBefore(fullDate, parseDate(props.modelValue[1])) &&
          date.isAfter(fullDate, parseDate(props.modelValue[0])),
        isPast: date.isBefore(fullDate, today),
        isToday: date.isSameDay(fullDate, today),
        isDisabled: props.disabledDates?.(fullDate) || false,
        // TODO: compute values below
        isHoliday: dayNum >= 6,
      });
    }

    const lastMonthDates = Array.from(
      { length: returnValue[0].dayNum - 1 },
      () => null
    );

    return [...lastMonthDates, ...returnValue];
  });
</script>

<template>
  <li class="border-yellow-candle-400 m-3 rounded-xl border bg-white">
    <h2 class="mb-2 p-3 font-bold">{{ header }}</h2>
    <div class="grid grid-cols-7">
      <div v-for="date in dates">
        <button
          v-if="date"
          class="relative mb-4 w-full"
          :class="{ 'pointer-events-none opacity-50': date.isDisabled }"
          @click="$emit('pick', date.fullDate)"
        >
          <div
            v-if="date.isStart && modelValue[1]"
            class="bg-orange-inter-50 absolute left-1/2 top-0 h-9 w-1/2"
          ></div>
          <div
            v-if="date.isEnd"
            class="bg-orange-inter-50 absolute right-1/2 top-0 h-9 w-1/2"
          ></div>
          <div
            v-if="date.isInRange"
            class="bg-orange-inter-50 absolute left-0 top-0 h-9 w-full"
          ></div>
          <div
            v-if="date.isActive"
            class="bg-orange-inter-600 absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full"
          ></div>
          <p
            class="relative mb-1 h-9 text-sm leading-9"
            :class="{
              '!text-white': date.isActive,
              '!text-orange-inter-600': date.isInRange,
              'text-red-flower-700': date.isHoliday,
            }"
          >
            {{ date.date }}
          </p>
          <div class="relative">
            <slot v-if="!date.isDisabled" />
          </div>
        </button>
      </div>
    </div>
  </li>
</template>
