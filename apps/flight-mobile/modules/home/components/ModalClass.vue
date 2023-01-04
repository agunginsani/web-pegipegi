<script lang="ts" setup>
  import { BottomSheet, Radio } from '@pegipegi/web-pegipegi-ui';

  const route = useRoute();
  const router = useRouter();

  const isClassActive = computed({
    get() {
      return !!route.query.showClass;
    },
    set(value) {
      if (value) {
        router.push(`${route.path}?showClass=true`);
      } else if (!!route.query.showClass) {
        router.go(-1);
      }
    },
  });
</script>

<template>
  <!-- TODO: drop ClientOnly -->
  <ClientOnly>
    <BottomSheet v-model="isClassActive">
      <section aria-labelledby="class-selection">
        <div class="border-neutral-tuna-50 flex border-b px-4 py-2">
          <h2 id="class-selection" class="text-lg font-bold">Pilih Kelas</h2>
        </div>
        <ul class="p-4">
          <li v-for="i in 4" class="mb-4 flex items-center last-of-type:mb-0">
            <div class="mr-auto">
              <p>Ekonomi</p>
              <p class="text-neutral-tuna-300 text-sm">
                Pilihan paling hemat untuk sampai ke destinasi
              </p>
            </div>
            <Radio />
          </li>
        </ul>
      </section>
    </BottomSheet>
  </ClientOnly>
</template>
