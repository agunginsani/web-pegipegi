<script lang="ts" setup>
  import SearchFormInput from './SearchFormInput.vue';
  import Section from './LocationSearchSection.vue';
  import ItemRow from './LocationSearchItem.vue';
  import usePopover from 'common-module/composables/use-popover';
  import { TransitionRoot } from '@headlessui/vue';
  import type {
    LocationSearchItem,
    LocationSearchSelection,
  } from 'search-module/types/search-types';

  const props = defineProps<{
    lastSearch: Array<LocationSearchItem>;
    popularDestination: Array<LocationSearchItem>;
    searchResult: Array<LocationSearchItem>;
    modelValue: LocationSearchSelection;
    label: string;
    pending?: boolean;
    placeholder?: string;
    icon?: string;
    nearLocation?: LocationSearchItem;
    pendingGpsFetch?: boolean;
    popoverActive?: boolean;
    popoverText?: string;
    noChild?: boolean;
    locationBtnHidden?: boolean;
  }>();

  const keyword = ref('');
  const hasSearch = ref(false);

  const { active, targetRef, hide, show } = usePopover({
    onOpen: () => emit('search', ''),
    onClose: () => {
      hasSearch.value = false;
      emit('close');
    },
  });

  defineExpose({ show });

  watch(
    () => props.modelValue,
    () => {
      keyword.value = props.modelValue.label || '';
    }
  );

  const emit = defineEmits<{
    (name: 'update:modelValue', payload: LocationSearchSelection): void;
    (name: 'clear'): void;
    (name: 'close'): void;
    (name: 'search', payload: string): void;
    (name: 'nearby-fetched', payload: { lat: number; lng: number }): void;
    (name: 'nearby-error'): void;
    (name: 'select', payload: LocationSearchItem): void;
  }>();

  function onSearch(event: Event) {
    keyword.value = (event.target as HTMLInputElement).value;
    show();
    hasSearch.value = true;
    emit('search', keyword.value);
  }

  function onSelect(item: LocationSearchItem, isSelectNear?: boolean) {
    if (isSelectNear) {
      if (navigator.geolocation) {
        const options = { timeout: 3000 };
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            emit('nearby-fetched', {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (e) => {
            console.error(e);
            emit('nearby-error');
          },
          options
        );
      } else {
        emit('nearby-error');
      }
    }

    if (!isSelectNear || !props.pendingGpsFetch) {
      emit('update:modelValue', {
        label: item.title,
        value: item.value,
        payload: item.payload,
      });
      emit('select', item);
      hide();
      hasSearch.value = false;
    }
  }
</script>

<template>
  <div class="relative">
    <SearchFormInput
      :label="label"
      :icon="icon"
      :placeholder="placeholder"
      :value="modelValue"
      :active="active"
      :popover-active="popoverActive"
      :popover-text="popoverText"
      searchable
      @search="onSearch"
      @click="show()"
    >
      <button
        v-if="!!nearLocation && !locationBtnHidden"
        @click="onSelect(nearLocation!, true)"
      >
        <NuxtImg
          src="/icon-detect-location-full.svg"
          width="24"
          height="24"
          alt="Near Location"
        />
      </button>
    </SearchFormInput>

    <TransitionRoot
      ref="targetRef"
      appear
      as="template"
      enter="transform transition duration-[400ms] origin-top"
      enter-from="opacity-0 scale-y-50"
      enter-to="opacity-100 scale-y-100"
      leave="transform duration-200 transition ease-in-out origin-top"
      leave-from="opacity-100 scale-y-100 "
      leave-to="opacity-0 scale-y-95 "
      :show="active"
    >
      <div
        class="shadow-floating absolute z-10 max-h-[524px] w-[563px] overflow-y-auto rounded-2xl bg-white py-2"
      >
        <Section v-if="pending">
          <ItemRow v-if="noChild" v-for="i in 8" pending />
          <ItemRow v-else v-for="i in 2" pending>
            <ItemRow v-for="j in 2" pending />
          </ItemRow>
        </Section>

        <Section
          v-else-if="hasSearch && searchResult.length <= 0"
          class="flex flex-col items-center justify-center py-16"
        >
          <NuxtImg src="/figure-try-again.webp" alt="Try Again" />
          <h3 class="mb-1 text-[21px] font-bold">
            Waduh... gak ada hasilnya nih
          </h3>
          <p class="w-[328px] text-center text-sm">
            Sepertinya kata kunci yang kamu cari belum pas. Coba cari yang lain,
            ya!
          </p>
        </Section>

        <Section v-else-if="searchResult.length > 0">
          <ItemRow
            v-for="(item, idx) in searchResult"
            :key="`result-${idx}`"
            :item="item"
            :keyword="keyword"
            @select="onSelect(item)"
          >
            <ItemRow
              v-for="(itemChild, idxChild) in item.child || []"
              :key="`result-${idx}-${idxChild}`"
              :item="itemChild"
              :keyword="keyword"
              @select="onSelect(itemChild)"
            />
          </ItemRow>
        </Section>

        <template v-else>
          <div
            v-if="!!nearLocation"
            class="hover:bg-neutral-tuna-25 flex cursor-pointer items-center gap-2 px-4 py-2"
            @click="onSelect(nearLocation!, true)"
          >
            <NuxtImg
              src="/icon-detect-location.svg"
              width="24"
              height="24"
              alt="Near Location"
            />
            <div>
              <h3 class="text-neutral-tuna-800 text-base">
                {{ nearLocation.title }}
              </h3>
              <p class="text-neutral-tuna-300 text-sm">
                {{ nearLocation.description }}
              </p>
            </div>
          </div>

          <Section v-if="lastSearch?.length > 0" title="Pencarian Terakhir">
            <ItemRow
              :item="item"
              v-for="(item, idx) in lastSearch"
              :key="`last-search-${idx}`"
              @select="onSelect(item)"
            />
            <template #action>
              <button
                class="text-orange-inter-600 text-sm font-bold"
                @click="emit('clear')"
              >
                Hapus semua
              </button>
            </template>
          </Section>

          <Section title="Destinasi Populer">
            <div class="flex flex-wrap gap-2 px-4 py-1.5">
              <div
                v-for="(item, idx) in popularDestination"
                :key="`popular-destination-${idx}`"
                class="border-neutral-tuna-100 hover:bg-neutral-tuna-25 w-auto cursor-pointer rounded-[18px] border px-3 py-2"
                @click="onSelect(item)"
              >
                <p class="text-neutral-tuna-800 text-sm">{{ item.title }}</p>
              </div>
            </div>
          </Section>
        </template>
      </div>
    </TransitionRoot>
  </div>
</template>
