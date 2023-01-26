<script lang="ts" setup>
  type LocationSearchItemProps = {
    title: string;
    description: string;
    type: string;
    icon: string;
    keyword?: string;
  };

  const props = defineProps<LocationSearchItemProps>();
  defineEmits<{
    (name: 'select'): void;
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
      class="border-neutral-tuna-25 flex w-full items-center gap-2 border-b py-2 pr-4 text-left"
      @click="$emit('select')"
    >
      <div>
        <p v-html="highlight(title)" />
        <p
          class="text-neutral-tuna-300 text-sm"
          v-html="highlight(description)"
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
</template>
