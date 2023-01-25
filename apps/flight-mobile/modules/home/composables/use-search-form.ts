import useFetchSeatClasses from 'home-module/composables/use-fetch-seat-classes';

export type PassangerValue = {
  value: {
    adult: number;
    child: number;
    infant: number;
  };
  label: string;
};

export type SearchFormItemValue = {
  value: string;
  label: string;
};

export type SearchFormValue = {
  origin: SearchFormItemValue;
  destination: SearchFormItemValue;
  departureDate: SearchFormItemValue;
  returnDate?: SearchFormItemValue;
  passengers: PassangerValue;
  class: SearchFormItemValue;
};

type SeatClassItem = {
  code: string;
  displayName: string;
  description: string;
};

export default defineStore('searchForm', () => {
  const seatClass = reactive<Array<SeatClassItem>>([]);

  const searchForm = reactive<SearchFormValue>({
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
        child: 0,
        infant: 0,
      },
    },
    class: {
      label: '',
      value: '',
    },
  });

  function setSearchForm(payload: Partial<SearchFormValue>) {
    Object.assign(searchForm, payload);
  }

  async function initiateSeatClass() {
    if (seatClass.length > 0) return;

    const { data: seats } = await useFetchSeatClasses();
    Object.assign(seatClass, seats.value);
  }

  return {
    searchForm,
    setSearchForm,
    seatClass,
    initiateSeatClass,
  };
});
