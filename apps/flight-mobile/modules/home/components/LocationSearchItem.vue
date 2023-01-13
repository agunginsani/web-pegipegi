<script lang="ts" setup>
  import { SearchFormValue } from 'home-module/composables/use-search-form';

  type LocationSearchItemProps = {
    title: string;
    description: string;
    type: string;
    value: SearchFormValue;
    keyword?: string;
  };

  const props = defineProps<LocationSearchItemProps>();
  defineEmits<{
    (name: 'select', value: SearchFormValue): void;
  }>();

  function highlight(input: string) {
    if (!props.keyword) return input;

    const regex = new RegExp(props.keyword, 'ig');
    return input.replace(regex, `<span style="color: #FE5000;">$&</span>`);
  }
</script>

<template>
  <li class="pl-4">
    <button
      class="border-neutral-tuna-25 flex w-full items-center border-b py-2 pr-4 text-left"
      @click="$emit('select', value)"
    >
      <div>
        <p v-html="highlight(title)" />
        <p
          class="text-neutral-tuna-300 text-sm"
          v-html="highlight(description)"
        />
      </div>
      <div
        class="bg-neutral-tuna-50 ml-auto flex items-center gap-1 rounded-md px-2 py-1"
      >
        <NuxtImg
          width="16"
          height="16"
          :src="
            type === 'Kota'
              ? '/icon-location-city.svg'
              : '/icon-location-airport.svg'
          "
        />
        <p class="text-neutral-tuna-300 text-sm">
          {{ type }}
        </p>
      </div>
    </button>
  </li>
</template>
