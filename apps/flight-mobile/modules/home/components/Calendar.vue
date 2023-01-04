<script lang="ts" setup>
  import { Button } from '@pegipegi/web-pegipegi-ui';
  import CalendarItem, {
    CalendarItemSlotProps,
  } from 'home-module/components/CalendarItem.vue';
  import dateUtil from 'common-module/utils/date';

  export type CalendarModelValue = [Date | undefined, Date | undefined];

  type CalendarItem = InstanceType<typeof CalendarItem>;

  const router = useRouter();
  const route = useRoute();

  const props = defineProps<{
    startDate: Date;
    endDate: Date;
    modelValue: CalendarModelValue;
    isReturn: boolean;
    disabledDates?: (date: Date) => boolean;
  }>();

  const emit = defineEmits<{
    (name: 'back'): void;
    (name: 'update:modelValue', payload: CalendarModelValue): void;
  }>();

  const previousValue: CalendarModelValue = [
    props.modelValue[0],
    props.modelValue[1],
  ];
  function onBack() {
    emit('update:modelValue', previousValue);
    emit('back');
  }

  function onSave() {
    emit('back');
  }

  function onClearReturn() {
    emit('update:modelValue', [props.modelValue[0], undefined]);
  }

  const renderedMonths = computed(() => {
    const monthDifference = Number(
      dateUtil.differenceInMonths(props.endDate, props.startDate)
    );
    let pointer = dateUtil.startOfMonth(new Date(props.startDate));

    return Array.from({ length: monthDifference + 1 }, (_, i) => {
      return dateUtil.add(pointer, { months: i });
    });
  });

  const dateText = computed(() => [
    props.modelValue[0]
      ? dateUtil.format(props.modelValue[0], 'd MMM yyyy')
      : 'Pilih Tanggal',
    props.modelValue[1]
      ? dateUtil.format(props.modelValue[1], 'd MMM yyyy')
      : 'Pilih Tanggal',
  ]);

  function onSelect(event: Date) {
    if (!props.isReturn && !props.modelValue[1]) {
      // set departure
      emit('update:modelValue', [event, props.modelValue[1]]);
    } else if (
      props.isReturn &&
      !!props.modelValue[0] &&
      dateUtil.isBefore(event, props.modelValue[0])
    ) {
      // set departure, clear return
      emit('update:modelValue', [event, undefined]);
    } else if (
      !props.isReturn &&
      !!props.modelValue[1] &&
      dateUtil.isAfter(event, props.modelValue[1])
    ) {
      // set departure, clear return, go to return
      emit('update:modelValue', [event, undefined]);
      router.replace(`${route.path}?type=return`);
    } else if (
      !props.isReturn &&
      !!props.modelValue[1] &&
      dateUtil.isBefore(event, props.modelValue[1])
    ) {
      // set departure, go to return
      emit('update:modelValue', [event, props.modelValue[1]]);
      router.replace(`${route.path}?type=return`);
    } else {
      // set return
      emit('update:modelValue', [props.modelValue[0], event]);
    }
  }

  const activeMonthRef = ref<CalendarItem | null>(null);
  const headerRef = ref<HTMLElement | null>(null);
  onMounted(() => {
    const headerHeight = headerRef.value?.offsetHeight ?? 100;
    const monthPosition = activeMonthRef.value?.$el.getBoundingClientRect().top;
    const scrollTarget = monthPosition - headerHeight - 12;

    // timeout used to wait for page transition
    setTimeout(() => window.scrollTo({ top: scrollTarget }), 440);
  });
</script>

<template>
  <div class="bg-[#fffbe7]">
    <header
      ref="headerRef"
      class="shadow-lifted sticky inset-x-0 top-0 z-30 flex flex-col rounded-b-2xl bg-white"
    >
      <div class="flex">
        <button
          class="flex h-12 w-12 items-center justify-center"
          @click="onBack"
        >
          <NuxtImg class="h-5 w-5" src="/icon-back.svg" alt="Back" />
        </button>
        <div class="flex flex-col justify-center">
          <h1 class="font-bold">
            <span>Jakarta</span>
            <NuxtImg
              class="mx-1 inline-block h-4 w-4"
              :src="
                modelValue[1]
                  ? '/icon-arrow-roundtrip.svg'
                  : '/icon-arrow-oneway.svg'
              "
              alt="To"
            />
            <span>Bali / Denpasar</span>
          </h1>
          <p class="text-neutral-tuna-300 text-xs">Ekonomi</p>
        </div>
      </div>
      <ul class="flex w-full justify-between py-3 px-4">
        <li
          v-for="(day, index) in [
            'Sen',
            'Sel',
            'Rab',
            'Kam',
            'Jum',
            'Sab',
            'Min',
          ]"
          class="w-9 text-center"
          :class="index >= 5 ? 'text-red-flower-700' : ''"
        >
          {{ day }}
        </li>
      </ul>
    </header>
    <main>
      <ul>
        <CalendarItem
          v-for="(monthPointer, i) in renderedMonths"
          :ref="(el) => { 
            if(modelValue[0] && dateUtil.isSameMonth(monthPointer, modelValue[0])) {
              activeMonthRef = el as CalendarItem
            }
          }"
          :date="monthPointer"
          :modelValue="modelValue"
          :disabledDates="disabledDates"
          @select="onSelect"
        >
          <template #default="date: CalendarItemSlotProps">
            <slot v-bind="date"></slot>
          </template>
        </CalendarItem>
      </ul>
    </main>

    <footer class="shadow-lifted sticky inset-x-0 bottom-0 z-30">
      <div class="bg-neutral-tuna-50 rounded-t-2xl py-2 px-4 text-sm">
        <p>
          <NuxtImg
            class="mr-2 inline-block h-5 w-5"
            src="/icon-info-round.svg"
            alt="Info"
          />
          Harga yang ditampilkan adalah yang termurah
        </p>
      </div>

      <div class="bg-white p-4">
        <div class="mb-2 flex justify-between">
          <div>
            <p class="text-neutral-tuna-300 text-sm">Pergi</p>
            <NuxtLink
              class="font-bold"
              :class="{
                'text-orange-inter-600': !!modelValue[1] && !isReturn,
              }"
              :to="`${route.path}?type=departure`"
              replace
            >
              {{ dateText[0] }}
            </NuxtLink>
          </div>

          <div class="text-right" v-if="!!modelValue[1] || isReturn">
            <p class="text-neutral-tuna-300 text-sm">
              <span>Pulang</span>
              <button class="ml-1" @click="onClearReturn">
                <NuxtImg
                  class="h-3 w-3 align-middle"
                  src="/icon-close-round.svg"
                  alt="Clear"
                />
              </button>
            </p>
            <NuxtLink
              class="font-bold"
              :class="{
                'text-orange-inter-600': !!modelValue[1] && isReturn,
              }"
              :to="`${route.path}?type=return`"
              replace
            >
              {{ dateText[1] }}
            </NuxtLink>
          </div>

          <div class="text-right" v-else>
            <p class="text-neutral-tuna-300 text-sm">Untuk lebih murah</p>
            <NuxtLink
              class="text-orange-inter-600 font-bold"
              :to="`${route.path}?type=return`"
              replace
            >
              Pilih Pulang Juga
            </NuxtLink>
          </div>
        </div>

        <Button block @click="onSave">Simpan</Button>
      </div>
    </footer>
  </div>
</template>
