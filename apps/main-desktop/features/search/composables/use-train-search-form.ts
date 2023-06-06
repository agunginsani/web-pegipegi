import { format } from 'date-fns';
import { CalendarModelValue } from 'search-module/components/Calendar.vue';
import { isBefore, startOfDay, addDays } from 'date-fns';

type PassangerValue = {
  label: string;
  value: {
    adult: number;
    infant: number;
  };
};

export type TrainFormItemValue = {
  label: string;
  value: string;
};

export type TrainFormValue = {
  origin: TrainFormItemValue;
  destination: TrainFormItemValue;
  departureDate: TrainFormItemValue;
  returnDate?: TrainFormItemValue;
  passengers: PassangerValue;
};

export default function useFlightSearchForm() {
  const form = useState<TrainFormValue>(() => ({
    origin: {
      label: '',
      value: '',
    },
    destination: {
      label: '',
      value: '',
    },
    departureDate: {
      label: '',
      value: '',
    },
    returnDate: undefined,
    passengers: {
      label: '',
      value: {
        adult: 0,
        infant: 0,
      },
    },
  }));

  const dateModel = computed<CalendarModelValue>({
    get() {
      const departureDate = form.value.departureDate.value;
      const returnDate = form.value.returnDate?.value;
      return [
        new Date(departureDate),
        returnDate ? new Date(returnDate) : undefined,
      ];
    },
    set(newValue) {
      if (newValue[0]) {
        setForm({
          departureDate: {
            label: format(newValue[0], 'dd MMM yyyy'),
            value: newValue[0]?.toString(),
          },
        });
      }

      if (newValue[1]) {
        setForm({
          returnDate: {
            label: format(newValue[1], 'dd MMM yyyy'),
            value: newValue[1]?.toString(),
          },
        });
      } else {
        setForm({
          returnDate: undefined,
        });
      }
    },
  });

  function setForm(param: Partial<TrainFormValue>) {
    form.value = { ...form.value, ...param };
  }

  // set default values
  const isFormEmpty =
    form.value.origin.label === '' && form.value.origin.value === '';

  const lastSearch = useLocalStorage<Array<TrainFormValue>>(
    'train-web:last-search',
    []
  );

  lastSearch.value = lastSearch.value.filter(
    (item) =>
      !isBefore(new Date(item.departureDate.value), startOfDay(new Date()))
  );

  if (isFormEmpty && lastSearch.value.length === 0) {
    setForm({
      origin: {
        label: 'Jakarta',
        value: 'GMRALL',
      },
      destination: {
        label: 'Bandung',
        value: 'BDALL',
      },
      returnDate: undefined,
      passengers: {
        label: '1 Dewasa • 1 Bayi',
        value: {
          adult: 1,
          infant: 1,
        },
      },
    });
  } else if (isFormEmpty) {
    setForm(lastSearch.value[0]);
  }

  onMounted(() => {
    if (!form.value.departureDate.value) {
      const tomorrow = addDays(startOfDay(new Date()), 1);
      setForm({
        departureDate: {
          label: format(tomorrow, 'dd MMM yyyy'),
          value: tomorrow.toString(),
        },
      });
    }
  });

  return {
    form,
    dateModel,
    setForm,
    lastSearch,
  };
}
