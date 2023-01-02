<script lang="ts" setup>
  import useFetchImportantInfo from '../composables/use-fetch-important-info';
  const { data, pending } = await useFetchImportantInfo();
  const infos = computed(() => data.value.data);
</script>

<template>
  <section>
    <ul class="mx-4">
      <h1 class="font-bold">Informasi Penting</h1>
      <li class="mt-2">
        <a
          class="relative flex justify-between py-3.5"
          v-for="(info, index) in infos"
          :key="index"
          :href="`${info.landingPageUrl}`"
          target="_blank"
        >
          <div class="flex items-center gap-x-2">
            <NuxtImg
              :src="`${info.imageUrlIcon}`"
              :alt="`${info.description}`"
              width="28px"
              height="28px"
            />
            <p class="text-neutral-tuna-300 text-sm">
              {{ info.description }}
            </p>
          </div>
          <NuxtImg src="/icon-chevron-right-orange.svg" alt="icon" />
          <div
            class="border-neutral-tuna-50 absolute bottom-0 w-[calc(100%+16px)] border-b"
          />
        </a>
      </li>
    </ul>
  </section>
</template>
