<script lang="ts" setup>
  type LocationSearchItemProps = {
    title?: string;
    description?: string;
    type?: string;
    icon?: string;
    keyword?: string;
    loading?: boolean;
  };

  const props = defineProps<LocationSearchItemProps>();
  defineEmits<{
    (name: 'select'): void;
  }>();

  function highlight(input: string) {
    if (!props.keyword) return input;

    const regex = new RegExp(props.keyword, 'ig');
    return input.replace(regex, `<strong style="color: #FE5000;">$&</strong>`);
  }
</script>

<template>
  <li v-if="!loading" class="pl-4">
    <button
      class="border-neutral-tuna-25 flex w-full items-center gap-2 border-b py-2 pr-4 text-left"
      @click="$emit('select')"
    >
      <div>
        <p v-html="highlight(title ?? '')" />
        <p
          class="text-neutral-tuna-300 text-sm"
          v-html="highlight(description ?? '')"
        />
      </div>
      <div
        class="bg-neutral-tuna-50 ml-auto flex shrink-0 items-center gap-1 rounded-md px-2 py-1"
      >
        <NuxtImg width="16" height="16" :src="icon" :alt="type" />
        <p class="text-neutral-tuna-300 text-sm">
          {{ type }}
        </p>
      </div>
    </button>
  </li>
  <li v-else class="pl-4">
    <div class="border-neutral-tuna-50 flex justify-between border-b py-3 pr-4">
      <div>
        <div class="bg-neutral-tuna-50 mb-2 h-4 w-32 rounded"></div>
        <div class="bg-neutral-tuna-50 h-3 w-52 rounded"></div>
      </div>
      <div class="bg-neutral-tuna-50 h-5 w-12 rounded"></div>
    </div>
  </li>
</template>
