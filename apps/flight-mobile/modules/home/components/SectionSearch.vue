<script lang="ts" setup>
  import { History } from 'home-module/components/LastSearchItem.vue';
  import SearchForm from 'home-module/components/SearchForm.vue';
  import useSearchForm, {
    SearchFormValue,
  } from 'home-module/composables/use-search-form';
  import dateUtil from 'common-module/utils/date';

  const { searchForm, setSearchForm, availableClass, initiateAvailableClass } =
    useSearchForm();

  initiateAvailableClass();

  // TODO: resolve hydration mismatch possibility
  const history = useCookie<Array<History>>('flight-search');
  if (history.value?.[0]) {
    const lastSearch = history.value[0];
    const departureDate = dateUtil.parse(
      lastSearch.departureDate,
      'dd-MM-yyyy',
      new Date()
    );
    const returnDate = lastSearch.returnDate
      ? dateUtil.parse(lastSearch.returnDate, 'dd-MM-yyyy', new Date())
      : undefined;

    const newSearchForm: Partial<SearchFormValue> = {
      origin: {
        label: `${lastSearch.from.city} (${lastSearch.from.airport})`,
        value: lastSearch.from.airport,
      },
      destination: {
        label: `${lastSearch.to.city} (${lastSearch.to.airport})`,
        value: lastSearch.to.airport,
      },
      departureDate: {
        label: dateUtil.format(departureDate, 'EEEE, dd MMM yyyy'),
        value: departureDate.toString(),
      },
      class: {
        label:
          availableClass.find((item) => item.code === lastSearch.seatClass)
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
    if (returnDate) {
      newSearchForm.returnDate = {
        label: dateUtil.format(returnDate, 'EEEE, dd MMM yyyy'),
        value: returnDate.toString(),
      };
    }
    setSearchForm(newSearchForm);
  } else if (!searchForm.origin.value) {
    setSearchForm({
      origin: {
        label: 'Jakarta (JKT)',
        value: 'JKT',
      },
      destination: {
        label: 'Bali / Denpasar (DPS)',
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
        label: availableClass[0].displayName,
        value: availableClass[0].code,
      },
    });
  }

  onMounted(() => {
    /* date needs to be initiated from client side
       due to server & client tz difference possibility */
    if (
      !searchForm.departureDate.value ||
      dateUtil.isBefore(
        new Date(searchForm.departureDate.value),
        dateUtil.startOfDay(new Date())
      )
    ) {
      setSearchForm({
        departureDate: {
          label: dateUtil.format(new Date(), 'EEEE, dd MMM yyyy'),
          value: dateUtil.startOfDay(new Date()).toString(),
        },
      });
    }

    if (
      !!searchForm.returnDate?.value &&
      dateUtil.isBefore(
        new Date(searchForm.returnDate.value),
        dateUtil.startOfDay(new Date())
      )
    ) {
      const nextDay = dateUtil.add(new Date(searchForm.departureDate.value), {
        days: 1,
      });
      setSearchForm({
        returnDate: {
          label: dateUtil.format(nextDay, 'EEEE, dd MMM yyyy'),
          value: nextDay.toString(),
        },
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
      src="/figure-search-hero.svg"
      class="absolute left-1/2 top-[-36px] w-[calc(100%-20px)] max-w-[400px] -translate-x-1/2"
      alt="Naik Pesawat"
      format="webp"
      fetchpriority="high"
      loading="eager"
      height="300"
      preload
    />

    <SearchForm />
  </main>
</template>
