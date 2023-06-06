<script lang="ts" setup>
  const props = defineProps<{
    modelValue: string;
    options: Array<{ label: string; value: string }>;
    compact?: boolean;
  }>();
  const emit = defineEmits<{
    (name: 'update:modelValue', payload: string): void;
  }>();
</script>

<template>
  <div class="bg-neutral-tuna-25 w-fit rounded-[100px]">
    <button
      class="text-neutral-tuna-300 bg-neutral-tuna-25 hover:bg-neutral-tuna-50 rounded-[100px] px-5 py-4 font-bold transition duration-300"
      :class="{
        '!text-neutral-tuna-0 !bg-orange-inter-600 !hover:bg--orange-inter-600':
          opt.value === props.modelValue,
        'xl:px-10': !props.compact,
        '2xl:px-10': props.compact,
      }"
      v-for="(opt, index) in props.options"
      :key="`chip${index}`"
      @click="emit('update:modelValue', opt.value)"
    >
      <slot :name="opt.value" :label="opt.label">
        {{ opt.label }}
      </slot>
    </button>
  </div>
</template>
