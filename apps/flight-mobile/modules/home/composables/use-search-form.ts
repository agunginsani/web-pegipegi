export type PassangerValue = {
  value: {
    adult: number;
    child: number;
    infant: number;
  };
  label: string;
};

export type SearchFormValue = {
  value: string;
  label: string;
};

export type SearchForm = {
  origin: SearchFormValue;
  destination: SearchFormValue;
  departureDate: SearchFormValue;
  returnDate?: SearchFormValue;
  passengers: PassangerValue;
  class: SearchFormValue;
};

type FlightClassItem = {
  code: string;
  displayName: string;
  description: string;
};

export default defineStore('searchForm', () => {
  const availableClass = reactive<Array<FlightClassItem>>([]);

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
      label: '',
      value: '',
    },
  });

  function setSearchForm(payload: Partial<SearchForm>) {
    Object.assign(searchForm, payload);
  }

  function initiateAvailableClass() {
    if (availableClass.length > 0) return;

    // TODO: fetch from api
    const response = [
      {
        code: 'ECONOMY',
        displayName: 'Ekonomi',
        description: 'Pilihan paling hemat untuk sampai ke destinasi',
      },
      {
        code: 'PREMIUMECONOMY',
        displayName: 'Premium Ekonomi',
        description:
          'Mau terbang tetap hemat dengan ruang kaki ekstra? Pilih yang ini!',
      },
      {
        code: 'BUSINESS',
        displayName: 'Bisnis',
        description: 'Lupakan terbang hemat! Kelas ini bikin kamu serasa bos',
      },
      {
        code: 'FIRST',
        displayName: 'First Class',
        description: 'Kelas konglomerat dengan kemewahan maksimal',
      },
    ];
    Object.assign(availableClass, response);
    setSearchForm({
      class: {
        label: response[0].displayName,
        value: response[0].code,
      },
    });
  }

  return {
    searchForm,
    setSearchForm,
    availableClass,
    initiateAvailableClass,
  };
});
