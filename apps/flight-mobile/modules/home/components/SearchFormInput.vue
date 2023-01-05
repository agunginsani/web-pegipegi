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
  >
    <NuxtImg class="mr-4 h-6 w-6" :src="icon" role="presentation" />
    <div class="flex flex-grow">
      <button class="block flex-grow text-left" @click="$emit('click')">
        <label
          class="text-neutral-tuna-300 mb-1 block text-xs font-bold"
          :for="id"
        >
          {{ label }}
        </label>

        <span
          class="text-neutral-tuna-300 text-sm"
          v-if="!!placeholder && !value.label"
        >
          {{ placeholder }}
        </span>

        <div
          v-if="value.label"
          :id="id"
          :aria-label="label"
          role="textbox"
          class="text-sm"
          readonly
          :value="value"
        >
          {{ value.label }}
        </div>
      </button>

      <div v-if="$slots.default" class="ml-auto flex flex-col items-end">
        <slot />
      </div>
    </div>
  </div>
</template>
