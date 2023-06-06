<script lang="ts" setup>
  import { TransitionRoot } from '@headlessui/vue';
  import { onClickOutside } from '@vueuse/core';

  type FilterOptions = { label: string; value: string };
  type FilterProps = {
    options: Array<FilterOptions>;
    modelValue: FilterOptions;
    expandLabel: string;
    searchPlaceholder: string;
  };
  type BannerFiltersEmits = {
    (e: 'update:modelValue', payload: FilterOptions): void;
  };
  const props = defineProps<FilterProps>();
  const emit = defineEmits<BannerFiltersEmits>();

  const query = ref<string>('');
  const filteredOptions = computed(() =>
    props.options.filter((opt) =>
      opt.label.toLowerCase().includes(query.value.toLowerCase())
    )
  );

  const isOpen = ref<boolean>(false);
  function toggleOpen() {
    isOpen.value = !isOpen.value;
  }

  const focusable = ref<HTMLElement>();
  const scrollContainer = ref<HTMLElement>();
  onClickOutside(focusable, (event) => (isOpen.value = false));

  watch(isOpen, async () => {
    if (!isOpen.value) query.value = '';
    else {
      await nextTick();
      if (!scrollContainer.value || !props.modelValue) return;
      const activeEl: HTMLElement | null = document.getElementById(
        `chip-filters-search-${props.modelValue}`
      );
      if (!activeEl) return;
      scrollContainer.value.scrollTo({ top: activeEl.offsetTop - 54 });
    }
  });
</script>

<template>
  <div
    class="fixed bottom-0 left-0 h-screen w-screen opacity-0"
    v-if="isOpen"
  ></div>

  <div class="relative" ref="focusable">
    <button
      @click="toggleOpen"
      class="border-orange-inter-600 bg-neutral-tuna-0 text-orange-inter-600 hover:bg-orange-inter-50 flex items-center justify-between rounded-full border px-3 py-2 text-sm font-bold transition duration-300"
    >
      <div class="flex w-max items-center gap-1 whitespace-nowrap">
        <p>{{ expandLabel }}</p>
        <NuxtImg
          class="transition duration-300"
          :class="{ 'rotate-180': isOpen }"
          src="/icon-chevron-down.svg"
          width="20"
          height="20"
          role="presentation"
        />
      </div>
    </button>

    <TransitionRoot
      appear
      as="template"
      enter="transform transition duration-[400ms] origin-top"
      enter-from="opacity-0 scale-y-50"
      enter-to="opacity-100 scale-y-100"
      leave="transform duration-200 transition ease-in-out origin-top"
      leave-from="opacity-100 scale-y-100 "
      leave-to="opacity-0 scale-y-95 "
      :show="isOpen"
    >
      <div
        class="shadow-floating bg-neutral-tuna-0 absolute top-[calc(100%+8px)] z-20 rounded-2xl px-4 py-3"
      >
        <div
          class="border-neutral-tuna-100 flex w-max items-center justify-between gap-3 rounded-lg border px-3 py-2"
        >
          <NuxtImg
            width="20"
            height="20"
            src="/icon-search.svg"
            role="presentation"
          />
          <input
            class="focus:outline-none"
            :placeholder="searchPlaceholder"
            v-model="query"
          />
        </div>
        <div class="max-h-[500px] overflow-y-auto" ref="scrollContainer">
          <button
            class="border-neutral-tuna-25 hover:text-orange-inter-600 block flex w-full justify-between border-b py-2 text-left transition duration-300"
            v-for="(option, index) in filteredOptions"
            :key="`${option.label}-search-${index}`"
            :id="`chip-filters-search-${option.value}`"
            @click="emit('update:modelValue', option), (isOpen = false)"
          >
            {{ option.label }}
            <NuxtImg
              src="/icon-checkmark.svg"
              width="24"
              height="24"
              v-if="option.value === props.modelValue.value"
              role="presentation"
            />
          </button>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>
