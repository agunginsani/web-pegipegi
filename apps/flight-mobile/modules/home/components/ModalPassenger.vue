<script lang="ts" setup>
  import { BottomSheet, Button } from '@pegipegi/web-pegipegi-ui';
  import useSearchForm from 'home-module/composables/use-search-form';

  const route = useRoute();
  const router = useRouter();
  const isActive = computed({
    get() {
      return !!route.query.showPassenger;
    },
    set(value) {
      if (value) {
        router.push(`${route.path}?showPassenger=true`);
      } else if (!!route.query.showPassenger) {
        router.go(-1);
      }
    },
  });

  const { searchForm, setSearchForm } = useSearchForm();

  const passengersValue = reactive(
    JSON.parse(JSON.stringify(searchForm.passengers.value))
  );
  const passengers = computed(() => ({
    adult: {
      title: 'Dewasa',
      description: '>12 tahun',
      value: passengersValue.adult,
      isPrevDisabled: passengersValue.adult <= 1,
      isNextDisabled: passengersValue.adult + passengersValue.child >= 7,
    },
    child: {
      title: 'Anak-anak',
      description: '2-11 tahun',
      value: passengersValue.child,
      isPrevDisabled: passengersValue.child <= 0,
      isNextDisabled: passengersValue.adult + passengersValue.child >= 7,
    },
    infant: {
      title: 'Bayi',
      description: '<2 tahun',
      value: passengersValue.infant,
      isPrevDisabled: passengersValue.infant <= 0,
      isNextDisabled: passengersValue.infant >= passengersValue.adult,
    },
  }));

  function onPassengerIncrement(key: string, increment: number) {
    passengersValue[key] = passengersValue[key] + increment;
    if (
      key === 'adult' &&
      increment === -1 &&
      passengersValue.infant > passengersValue.adult
    ) {
      passengersValue.infant = passengersValue.adult;
    }
  }

  function onReset() {
    passengersValue.adult = 1;
    passengersValue.child = 0;
    passengersValue.infant = 0;
  }

  function onSave() {
    setSearchForm({
      passengers: {
        label: `${passengersValue.adult} Dewasa • ${passengersValue.child} Anak • ${passengersValue.infant} Bayi`,
        value: passengersValue,
      },
    });
    router.go(-1);
  }
</script>

<template>
  <!-- TODO: drop ClientOnly -->
  <ClientOnly>
    <BottomSheet v-model="isActive">
      <section aria-labelledby="passenger-count">
        <div class="border-neutral-tuna-50 flex gap-3 border-b px-4 py-2">
          <div>
            <h2 id="passenger-count" class="text-lg font-bold">
              Jumlah Penumpang
            </h2>
            <p class="text-neutral-tuna-300 text-sm">
              Jumlah bayi tidak boleh lebih dari dewasa
            </p>
          </div>

          <button
            class="text-orange-inter-600 ml-auto font-bold"
            @click="onReset"
          >
            Reset
          </button>
        </div>

        <ul class="p-4">
          <li
            v-for="(passenger, key) in passengers"
            :key="`passenger-${key}`"
            class="mb-3 flex last-of-type:mb-0"
          >
            <div>
              <p>
                {{ passenger.title }}
              </p>
              <p class="text-neutral-tuna-300 text-sm">
                {{ passenger.description }}
              </p>
            </div>
            <div class="ml-auto flex items-center">
              <button
                class="bg-neutral-tuna-50 flex h-8 w-8 items-center justify-center rounded-full"
                :disabled="passenger.isPrevDisabled"
                @click="onPassengerIncrement(key, -1)"
              >
                <NuxtImg
                  :class="{ 'opacity-30': passenger.isPrevDisabled }"
                  src="/icon-subtract.svg"
                  alt="Subtract"
                />
              </button>
              <p class="w-12 text-center text-lg font-bold">
                {{ passenger.value }}
              </p>
              <button
                class="bg-neutral-tuna-50 flex h-8 w-8 items-center justify-center rounded-full"
                :disabled="passenger.isNextDisabled"
                @click="onPassengerIncrement(key, 1)"
              >
                <NuxtImg
                  :class="{ 'opacity-30': passenger.isNextDisabled }"
                  src="/icon-add.svg"
                  alt="Add"
                />
              </button>
            </div>
          </li>
        </ul>

        <div class="px-4">
          <Button block @click="onSave">Simpan</Button>
        </div>
      </section>
    </BottomSheet>
  </ClientOnly>
</template>
