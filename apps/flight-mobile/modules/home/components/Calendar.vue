<script lang="ts" setup>
  import { Button } from '@pegipegi/web-pegipegi-ui';
  import CalendarItem from 'home-module/components/CalendarItem.vue';
  import dateUtil from 'common-module/utils/date';
  import useFirebase from 'common-module/composables/use-firebase';

  export type CalendarModelValue = [Date | undefined, Date | undefined];

  const router = useRouter();
  const route = useRoute();
  const { getConfig } = useFirebase();

  const props = defineProps<{
    startDate: Date;
    endDate: Date;
    modelValue: CalendarModelValue;
    isReturn: boolean;
    disabledDates?: (date: Date) => boolean;
  }>();

  const emit = defineEmits<{
    (name: 'back'): void;
    (name: 'select', payload: Date): void;
    (name: 'update:modelValue', payload: CalendarModelValue): void;
  }>();

  const localValue = reactive<CalendarModelValue>(props.modelValue);

  function onBack() {
    emit('back');
  }

  function onSave() {
    emit('update:modelValue', localValue);
    emit('back');
  }

  function onClearReturn() {
    localValue[1] = undefined;
  }

  const holiday = await getConfig('holiday_calendar');
  const renderedMonths = computed(() => {
    const monthDifference = Number(
      dateUtil.differenceInMonths(props.endDate, props.startDate)
    );
    let pointer = dateUtil.startOfMonth(new Date(props.startDate));

    return Array.from({ length: monthDifference + 1 }, (_, i) => {
      return {
        holiday: holiday[dateUtil.format(pointer, 'yyyy')][i + 1],
        monthPointer: dateUtil.add(pointer, { months: i }),
      };
    });
  });

  const dateText = computed(() => [
    localValue[0]
      ? dateUtil.format(localValue[0], 'd MMM yyyy')
      : 'Pilih Tanggal',
    localValue[1]
      ? dateUtil.format(localValue[1], 'd MMM yyyy')
      : 'Pilih Tanggal',
  ]);

  function onSelect(event: Date) {
    emit('select', event);
    if (!props.isReturn && !localValue[1]) {
      // set departure
      localValue[0] = event;
    } else if (
      props.isReturn &&
      !!localValue[0] &&
      dateUtil.isBefore(event, localValue[0])
    ) {
      // set departure, clear return
      localValue[0] = event;
      localValue[1] = undefined;
    } else if (
      !props.isReturn &&
      !!localValue[1] &&
      dateUtil.isAfter(event, localValue[1])
    ) {
      // set departure, clear return, go to return
      localValue[0] = event;
      localValue[1] = undefined;
      router.replace(`${route.path}?type=return`);
    } else if (
      !props.isReturn &&
      !!localValue[1] &&
      dateUtil.isBefore(event, localValue[1])
    ) {
      // set departure, go to return
      localValue[0] = event;
      router.replace(`${route.path}?type=return`);
    } else {
      // set return
      localValue[1] = event;
    }
  }

  // scroll to active month
  type CalendarItemComponentRef = InstanceType<typeof CalendarItem>;
  const activeMonthRef = ref<CalendarItemComponentRef | null>(null);
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
          <NuxtImg width="20" height="20" src="/icon-back.svg" alt="Back" />
        </button>
        <slot name="header" :value="localValue" />
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
          :key="`day-${index}`"
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
          v-for="(item, index) in renderedMonths"
          :key="`month-${index}`"
          :ref="(el) => { 
            if(localValue[0] && dateUtil.isSameMonth(item.monthPointer, localValue[0])) {
              activeMonthRef = el as CalendarItemComponentRef
            }
          }"
          :date="item.monthPointer"
          :modelValue="localValue"
          :disabledDates="disabledDates"
          :holiday="item.holiday"
          @select="onSelect"
        >
          <template #default="date">
            <slot name="addon" v-bind="date"></slot>
          </template>
        </CalendarItem>
      </ul>
    </main>

    <footer class="shadow-lifted sticky inset-x-0 bottom-0 z-30">
      <div class="bg-neutral-tuna-50 rounded-t-2xl py-2 px-4 text-sm">
        <p>
          <NuxtImg
            class="mr-2 inline-block"
            width="20"
            height="20"
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
                'text-orange-inter-600': !!localValue[1] && !isReturn,
              }"
              :to="`${route.path}?type=departure`"
              replace
            >
              {{ dateText[0] }}
            </NuxtLink>
          </div>

          <div class="text-right" v-if="!!localValue[1] || isReturn">
            <p class="text-neutral-tuna-300 text-sm">
              <span>Pulang</span>
              <button class="ml-1" @click="onClearReturn">
                <NuxtImg
                  class="align-middle"
                  width="12"
                  height="12"
                  src="/icon-close-round.svg"
                  alt="Clear"
                />
              </button>
            </p>
            <NuxtLink
              class="font-bold"
              :class="{
                'text-orange-inter-600': !!localValue[1] && isReturn,
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
