import type { CalendarModelValue } from 'search-module/components/Calendar.vue';
import { addDays, isBefore, isAfter, startOfDay, addYears } from 'date-fns';

type DateType = 'departure' | 'return';

export default function useRoundtripCalendar(
  date: Ref<CalendarModelValue>,
  next?: () => void
) {
  const checkboxValue = ref<Array<string>>([]);
  const isDepartActive = ref(false);
  const isReturnActive = ref(false);
  const isRoundTrip = computed(() => checkboxValue.value.length > 0);

  watch(checkboxValue, (value) => {
    if (value.length === 0) {
      date.value = [date.value[0], undefined];
    } else if (!date.value[1]) {
      date.value = [date.value[0], addDays(date.value[0] as Date, 1)];
    }
  });

  watch(
    () => date.value,
    () => {
      if (date.value[1] && checkboxValue.value.length === 0) {
        checkboxValue.value = ['return'];
      }
    },
    { immediate: true }
  );

  function onClick(type: DateType) {
    if (type === 'departure') {
      isDepartActive.value = true;
    } else if (type === 'return') {
      isReturnActive.value = true;
    }
  }

  function onClose() {
    isDepartActive.value = false;
    isReturnActive.value = false;
  }

  function onSelect(value: Date) {
    if (isDepartActive.value) {
      if (isRoundTrip.value && isBefore(date.value[1] ?? new Date(), value)) {
        date.value = [value, undefined];
      } else {
        date.value = [value, date.value[1]];
      }

      isDepartActive.value = false;
      if (isRoundTrip.value) {
        isReturnActive.value = true;
      } else {
        next?.();
      }
    } else {
      date.value = [date.value[0], value];
      isReturnActive.value = false;
      next?.();
    }
  }

  function disabledDates(current: Date) {
    return (
      isBefore(current, startOfDay(new Date())) ||
      isAfter(current, addYears(startOfDay(new Date()), 1)) ||
      (isRoundTrip.value &&
        isReturnActive.value &&
        isBefore(current, date.value[0] ?? new Date()))
    );
  }

  return {
    checkboxValue,
    isDepartActive,
    isReturnActive,
    isRoundTrip,
    disabledDates,
    onClick,
    onClose,
    onSelect,
  };
}
