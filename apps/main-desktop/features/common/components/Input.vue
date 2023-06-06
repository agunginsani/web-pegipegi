<script lang="ts" setup>
  const props = defineProps<{
    modelValue: string;
    isError?: boolean;
    errorText?: string;
  }>();
  const emits = defineEmits<{
    (e: 'update:modelValue', payload: string): void;
    (e: 'blur'): void;
  }>();
</script>

<template>
  <div>
    <div
      class="bg-neutral-tuna-0 border-neutral-tuna-100 w-full overflow-hidden rounded-xl rounded-tl-none border border-solid px-3 py-4"
      :class="{ 'bg-red-flower-50 border-red-flower-700': props.isError }"
    >
      <input
        class="w-full text-sm outline-0"
        :class="{ 'bg-red-flower-50': props.isError }"
        placeholder="Tulis email kamu di sini"
        :value="props.modelValue"
        @input="
          emits('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @blur="emits('blur')"
      />
    </div>
    <p v-if="props.isError" class="text-red-flower-700 text-[10px]">
      {{ props.errorText }}
    </p>
  </div>
</template>
