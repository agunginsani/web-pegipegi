import type { CalendarModelValue } from 'search-module/components/Calendar.vue';
import { addDays, isBefore, isAfter, addYears, startOfDay } from 'date-fns';

export default function useRoundtripCalendar(date: Ref<CalendarModelValue>) {
  const checkboxValue = ref<Array<string>>([]);
  const isRoundTrip = computed(() => checkboxValue.value.length > 0);
  const activeCalendarType = ref<'departure' | 'return'>();
  const isDepartActive = computed(
    () => activeCalendarType.value === 'departure'
  );
  const isReturnActive = computed(() => activeCalendarType.value === 'return');

  const calendarValue = computed<CalendarModelValue>({
    get() {
      return activeCalendarType.value === 'departure'
        ? [date.value[0], undefined]
        : [date.value[1], undefined];
    },
    set(value) {
      if (!value || !value[0]) return;

      if (isDepartActive.value) {
        if (
          !isRoundTrip.value ||
          !date.value[1] ||
          isBefore(value[0], date.value[1])
        ) {
          date.value = [value[0], date.value[1]];
        } else {
          date.value = [value[0], addDays(value[0], 1)];
        }
      } else if (isReturnActive.value) date.value = [date.value[0], value[0]];
    },
  });

  function disabledDates(current: Date) {
    let min = isBefore(current, startOfDay(new Date()));
    if (isReturnActive.value)
      min = min || isBefore(current, date.value[0] as Date);
    return min || isAfter(current, addYears(startOfDay(new Date()), 1));
  }

  watch(checkboxValue, (value) => {
    if (value.length === 0) {
      date.value = [date.value[0], undefined];
    } else if (!date.value[1]) {
      date.value = [date.value[0], addDays(date.value[0] as Date, 1)];
    }
  });

  function onClick(type: 'departure' | 'return') {
    if (type === 'return' && !isRoundTrip.value) return;
    activeCalendarType.value = type;
  }

  function closeCalendar() {
    activeCalendarType.value = undefined;
  }

  return {
    calendarValue,
    checkboxValue,
    isDepartActive,
    isReturnActive,
    isRoundTrip,
    onClick,
    disabledDates,
    closeCalendar,
  };
}
