import { HotelLocation } from 'search-module/composables/use-hotel-search-form';

export default function useHotelHistory(name: string, limit: number = 5) {
  const history = useState<Array<HotelLocation>>(() => []);
  useLocalStorage<Array<HotelLocation>>(name, history);

  function addHistory(item: HotelLocation) {
    if (!(history.value?.findIndex((el) => el.title === item.title) >= 0)) {
      if (!history.value || history.value?.length <= 0) {
        history.value = [item];
      } else {
        history.value.unshift(item);
      }

      if (history.value.length > limit) {
        history.value = history.value.slice(0, limit);
      }
    }
  }

  function clearHistory() {
    history.value = [];
  }

  return {
    history,
    addHistory,
    clearHistory,
  };
}
