<script lang="ts" setup>
  import {
    SearchFormItemValue,
    PassangerValue,
  } from 'home-module/composables/use-search-form';

  type InputProps = {
    id: string;
    value: SearchFormItemValue | PassangerValue;
    icon: string;
    label: string;
    placeholder?: string;
    to: string;
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
    class="bg-neutral-tuna-25 border-neutral-tuna-100 relative mb-3 flex items-center rounded-t-xl border-b px-4 py-2"
    :aria-labelledby="id"
  >
    <NuxtImg
      class="mr-4"
      width="24"
      height="24"
      :src="icon"
      role="presentation"
    />

    <NuxtLink :to="to" class="flex-grow text-left" @click="$emit('click')">
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
    </NuxtLink>

    <div
      v-if="$slots.default"
      class="ml-auto flex flex-col items-end self-start"
    >
      <slot />
    </div>
  </div>
</template>
