<script lang="ts" setup>
  import { History } from 'home-module/components/LastSearchItem.vue';
  import AdhocBanner from 'home-module/components/AdhocBanner.vue';
  import SearchForm from 'home-module/components/SearchForm.vue';
  import useSearchForm, {
    SearchFormValue,
  } from 'home-module/composables/use-search-form';
  import { parse, add, format, isBefore, startOfDay } from 'date-fns';

  const { searchForm, setSearchForm, seatClass } = useSearchForm();

  const history = useCookie<Array<History>>('flight-search');

  if (!searchForm.value.origin.value && history.value?.[0]) {
    const lastSearch = history.value[0];
    const newSearchForm: Partial<SearchFormValue> = {
      origin: {
        label: `${lastSearch.from.city} (${lastSearch.from.airport})`,
        value: lastSearch.from.airport,
      },
      destination: {
        label: `${lastSearch.to.city} (${lastSearch.to.airport})`,
        value: lastSearch.to.airport,
      },
      class: {
        label:
          seatClass.value.find((item) => item.code === lastSearch.seatClass)
            ?.displayName ?? '-',
        value: lastSearch.seatClass,
      },
      passengers: {
        label: `${lastSearch.paxAdult} Dewasa • ${lastSearch.paxChild} Anak • ${lastSearch.paxInfant} Bayi`,
        value: {
          adult: lastSearch.paxAdult,
          child: lastSearch.paxChild,
          infant: lastSearch.paxInfant,
        },
      },
    };
    setSearchForm(newSearchForm);
  } else if (!searchForm.value.origin.value) {
    setSearchForm({
      origin: {
        label: 'Jakarta (JKT)',
        value: 'JKT',
      },
      destination: {
        label: 'Bali / Denpasar (DPS)',
        value: 'DPS',
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
        label: seatClass.value[0]?.displayName,
        value: seatClass.value[0]?.code,
      },
    });
  }

  onMounted(() => {
    /* date needs to be initiated from client side
       due to server & client tz difference possibility */
    if (!searchForm.value.departureDate.value && history.value?.[0]) {
      const lastSearch = history.value[0];

      const lastDepartureDate = parse(
        lastSearch.departureDate,
        'dd-MM-yyyy',
        new Date()
      );

      const lastReturnDate = lastSearch.returnDate
        ? parse(lastSearch.returnDate, 'dd-MM-yyyy', new Date())
        : undefined;

      const departureDate = isBefore(lastDepartureDate, startOfDay(new Date()))
        ? add(startOfDay(new Date()), { days: 1 })
        : lastDepartureDate;

      const returnDate = lastReturnDate
        ? isBefore(lastReturnDate, departureDate)
          ? add(departureDate, { days: 1 })
          : lastReturnDate
        : undefined;

      const newSearchForm: Partial<SearchFormValue> = {
        departureDate: {
          label: format(departureDate, 'EEEE, dd MMM yyyy'),
          value: departureDate.toString(),
        },
      };
      if (returnDate) {
        newSearchForm.returnDate = {
          label: format(returnDate, 'EEEE, dd MMM yyyy'),
          value: returnDate.toString(),
        };
      }
      console.log(newSearchForm);
      setSearchForm(newSearchForm);
    } else if (!searchForm.value.departureDate.value) {
      const departureDate = add(startOfDay(new Date()), { days: 1 });
      setSearchForm({
        departureDate: {
          label: format(departureDate, 'EEEE, dd MMM yyyy'),
          value: departureDate.toString(),
        },
        returnDate: undefined,
      });
    }
  });
</script>

<template>
  <main class="relative p-4 pt-[170px]">
    <div
      class="absolute inset-x-0 -top-16 h-[500px] w-full bg-gradient-to-b from-[#ffdc8e] via-[#ffc09f] to-white"
    />

    <NuxtImg
      src="/figure-search-hero.webp"
      class="absolute left-1/2 top-[-36px] w-[calc(100%-20px)] max-w-[400px] -translate-x-1/2"
      alt="Naik Pesawat"
      fetchpriority="high"
      loading="eager"
      height="400"
      preload
    />
    <AdhocBanner />
    <SearchForm />
  </main>
</template>
