type BestPriceParams = {
  departurePrice: number | undefined;
  returnPrice: number | undefined;
};

export default defineStore('bestPrice', () => {
  const bestPrice = reactive<BestPriceParams>({
    departurePrice: undefined,
    returnPrice: undefined,
  });

  function setBestPrice(params: BestPriceParams) {
    Object.assign(bestPrice, params);
  }

  function clearBestPrice() {
    (bestPrice.departurePrice = undefined), (bestPrice.returnPrice = undefined);
  }

  return {
    setBestPrice,
    clearBestPrice,
    bestPrice,
  };
});
