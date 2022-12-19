import useFetchAirports, {
  Airports,
} from "home-module/composables/use-fetch-airports";

export default defineStore("home", () => {
  const airports = ref<Airports>([]);

  async function fetch() {
    const { data } = await useFetchAirports();
    airports.value = data.value ?? [];
  }

  return {
    airports,
    fetch,
  };
});
