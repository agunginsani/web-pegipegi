<script lang="ts" setup>
  import { BottomSheet, Button, Counter } from '@pegipegi/web-pegipegi-ui';
  import useSearchForm from 'home-module/composables/use-search-form';

  const route = useRoute();
  const router = useRouter();

  const { searchForm, setSearchForm } = useSearchForm();

  function getCurrentPassengers() {
    return JSON.parse(JSON.stringify(searchForm.passengers.value));
  }

  const passengersValue = reactive(getCurrentPassengers());

  watch(
    () => searchForm.passengers.value,
    () => {
      Object.assign(passengersValue, getCurrentPassengers());
    }
  );

  watch(
    () => passengersValue.adult,
    () => {
      if (passengersValue.adult < passengersValue.infant) {
        passengersValue.infant = passengersValue.adult;
      }
    }
  );

  const passengersDetail = computed(() => ({
    adult: {
      title: 'Dewasa',
      description: '>12 tahun',
      min: 1,
      max: 7 - passengersValue.child,
    },
    child: {
      title: 'Anak-anak',
      description: '2-11 tahun',
      min: 0,
      max: 7 - passengersValue.adult,
    },
    infant: {
      title: 'Bayi',
      description: '<2 tahun',
      min: 0,
      max: passengersValue.adult,
    },
  }));

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

  const isActive = computed(() => !!route.query.showPassenger);
  function onBottomSheetToggle(value: boolean) {
    if (value) {
      router.push(`${route.path}?showPassenger=true`);
    } else if (!!route.query.showPassenger) {
      Object.assign(passengersValue, getCurrentPassengers());
      router.go(-1);
    }
  }
</script>

<template>
  <ClientOnly>
    <Teleport to="#portal-1">
      <BottomSheet
        :modelValue="isActive"
        @update:modelValue="onBottomSheetToggle"
      >
        <section aria-labelledby="passenger-count-title">
          <div class="border-neutral-tuna-50 flex gap-3 border-b px-4 py-2">
            <div>
              <h2 id="passenger-count-title" class="text-lg font-bold">
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
              v-for="(item, key) in passengersDetail"
              :key="`passenger-${key}`"
              class="mb-3 flex last-of-type:mb-0"
            >
              <div class="mr-auto">
                <p>
                  {{ item.title }}
                </p>
                <p class="text-neutral-tuna-300 text-sm">
                  {{ item.description }}
                </p>
              </div>
              <Counter
                v-model="passengersValue[key]"
                :min="item.min"
                :max="item.max"
              />
            </li>
          </ul>

          <div class="px-4">
            <Button block @click="onSave">Simpan</Button>
          </div>
        </section>
      </BottomSheet>
    </Teleport>
  </ClientOnly>
</template>
