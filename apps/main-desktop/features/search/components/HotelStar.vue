<script lang="ts" setup>
  import useHotelSearchForm from 'search-module/composables/use-hotel-search-form';
  import usePopover from 'common-module/composables/use-popover';
  const { form, setForm } = await useHotelSearchForm();

  function isActive(index: number) {
    return form.value.grade.findIndex((el) => el === index + 1) >= 0;
  }

  const starValue = ref(
    Array(6)
      .fill(false)
      .map((el, idx) => isActive(idx))
  );

  watch(
    () => form.value.grade,
    () => {
      starValue.value = starValue.value.map((el, idx) => {
        const index = idx === 5 ? -1 : idx;
        return isActive(index);
      });
    },
    { immediate: true }
  );

  const {
    triggerRef: starInput,
    targetRef: starModal,
    active,
    toggle,
  } = usePopover();

  const label = computed(() => {
    const { grade } = form.value;
    const display = grade.map((el) => (el === 0 ? 'Tidak Berbintang' : el));
    return grade.length > 0
      ? grade.length === 1 && grade[0] === 0
        ? `Hotel ${display.join('')}`
        : `Hotel Bintang ${display.join(', ')}`
      : 'Bintang Hotel';
  });

  function onInput(e: Event, index: number) {
    const value = (e.target as HTMLInputElement).checked;
    starValue.value[index] = value;
    setForm({
      grade: starValue.value
        .map((el, idx) => (el ? (idx === 5 ? 0 : idx + 1) : -1))
        .filter((el) => el >= 0),
    });
  }
</script>

<template>
  <div class="relative">
    <button
      ref="starInput"
      @click="toggle"
      class="border-neutral-tuna-50 flex items-center rounded-[14px] border px-2.5 py-1 text-sm"
    >
      <NuxtImg
        src="/icon-star.svg"
        width="20"
        height="20"
        class="mr-0.5"
        role="presentation"
      />
      <span>{{ label }}</span>
      <NuxtImg
        src="/icon-chevron.svg"
        width="20"
        height="20"
        class="ml-1.5 rotate-90"
        role="presentation"
      />
    </button>

    <div
      ref="starModal"
      v-if="active"
      class="shadow-floating absolute z-10 mt-2 w-max rounded-2xl bg-white px-4 py-2"
    >
      <p class="mb-4">Pilih Bintang Hotel</p>
      <div class="flex items-center gap-2">
        <div
          v-for="(item, index) in starValue"
          class="border-neutral-tuna-50 relative flex items-center rounded-[14px] border px-2.5 py-1 text-sm"
          :class="{
            'bg-orange-inter-50 border-orange-inter-600': starValue[index],
          }"
        >
          <input
            class="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            type="checkbox"
            :checked="item"
            @input="onInput($event, index)"
          />
          <NuxtImg
            v-if="index < 5"
            src="/icon-star.svg"
            width="20"
            height="20"
            class="mr-0.5"
            role="presentation"
          />
          <span>{{
            index < 5 ? `Bintang ${index + 1}` : 'Tidak Berbintang'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
