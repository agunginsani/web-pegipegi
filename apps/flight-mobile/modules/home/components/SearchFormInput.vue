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
    class="mb-3 bg-neutral-tuna-25 py-3 px-4 rounded-t-xl border-b border-neutral-tuna-100 flex items-center"
  >
    <NuxtImg class="w-6 h-6 mr-4" :src="icon" alt="icon" />
    <div class="flex flex-grow">
      <button class="block flex-grow text-left" @click="$emit('click')">
        <label class="block font-bold text-neutral-tuna-300 text-sm" :for="id">
          {{ label }}
        </label>
        <input
          :id="id"
          :placeholder="placeholder"
          :value="value.label"
          type="text"
          class="block bg-transparent outline-none max-[360px]:text-sm"
          readonly
        />
      </button>

      <div v-if="$slots.default" class="flex flex-col items-end ml-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
