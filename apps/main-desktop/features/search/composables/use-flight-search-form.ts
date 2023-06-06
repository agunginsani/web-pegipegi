import { format } from 'date-fns';
import { CalendarModelValue } from 'search-module/components/Calendar.vue';
import { isBefore, startOfDay, addDays } from 'date-fns';

type PassangerValue = {
  label: string;
  value: {
    adult: number;
    child: number;
    infant: number;
  };
};

export type FlightFormItemValue = {
  label: string;
  value: string;
  payload?: {
    cityName: string;
  };
};

export type FlightFormValue = {
  origin: FlightFormItemValue;
  destination: FlightFormItemValue;
  departureDate: FlightFormItemValue;
  returnDate?: FlightFormItemValue;
  passengers: PassangerValue;
  seatClass: FlightFormItemValue;
};

export default function useFlightSearchForm() {
  const form = useState<FlightFormValue>(() => ({
    origin: {
      label: '',
      value: '',
      payload: {
        cityName: '',
      },
    },
    destination: {
      label: '',
      value: '',
      payload: {
        cityName: '',
      },
    },
    departureDate: {
      label: '',
      value: '',
    },
    returnDate: undefined,
    seatClass: {
      label: '',
      value: '',
    },
    passengers: {
      label: '',
      value: {
        adult: 0,
        child: 0,
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

  function setForm(param: Partial<FlightFormValue>) {
    form.value = { ...form.value, ...param };
  }

  // TODO: enable seat class filter if flight search page can accomodate
  // const seatClassOptions = useState<Array<FlightFormItemValue>>(() => []);

  // if (seatClassOptions.value.length === 0) {
  //   const { data: seats } = await useFetch('/api/flight/seat-class');
  //   seatClassOptions.value = seats.value ?? [];
  // }

  // set default values
  const isFormEmpty =
    form.value.origin.label === '' && form.value.origin.value === '';

  const lastSearch = useLocalStorage<Array<FlightFormValue>>(
    'flight-web:last-search',
    []
  );

  lastSearch.value = lastSearch.value.filter(
    (item) =>
      !isBefore(new Date(item.departureDate.value), startOfDay(new Date()))
  );

  if (isFormEmpty && lastSearch.value.length === 0) {
    setForm({
      origin: {
        label: 'Jakarta, Indonesia',
        value: 'JKT',
        payload: {
          cityName: 'Kota Jakarta',
        },
      },
      destination: {
        label: 'Ngurah Rai International Airport - DPS',
        value: 'DPS',
      },
      returnDate: undefined,
      passengers: {
        label: '1 Dewasa • 0 Anak • 0 Bayi',
        value: {
          adult: 1,
          child: 0,
          infant: 0,
        },
      },
      // TODO: enable seat class filter if flight search page can accomodate
      // seatClass: {
      //   label: seatClassOptions.value[0].label,
      //   value: seatClassOptions.value[0].value,
      // },
    });
  } else if (isFormEmpty && lastSearch.value.length > 0) {
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
    lastSearch,
    setForm,
    // seatClassOptions,
  };
}
