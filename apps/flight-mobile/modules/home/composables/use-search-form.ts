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

export default function searchForm() {
  const searchForm = useState<SearchFormValue>(() => ({
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
  }));

  function setSearchForm(payload: Partial<SearchFormValue>) {
    searchForm.value = { ...searchForm.value, ...payload };
  }

  const seatClass = useState<Array<SeatClassItem>>(() => []);

  async function initiateSeatClass() {
    const { data: seats } = await useFetch('/api/seat-class');
    if (seatClass.value.length > 0) return;

    seatClass.value = seats.value ?? [];
  }

  const bestPrice = useState<BestPrice>(() => ({
    departurePrice: undefined,
    returnPrice: undefined,
  }));

  function setBestPrice(params: BestPrice) {
    bestPrice.value = params;
  }

  function clearBestPrice() {
    (bestPrice.value.departurePrice = undefined),
      (bestPrice.value.returnPrice = undefined);
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
}
