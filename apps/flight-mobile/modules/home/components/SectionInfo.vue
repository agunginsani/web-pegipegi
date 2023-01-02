<script lang="ts" setup>
  import useFetchImportantInfo from '../composables/use-fetch-important-info';
  const { data, pending } = await useFetchImportantInfo();
  const infos = ref(data.value.data);
</script>

<template>
  <section>
    <div class="mx-4">
      <h1 class="font-bold">Informasi Penting</h1>
      <div class="mt-2">
        <div
          class="relative flex justify-between py-3.5"
          v-for="(info, index) in infos"
          :key="index"
        >
          <div class="flex items-center gap-x-2">
            <NuxtImg
              :src="`${info.imageUrlIcon}`"
              alt="icon"
              width="28px"
              height="28px"
            />
            <p class="text-neutral-tuna-300 text-sm">
              {{ info.description }}
            </p>
          </div>
          <a :href="`${info.landingPageUrl}`">
            <NuxtImg src="/icon-chevron-right-orange.svg" alt="icon" />
          </a>
          <div
            class="border-neutral-tuna-50 absolute bottom-0 w-[calc(100%+16px)] border-b"
          />
        </div>
      </div>
    </div>
  </section>
</template>
