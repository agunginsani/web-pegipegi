<script lang="ts" setup>
  type SearchFormInputProps = {
    label: string;
    value?: {
      label: string;
      value?: string | Date | Object;
    };
    placeholder?: string;
    icon?: string;
    searchable?: boolean;
    active?: boolean;
    popoverActive?: boolean;
    popoverText?: string;
  };

  type SearchFormInputEmits = {
    (e: 'click', payload: Event): void;
    (e: 'search', payload: Event): void;
  };

  const emit = defineEmits<SearchFormInputEmits>();
  const props = defineProps<SearchFormInputProps>();
  const inputRef = ref<HTMLInputElement | null>(null);
  const buttonRef = ref<HTMLElement | null>(null);
  const keyword = ref<string>(props.value?.label ?? '');

  watch(
    () => props.value,
    () => {
      keyword.value = props.value?.label ?? '';
    },
    {
      deep: true,
    }
  );

  onClickOutside(buttonRef, () => {
    keyword.value = props.value?.label ?? '';
  });

  function onClick(event: Event) {
    emit('click', event);
    if (props.searchable && !!inputRef.value) {
      inputRef.value.focus();
      inputRef.value.selectionStart = 0;
      inputRef.value.selectionEnd = inputRef.value.value.length;
    }
  }
</script>

<template>
  <div
    ref="buttonRef"
    class="bg-neutral-tuna-25 hover:bg-neutral-tuna-50 border-neutral-tuna-100 flex w-full cursor-pointer items-center gap-3 rounded-t-lg border-b px-3 py-1 text-left"
    :class="{ 'border-orange-inter-600': active }"
    :aria-label="`${props.label} ${props.value?.label}`"
    @click="onClick"
  >
    <div class="relative shrink-0">
      <NuxtImg
        v-if="props.icon"
        :src="props.icon"
        :alt="props.label"
        role="presentation"
        width="20px"
        height="20px"
      />
      <div
        class="bg-neutral-tuna-800 absolute -left-4 bottom-9 rounded-lg px-3 py-2 text-white"
        v-if="props.popoverActive"
      >
        <div
          class="border-t-neutral-tuna-800 absolute top-full h-0 w-0 border-[10px] border-transparent"
        />
        <p class="whitespace-nowrap text-sm">
          {{ props.popoverText }}
        </p>
      </div>
    </div>
    <div class="w-full">
      <label class="text-neutral-tuna-300 text-xs font-bold" :for="props.label">
        {{ props.label }}
      </label>
      <input
        ref="inputRef"
        type="text"
        class="w-full bg-transparent text-sm outline-none"
        v-model="keyword"
        :id="props.label"
        :class="{ 'pointer-events-none': !props.searchable }"
        :disabled="!props.searchable"
        :readonly="!props.searchable"
        :placeholder="props.placeholder"
        @input="emit('search', $event)"
      />
    </div>
    <div v-if="$slots.default" class="ml-auto flex items-center" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
