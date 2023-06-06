<script lang="ts" setup>
  const props = defineProps<{
    sectionId: string;
    icon?: string;
    isLoading?: boolean;
    href?: { link: string; label: string };
  }>();
</script>

<template>
  <section
    :aria-labelledby="props.sectionId"
    class="w-[inherit] min-w-[inherit] max-w-[inherit]"
  >
    <div
      class="flex items-center justify-between"
      :class="{ 'animate-pulse': props.isLoading }"
    >
      <div class="flex items-center gap-3">
        <template v-if="!props.isLoading">
          <NuxtImg
            width="40"
            height="40"
            :src="props.icon"
            v-if="props.icon"
            role="presentation"
          />
          <h2
            class="text-neutral-tuna-800 text-2xl font-bold"
            :id="props.sectionId"
          >
            <slot name="title"></slot>
          </h2>
        </template>
        <template v-else>
          <div class="bg-neutral-tuna-100 h-8 w-8 rounded-full" />
          <div class="bg-neutral-tuna-100 h-6 w-[200px] rounded" />
        </template>
      </div>
      <template v-if="props.href">
        <a
          v-if="!props.isLoading"
          class="text-orange-inter-600 font-bold"
          :href="props.href.link"
          target="_blank"
          >{{ props.href.label }}</a
        >
        <div v-else class="bg-neutral-tuna-100 h-4 w-[78px] rounded" />
      </template>
    </div>

    <div class="text-neutral-tuna-300" v-if="$slots.descriptions">
      <slot name="descriptions"></slot>
    </div>

    <div class="pt-3">
      <slot></slot>
    </div>
  </section>
</template>
