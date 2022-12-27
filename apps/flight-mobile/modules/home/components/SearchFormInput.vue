<script lang="ts" setup>
  import { Switch } from "@pegipegi/web-pegipegi-ui";

  type InputProps = {
    id: string;
    value: { label: string; value: string };
    icon: string;
    label: string;
    placeholder?: string;
  };

  type InputEmits = {
    (e: "click"): void;
  };

  withDefaults(defineProps<InputProps>(), {
    id: "",
    value: () => ({ label: "", value: "" }),
    icon: "",
    label: "",
  });

  defineEmits<InputEmits>();
</script>

<template>
  <div
    class="mb-3 bg-neutral-tuna-25 py-2 px-4 rounded-t-xl border-b border-neutral-tuna-100 flex items-center"
  >
    <NuxtImg class="w-6 h-6 mr-4" :src="icon" alt="icon" />
    <div class="flex flex-grow">
      <button class="block flex-grow text-left" @click="$emit('click')">
        <label
          class="block mb-1 font-bold text-neutral-tuna-300 text-xs"
          :for="id"
        >
          {{ label }}
        </label>

        <span
          class="text-sm text-neutral-tuna-300"
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
        >
          {{ value.label }}
        </div>
      </button>

      <div v-if="$slots.default" class="flex flex-col items-end ml-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
