<script lang="ts" setup>
  import { BottomSheet, Button } from '@pegipegi/web-pegipegi-ui';

  const route = useRoute();
  const router = useRouter();

  const isPaxActive = computed({
    get() {
      return !!route.query.showPassenger;
    },
    set(value) {
      if (value) {
        router.push(`${route.path}?showPassenger=true`);
      } else {
        router.go(-1);
      }
    },
  });
</script>

<template>
  <!-- TODO: drop ClientOnly -->
  <ClientOnly>
    <BottomSheet v-model="isPaxActive">
      <section aria-labelledby="passenger-count">
        <div class="border-neutral-tuna-50 flex gap-3 border-b px-4 py-2">
          <div>
            <h2 id="passenger-count" class="text-lg font-bold">
              Jumlah Penumpang
            </h2>
            <p class="text-neutral-tuna-300 text-sm">
              Jumlah bayi tidak boleh lebih dari dewasa
            </p>
          </div>
          <button class="text-orange-inter-600 ml-auto font-bold">Reset</button>
        </div>

        <ul class="p-4">
          <li v-for="i in 3" class="mb-3 flex">
            <div>
              <p>Dewasa</p>
              <p class="text-neutral-tuna-300 text-sm">&gt;12 Tahun</p>
            </div>
            <div class="ml-auto flex items-center gap-3">
              <button
                class="bg-neutral-tuna-50 flex h-8 w-8 items-center justify-center rounded-full"
              >
                <NuxtImg src="/icon-subtract.svg" alt="Subtract" />
              </button>
              <p class="text-lg font-bold">4</p>
              <button
                class="bg-neutral-tuna-50 flex h-8 w-8 items-center justify-center rounded-full"
              >
                <NuxtImg src="/icon-add.svg" alt="Add" />
              </button>
            </div>
          </li>
        </ul>

        <div class="px-4">
          <Button block @click="$router.go(-1)">Simpan</Button>
        </div>
      </section>
    </BottomSheet>
  </ClientOnly>
</template>
