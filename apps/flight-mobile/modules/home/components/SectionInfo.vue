<script lang="ts" setup>
  import useFetchImportantInfo from '../composables/use-fetch-important-info';
  const { data, pending, error } = await useFetchImportantInfo();
  const infos = computed(() => data.value?.data || []);
</script>

<template>
  <section class="mb-2 pl-4" aria-labelledby="important-info-title">
    <h2 id="important-info-title" class="font-bold">Informasi Penting</h2>
    <ul class="mt-2">
      <li
        v-if="!pending && !error"
        class="border-neutral-tuna-50 border-b last-of-type:border-transparent"
        v-for="(info, index) in infos"
        :key="index"
      >
        <a
          class="relative flex items-center py-3.5 pr-4"
          :href="`${info.landingPageUrl}`"
        >
          <NuxtImg
            class="mr-2"
            :src="info.imageUrlIcon"
            :alt="info.description"
            width="28"
            height="28"
            loading="lazy"
          />
          <p class="text-neutral-tuna-300 text-sm">
            {{ info.description }}
          </p>
          <NuxtImg
            class="ml-auto"
            src="/icon-chevron-right-orange.svg"
            alt="icon"
            width="24"
            height="24"
          />
        </a>
      </li>
      <template v-else>
        <li
          v-for="i in 3"
          class="border-neutral-tuna-50 flex items-center border-b py-3 pr-4 last-of-type:border-transparent"
        >
          <div class="bg-neutral-tuna-50 mr-5 h-8 w-8 rounded-full"></div>
          <div class="bg-neutral-tuna-50 h-5 w-32 rounded"></div>
        </li>
      </template>
    </ul>
  </section>
</template>
