<script lang="ts" setup>
  const emits = defineEmits<{
    (name: 'navigate', payload: boolean): void;
  }>();
</script>

<template>
  <button
    class="shadow-lifted bg-neutral-tuna-0 absolute left-[-24px] top-1/2 z-10 translate-x-[16px] translate-y-[-50%] rounded-full p-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    @click="emits('navigate', true)"
  >
    <NuxtImg
      alt="prev"
      width="24px"
      height="24px"
      class="rotate-180"
      src="/icon-chevron.svg"
      role="presentation"
    />
  </button>
  <button
    class="shadow-lifted bg-neutral-tuna-0 absolute right-[-24px] top-1/2 z-10 translate-x-[-16px] translate-y-[-50%] rounded-full p-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    @click="emits('navigate', false)"
  >
    <NuxtImg
      alt="next"
      width="24px"
      height="24px"
      src="/icon-chevron.svg"
      role="presentation"
    />
  </button>
</template>
