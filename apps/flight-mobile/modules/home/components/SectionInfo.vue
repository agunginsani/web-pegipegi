<script lang="ts" setup>
  import useFetchImportantInfo from '../composables/use-fetch-important-info';
  const { data, pending } = await useFetchImportantInfo();
  const infos = computed(() => data.value?.data || []);
</script>

<template>
  <section class="mb-2 pl-4" aria-labelledby="important-info-title">
    <h2 id="important-info-title" class="font-bold">Informasi Penting</h2>
    <ul class="mt-2">
      <li
        class="border-neutral-tuna-50 border-b py-3.5 last-of-type:border-transparent"
        v-for="(info, index) in infos"
        :key="index"
      >
        <a
          class="relative flex items-center pr-4"
          :href="`${info.landingPageUrl}`"
          target="_blank"
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
    </ul>
  </section>
</template>
