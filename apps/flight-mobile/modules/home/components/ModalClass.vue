<script lang="ts" setup>
  import { BottomSheet, Radio } from '@pegipegi/web-pegipegi-ui';
  import useSearchForm from 'home-module/composables/use-search-form';

  const route = useRoute();
  const router = useRouter();

  function onBottomSheetToggle(value: boolean) {
    if (value) {
      router.push(`${route.path}?showClass=true`);
    } else if (!!route.query.showClass) {
      router.go(-1);
    }
  }

  const { availableClass, searchForm, setSearchForm } = useSearchForm();

  const classModel = computed({
    get() {
      return searchForm.class.value;
    },
    set(value) {
      setSearchForm({
        class: {
          label:
            availableClass.find((item) => item.code === value)?.displayName ??
            '',
          value,
        },
      });
    },
  });
  watch(
    () => searchForm.class.value,
    () => {
      router.go(-1);
    }
  );
</script>

<template>
  <BottomSheet
    :modelValue="!!$route.query.showClass"
    @update:modelValue="onBottomSheetToggle"
  >
    <section aria-labelledby="class-selection-title">
      <div class="border-neutral-tuna-50 flex border-b px-4 py-2">
        <h2 id="class-selection-title" class="text-lg font-bold">
          Pilih Kelas
        </h2>
      </div>
      <ul class="px-4 pt-4">
        <li
          v-for="item in availableClass"
          class="pb-4 last-of-type:pb-0"
          :key="`class-${item.code}`"
        >
          <label
            class="flex items-center gap-2"
            :for="`flight-class-${item.code}`"
          >
            <div class="mr-auto">
              <p>
                {{ item.displayName }}
              </p>
              <p class="text-neutral-tuna-300 text-sm">
                {{ item.description }}
              </p>
            </div>
            <Radio
              :id="`flight-class-${item.code}`"
              :value="item.code"
              v-model="classModel"
            />
          </label>
        </li>
      </ul>
    </section>
  </BottomSheet>
</template>
