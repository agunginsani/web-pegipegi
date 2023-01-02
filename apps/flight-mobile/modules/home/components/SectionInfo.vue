<script lang="ts" setup>
  import useFetchImportantInfo from '../composables/use-fetch-important-info';
  const { data, pending } = await useFetchImportantInfo();
  const infos = computed(() => data.value.data);
</script>

<template>
  <section>
    <div class="pl-4">
      <h1 class="font-bold">Informasi Penting</h1>
      <ul class="mt-2">
        <li
          class="border-neutral-tuna-50 border-b py-3.5"
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
              :src="`${info.imageUrlIcon}`"
              :alt="`${info.description}`"
              width="28px"
              height="28px"
            />
            <p class="text-neutral-tuna-300 text-sm">
              {{ info.description }}
            </p>
            <NuxtImg
              class="ml-auto"
              src="/icon-chevron-right-orange.svg"
              alt="icon"
            />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
