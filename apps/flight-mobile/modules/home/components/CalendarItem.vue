<script lang="ts" setup>
  import date from 'common-module/utils/date';
  type CalendarItemEmits = {
    (e: 'pick', payload: Date): void;
  };

  type DateValue = Date | string;

  type CalendarItemProps = {
    date: DateValue;
    modelValue: [DateValue | undefined, DateValue | undefined];
  };

  const props = defineProps<CalendarItemProps>();
  const emit = defineEmits<CalendarItemEmits>();

  const header = computed(() => date.format(new Date(props.date), 'MMMM yyyy'));

  const dates = computed(() => {
    const pointer = new Date(props.date);

    const year = Number(date.format(pointer, 'yyyy'));
    const month = Number(date.format(pointer, 'M'));
    const numOfDays = Number(date.format(date.endOfMonth(pointer), 'd'));

    const returnValue: Array<{
      date: number;
      dayNum: number;
      fullDate: Date;
      isActive: boolean;
    }> = [];

    for (let i = 1; i <= numOfDays; i++) {
      const fullDate = new Date(year, month - 1, i);
      const isActive =
        date.isSameDay(
          fullDate,
          props.modelValue[0] ? new Date(props.modelValue[0]) : 0
        ) ||
        date.isSameDay(
          fullDate,
          props.modelValue[1] ? new Date(props.modelValue[1]) : 0
        );

      returnValue.push({
        date: i,
        dayNum: Number(date.format(fullDate, 'i')),
        fullDate,
        isActive,
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
      <div v-for="date in dates" class="py-3 text-center">
        <button v-if="date" @click="$emit('pick', date.fullDate)">
          <p class="mb-1 text-sm" :class="{ 'bg-red-400': date.isActive }">
            {{ date.date }}
          </p>
          <slot />
        </button>
      </div>
    </div>
  </li>
</template>
