<script lang="ts" setup>
  import {
    SearchFormValue,
    PassangerValue,
  } from 'home-module/composables/use-search-form';

  type InputProps = {
    id: string;
    value: SearchFormValue | PassangerValue;
    icon: string;
    label: string;
    placeholder?: string;
  };

  type InputEmits = {
    (e: 'click'): void;
  };

  withDefaults(defineProps<InputProps>(), {
    id: '',
    value: () => ({ label: '', value: '' }),
    icon: '',
    label: '',
  });

  defineEmits<InputEmits>();
</script>

<template>
  <div
    class="bg-neutral-tuna-25 border-neutral-tuna-100 relative mb-3 flex items-center rounded-t-xl border-b py-2 px-4"
    :aria-labelledby="id"
  >
    <NuxtImg class="mr-4 h-6 w-6" :src="icon" role="presentation" />
    <button class="flex-grow text-left" @click="$emit('click')">
      <p class="text-neutral-tuna-300 mb-1 block text-xs font-bold" :id="id">
        {{ label }}
      </p>

      <p
        v-if="!!placeholder && !value.label"
        class="text-neutral-tuna-300 text-sm"
      >
        {{ placeholder }}
      </p>

      <p v-if="value.label" class="text-sm">
        {{ value.label }}
      </p>
    </button>

    <div
      v-if="$slots.default"
      class="ml-auto flex flex-col items-end self-start"
    >
      <slot />
    </div>
  </div>
</template>
