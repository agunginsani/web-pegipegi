<script lang="ts" setup>
  type CalendarItemEmits = {
    (e: 'pick', payload: Date): void;
  };

  defineEmits<CalendarItemEmits>();
</script>

<template>
  <!-- TODO: integration -->
  <li class="border-yellow-candle-400 m-3 rounded-xl border bg-white">
    <h2 class="mb-2 p-3 font-bold">Juni 2022</h2>
    <div class="grid grid-cols-7">
      <button
        v-for="date in 31"
        class="py-3 text-center"
        @click="$emit('pick', new Date())"
      >
        <p class="mb-1 text-sm">{{ date }}</p>
        <p class="text-neutral-tuna-300 text-[10px]">315</p>
      </button>
    </div>
  </li>
</template>
