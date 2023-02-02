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

type BestPrice = {
  departurePrice?: number;
  returnPrice?: number;
};

export default defineStore('searchForm', () => {
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

  const seatClass = reactive<Array<SeatClassItem>>([]);

  async function initiateSeatClass() {
    if (seatClass.length > 0) return;

    const { data: seats } = await useFetch('/api/seat-class', {
      transform: (data) => data.data,
    });
    Object.assign(seatClass, seats.value);
  }

  const bestPrice = reactive<BestPrice>({
    departurePrice: undefined,
    returnPrice: undefined,
  });

  function setBestPrice(params: BestPrice) {
    Object.assign(bestPrice, params);
  }

  function clearBestPrice() {
    (bestPrice.departurePrice = undefined), (bestPrice.returnPrice = undefined);
  }

  return {
    searchForm,
    setSearchForm,
    seatClass,
    initiateSeatClass,
    setBestPrice,
    clearBestPrice,
    bestPrice,
  };
});
