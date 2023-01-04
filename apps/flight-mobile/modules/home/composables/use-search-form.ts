type PassangerValue = {
  adult: number;
  child: number;
  infant: number;
};

export type SearchFormValue = {
  value: string | PassangerValue;
  label: string;
};

type SearchFormKey =
  | 'origin'
  | 'destination'
  | 'departureDate'
  | 'returnDate'
  | 'passengers'
  | 'class';

type SearchForm = {
  origin: SearchFormValue;
  destination: SearchFormValue;
  departureDate: SearchFormValue;
  returnDate?: SearchFormValue;
  passengers: SearchFormValue;
  class: SearchFormValue;
};

export default defineStore('searchForm', () => {
  const searchForm = reactive<SearchForm>({
    origin: {
      label: 'Jakarta (JKT)',
      value: 'JKT',
    },
    destination: {
      label: 'Denpasar / Bali (DPS)',
      value: 'DPS',
    },
    departureDate: {
      label: '',
      value: '',
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
    class: {
      label: 'Ekonomi',
      value: 'EKO',
    },
  });

  function setSearchForm(payload: Partial<SearchForm>) {
    Object.entries(payload).forEach(([key, value]) => {
      searchForm[key as SearchFormKey] = value;
    });
  }

  return {
    searchForm,
    setSearchForm,
  };
});
