import useAirports from "home-module/composables/use-fetch-airports";
import useSeatClasses from "home-module/composables/use-fetch-seat-classes";
import usePromoBanners from "home-module/composables/use-fetch-promo-banners";

// TODO: typings
type Airport = {
  airport_code: 'FKQ',
  airport_name: 'Fakfak Airport',
  all_airport: '',
  area_name: 'Fakfak',
  country_name: 'Indonesia',
  group: 'Indonesia',
  international: false,
  timezone: '9.0',
  type: 'BANDARA'}

type Promo = {

}

type SeatClass = {

}

export default defineStore('home', () => {
  const airports =ref<Array<Airport>>([])
  const seatClasses = ref<Array<SeatClass>>([])
  const promos = ref<Array<Promo>>([])

  async function fetch() {
    const [{data: airportsResp}, {data: seatClassesResp}, {data: promosResp}] =
      await Promise.all([useAirports(), useSeatClasses(), usePromoBanners()])
    
    airports.value = airportsResp.value
    seatClasses.value = seatClassesResp.value
    promos.value = promosResp.value
  }

  return {
    airports,
    promos,
    seatClasses,
    fetch,
  }
})

  