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

type FlightClassItem = {
  code: string;
  displayName: string;
  description: string;
};

export default defineStore('searchForm', () => {
  const availableClass = reactive<Array<FlightClassItem>>([]);

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
