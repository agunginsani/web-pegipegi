import useFetchAirports, {
  Airports,
} from 'home-module/composables/use-fetch-airports';

export default defineStore('airports', () => {
  const airports = reactive<Airports>([]);

  async function initiateAirports() {
    if (airports.length > 0) return;

    const { data } = await useFetchAirports();
    if (data.value) {
      Object.assign(airports, data.value);
    }
  }

  return {
    airports,
    initiateAirports,
  };
});
