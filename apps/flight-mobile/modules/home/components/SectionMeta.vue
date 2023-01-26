<script lang="ts" setup>
  import metaContents from '../enums/meta-contents';
  const isOpen = ref<boolean>(false);
</script>

<template>
  <section class="border-neutral-tuna-100 mx-4 border-b-[1px] py-6">
    <div
      class="content-wrapper overflow-hidden text-center transition-all duration-500"
      :class="{
        'max-h-[2500px]': isOpen,
        'max-h-[120px]': !isOpen,
      }"
    >
      <div v-for="(content, index) in metaContents" :key="index">
        <div v-html="content.title" />
        <div v-html="content.paragraph" />
      </div>
    </div>
    <button
      class="mx-auto mt-2 flex items-center gap-x-[9px]"
      @click="isOpen = !isOpen"
    >
      <p class="text-orange-inter-600 font-bold">
        {{ isOpen ? 'Sembunyikan' : 'Selengkapnya' }}
      </p>
      <NuxtImg
        src="/icon-chevron-down-orange.svg"
        width="20px"
        height="20px"
        :class="{ 'rotate-180': isOpen }"
        :alt="isOpen ? 'Sembunyikan' : 'Selengkapnya'"
      />
    </button>
  </section>
</template>
