<script lang="ts" setup>
  type Item = {
    title: string;
    description?: string;
    icon?: string;
    type?: string;
  };
  const props = defineProps<{
    item?: Item;
    keyword?: string;
    pending?: boolean;
  }>();

  const emit = defineEmits<{
    (name: 'select'): void;
  }>();

  function highlight(input: string) {
    if (!props.keyword) return input;

    const regex = new RegExp(props.keyword, 'ig');
    return input.replace(regex, `<strong style="color: #FE5000;">$&</strong>`);
  }
</script>

<template>
  <div class="hover:bg-neutral-tuna-25 flex flex-col">
    <div
      v-if="item && !pending"
      @click="emit('select')"
      class="flex cursor-pointer items-start justify-between px-4 pb-2 pt-2.5"
    >
      <div>
        <h3
          class="text-neutral-tuna-800 text-base"
          v-html="highlight(item.title ?? '')"
        />
        <p
          class="text-neutral-tuna-300 text-sm"
          v-html="highlight(item.description ?? '')"
        />
      </div>
      <div
        class="bg-neutral-tuna-50 flex items-center justify-center gap-[2px] rounded-[4px] p-1"
      >
        <NuxtImg
          v-if="item.icon"
          :src="item.icon"
          width="16"
          height="16"
          role="presentation"
        />
        <p class="text-neutral-tuna-300 text-sm">{{ item.type }}</p>
      </div>
    </div>
    <div
      v-else
      @click="emit('select')"
      class="flex animate-pulse cursor-pointer items-start justify-between px-4 pb-2 pt-2.5"
    >
      <div>
        <div class="bg-neutral-tuna-50 mb-2 h-4 w-[115px] rounded" />
        <div class="bg-neutral-tuna-50 h-3 w-[202px] rounded" />
      </div>
      <div class="bg-neutral-tuna-50 h-5 w-9 rounded" />
    </div>
    <div class="ml-6"><slot /></div>
  </div>
</template>
