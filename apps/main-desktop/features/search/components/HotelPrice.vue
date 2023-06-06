<script lang="ts" setup>
  import Slider from '@vueform/slider';
  import toCurrency from 'common-module/utils/to-currency';
  import useHotelSearchForm from 'search-module/composables/use-hotel-search-form';
  import usePopover from 'common-module/composables/use-popover';
  import { onClickOutside } from '@vueuse/core';

  const { form, setForm, maxPrice } = await useHotelSearchForm();
  const maxSlider = 5000000;
  const stepSlider = 10000;
  const sliderValue = ref([0, maxSlider]);
  const inputMin = ref(formatInput(0));
  const inputMax = ref(formatInput(maxSlider));

  watch(
    () => form.value.price,
    () => {
      sliderValue.value = [
        form.value.price[0],
        form.value.price[1] >= maxSlider ? maxSlider : form.value.price[1],
      ];
      inputMin.value = formatInput(form.value.price[0]);
      inputMax.value = formatInput(
        form.value.price[1],
        'max',
        form.value.price[0] < maxSlider && form.value.price[1] >= maxPrice
      );
    },
    { immediate: true }
  );

  const {
    triggerRef: priceInput,
    targetRef: priceModal,
    active,
    toggle,
  } = usePopover({
    onClose: () => {
      verifyInput();
    },
  });

  const inputRef = ref(null);
  const sliderRef = ref(null);

  onClickOutside(
    inputRef,
    () => {
      verifyInput();
    },
    { ignore: [sliderRef] }
  );

  const label = computed(() => {
    const isDefault =
      form.value.price[0] === 0 && form.value.price[1] === maxPrice;
    return isDefault ? 'Harga Hotel' : `${inputMin.value} - ${inputMax.value}`;
  });

  function formatInput(
    input: number | string,
    type: string = 'min',
    usePlus: boolean = false
  ) {
    const num = toNumber(input) >= maxPrice ? maxPrice : toNumber(input);
    const isMax = num >= maxPrice && type === 'max';
    const displayInput = toCurrency(isMax && usePlus ? maxSlider : num);
    return `${displayInput}${usePlus ? '+' : ''}`;
  }

  function toNumber(num: number | string) {
    return Number(num.toString().replace(/\D/g, ''));
  }

  function verifyInput() {
    const [min, max] = form.value.price;
    if (min > max) {
      const inputTemp = inputMin.value;
      inputMin.value = inputMax.value;
      inputMax.value = inputTemp;
      setForm({ price: [max, min] });
      sliderValue.value = [max, min >= maxPrice ? maxSlider : min];
    } else if (min === max) {
      if (min - stepSlider >= 0) {
        setForm({ price: [min - stepSlider, max] });
        sliderValue.value[0] = min - stepSlider;
        inputMin.value = formatInput(min - stepSlider);
      } else {
        setForm({ price: [min, max + stepSlider] });
        sliderValue.value[1] = max + stepSlider;
        inputMax.value = formatInput(max + stepSlider, 'max');
      }
    } else if (max >= maxPrice && min > maxSlider) {
      setForm({ price: [min, maxPrice] });
      sliderValue.value = [maxSlider, maxSlider];
      inputMax.value = formatInput(maxPrice, 'max');
    }
  }

  function onInput(e: Event, type: string = 'min') {
    const value = (e.target as HTMLInputElement).value;
    const inputValue = formatInput(value, type);
    if (type === 'min') {
      inputMin.value = inputValue;
      setForm({ price: [toNumber(inputMin.value), form.value.price[1]] });
      sliderValue.value = [toNumber(inputMin.value), sliderValue.value[1]];
    } else {
      inputMax.value = inputValue;
      setForm({
        price: [
          form.value.price[0],
          toNumber(inputMax.value.includes('+') ? maxPrice : inputMax.value),
        ],
      });
      sliderValue.value = [
        sliderValue.value[0],
        toNumber(inputMax.value) >= maxSlider
          ? maxSlider
          : toNumber(inputMax.value),
      ];
    }
  }

  function onSlide(value: Array<number>) {
    setForm({ price: [value[0], value[1] >= maxSlider ? maxPrice : value[1]] });
    inputMin.value = formatInput(value[0]);
    inputMax.value = formatInput(
      value[1] >= maxSlider ? maxPrice : value[1],
      'max',
      value[1] >= maxSlider
    );
  }
</script>

<template>
  <div class="relative">
    <button
      ref="priceInput"
      @click="toggle"
      class="border-neutral-tuna-50 flex items-center rounded-[14px] border px-2.5 py-1 text-sm"
    >
      <NuxtImg
        src="/icon-currency.svg"
        width="20"
        height="20"
        class="mr-0.5"
        role="presentation"
      />
      <p>{{ label }}</p>
      <NuxtImg
        src="/icon-chevron.svg"
        width="20"
        height="20"
        class="ml-1.5 rotate-90"
        role="presentation"
      />
    </button>

    <div
      ref="priceModal"
      v-if="active"
      class="shadow-floating absolute z-10 mt-2 w-max rounded-2xl bg-white px-4 py-2"
    >
      <p class="mb-4">Tentukan Harga Hotel</p>
      <div class="flex items-center gap-2" ref="inputRef">
        <div>
          <p class="mb-2 text-xs font-bold">Mulai dari</p>
          <div class="relative">
            <span class="absolute left-3 top-[13px] text-base font-bold"
              >Rp</span
            >
            <input
              v-model="inputMin"
              @input="onInput($event, 'min')"
              class="disabled:bg-platinum-50 border-neutral-tuna-50 rounded-lg rounded-tl-none border p-3 pl-10 text-base outline-none focus:border-orange-400"
            />
          </div>
        </div>
        <div>
          <p class="mb-2 text-xs font-bold">Sampai</p>
          <div class="relative">
            <span class="absolute left-3 top-[13px] text-base font-bold"
              >Rp</span
            >
            <input
              v-model="inputMax"
              @input="onInput($event, 'max')"
              class="disabled:bg-platinum-50 border-neutral-tuna-50 rounded-lg rounded-tl-none border p-3 pl-10 text-base outline-none focus:border-orange-400"
            />
          </div>
        </div>
      </div>
      <div class="px-2.5 py-[35px]" ref="sliderRef">
        <Slider
          v-model="sliderValue"
          class="price-slider"
          :min="0"
          :step="stepSlider"
          :max="maxSlider"
          :tooltips="false"
          :lazy="false"
          @slide="onSlide"
        />
      </div>
    </div>
  </div>
</template>
<style src="@vueform/slider/themes/default.css"></style>
<style>
  .price-slider {
    --slider-bg: #ededf1;
    --slider-connect-bg: #6e479a;
    --slider-height: 2px;
    --slider-handle-bg: #fff;
    --slider-handle-border: 6px solid #fe5000;
    --slider-handle-width: 20px;
    --slider-handle-height: 20px;
    --slider-handle-ring-width: 0;
  }
</style>
