<script lang="ts" setup>
  type InputProps = {
    id: string;
    value: { label: string; value: string };
    icon: string;
    label: string;
    placeholder?: string;
    nightCount?: number;
    swappable?: boolean;
    toggleable?: boolean;
    toggleValue?: boolean;
    locationClickable?: boolean;
  };

  type InputEmits = {
    (e: "click"): void;
    (e: "location-click"): void;
    (e: "swap"): void;
    (e: "toggle", value: boolean): void;
  };

  withDefaults(defineProps<InputProps>(), {
    id: "",
    value: () => ({ label: "", value: "" }),
    icon: "",
    label: "",
  });

  const emit = defineEmits<InputEmits>();
</script>

<template>
  <div
    class="mb-3 bg-neutral-tuna-25 py-2 px-3 rounded-t-xl border-b border-neutral-tuna-100 flex gap-4 items-center"
    @click="emit('click')"
  >
    <nuxt-img class="w-6 h-6" :src="icon" alt="icon" />
    <div>
      <label class="block font-bold text-neutral-tuna-300 text-sm" :for="id">
        {{ label }}
      </label>
      <input
        :id="id"
        :placeholder="placeholder"
        :value="value.label"
        type="text"
        class="block bg-transparent outline-none"
        readonly
      />
    </div>
  </div>
</template>
