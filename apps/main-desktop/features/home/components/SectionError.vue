<script lang="ts" setup>
  const emits = defineEmits<{ (e: 'retry'): void }>();
</script>

<template>
  <div class="h-[324px] w-full pt-[100px] text-center">
    <strong class="mb-1 text-[21px]">Upss, ada kesalahan nih</strong>
    <p class="mb-3">Coba muat ulang halamannya, yuk!</p>
    <button
      class="text-orange-inter-600 border-orange-inter-600 hover:bg-orange-inter-50 rounded-3xl border border-solid px-4 py-2 font-bold transition duration-300"
      @click="emits('retry')"
    >
      Muat ulang
    </button>
  </div>
</template>
