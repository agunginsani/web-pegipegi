<script lang="ts" setup>
  import { useScroll } from '@vueuse/core';

  type LocationSearchProps = {
    modelValue: string;
  };

  type LocationSeachEmits = {
    (name: 'update:modelValue', payload: string): void;
    (name: 'input', payload: Event): void;
    (name: 'back'): void;
  };

  const props = defineProps<LocationSearchProps>();
  const emit = defineEmits<LocationSeachEmits>();

  function onInput(event: Event) {
    emit('input', event);
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }

  const body = ref<Window | null>(null);
  const { arrivedState } = useScroll(body);
  onMounted(() => {
    body.value = window;
  });
</script>

<template>
  <div>
    <header
      class="shadow-lifted sticky inset-x-0 top-0 z-10 flex bg-white py-1.5 pl-4"
      :class="{ 'shadow-none': arrivedState.top }"
    >
      <div
        class="outline-neutral-tuna-100 focus-within:outline-orange-inter-600 flex flex-grow rounded-lg outline outline-1"
      >
        <NuxtImg class="m-2" src="/icon-search.svg" alt="Search" />
        <input
          ref="input"
          class="placeholder:text-neutral-tuna-300 selection:bg-orange-inter-500 h-10 flex-grow outline-none selection:text-white"
          type="text"
          placeholder="Cari kota atau bandara"
          aria-label="Cari kota atau bandara"
          :value="modelValue"
          @input="onInput"
        />
      </div>
      <button
        class="text-orange-inter-600 px-4 text-sm font-bold"
        @click="$emit('back')"
      >
        Batal
      </button>
    </header>

    <main>
      <slot></slot>
    </main>
  </div>
</template>
