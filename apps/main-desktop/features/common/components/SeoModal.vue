<script lang="ts" setup>
  import type { HotelIndex } from 'api/hotel/index-list.get';
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

  interface Link {
    text: string;
    url?: string;
  }

  interface Category {
    title: string;
    links?: Array<Link>;
  }

  defineProps<{
    show: boolean;
    title: string;
    categories: Array<Category>;
    indexList?: Array<HotelIndex> | null;
  }>();

  const emit = defineEmits<{
    (name: 'close'): void;
  }>();
</script>

<template>
  <div>
    <div
      v-show="show"
      @click="emit('close')"
      class="bg-neutral-tuna-900/30 fixed left-0 top-0 block h-screen w-screen"
    />

    <transition
      enter-active-class="transition ease duration-500 transform"
      enter-from-class="translate-y-full"
      enter-to-class="-translate-y-0"
      leave-active-class="transition ease duration-500 transform"
      leave-from-class="-translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-show="show"
        class="shadow-raised fixed bottom-0 left-0 w-full rounded-t-[20px] bg-white"
      >
        <div class="flex justify-between px-4 pb-2 pt-3">
          <h3 class="text-lg font-bold">{{ title }}</h3>
          <button @click="emit('close')">
            <NuxtImg src="/icon-close.svg" alt="Close" />
          </button>
        </div>
        <TabGroup as="div">
          <TabList class="flex w-full flex-row items-center justify-center">
            <Tab
              v-for="item in categories"
              as="template"
              :key="item.title"
              v-slot="{ selected }"
            >
              <button
                :class="[
                  'relative m-0.5 flex flex-row items-center justify-center gap-2 border-b-2 px-3 py-2 text-sm font-bold outline-none',
                  selected
                    ? 'border-b-orange-inter-600 text-orange-300'
                    : 'text-neutral-tuna-300 border-b-transparent',
                ]"
              >
                {{ item.title }}
              </button>
            </Tab>
          </TabList>

          <TabPanels class="border-t-neutral-tuna-100 border-t bg-white">
            <TabPanel
              :unmount="false"
              v-for="(item, idx) in categories"
              :key="idx"
            >
              <div class="px-6 pb-4 pt-3">
                <ul
                  class="text-neutral-tuna-800 flex h-[188px] flex-col flex-wrap gap-3 overflow-x-auto text-sm"
                >
                  <li
                    v-for="link in item.links"
                    :key="link.text"
                    class="hover:text-orange-inter-600 w-[231px]"
                  >
                    <a v-if="link.url" :href="link.url">
                      {{ link.text }}
                    </a>
                  </li>
                </ul>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <div v-if="!!indexList" class="flex gap-4 px-6 pb-5">
          <a
            :href="
              item.index !== 'OTHER'
                ? `/hotel/${item.indexUrl}`
                : '/hotel/area-index/'
            "
            class="after:border-neutral-tuna-800 text-neutral-tuna-800 hover:text-orange-inter-600 relative text-sm outline-none after:absolute after:-right-[9px] after:top-1/2 after:h-[1px] after:w-1/2 after:border-r-4 last:after:hidden"
            v-for="item in indexList"
            :key="item.index"
          >
            {{ item.index !== 'OTHER' ? item.index : 'Index berdasarkan area' }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
