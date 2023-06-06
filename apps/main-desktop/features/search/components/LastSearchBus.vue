<script lang="ts" setup>
  import useBusSearch from 'search-module/composables/use-bus-search';
  import { format } from 'date-fns';

  const { parsedLastSearch, constructSearchUrl, deleteLastSearch } =
    await useBusSearch();
</script>

<template>
  <ul class="shadow-raised z-10 min-w-[250px] rounded-xl bg-white">
    <li v-for="(item, index) in parsedLastSearch">
      <NuxtLink
        :to="constructSearchUrl(item)"
        class="border-neutral-tuna-25 block border-b p-3"
      >
        <div class="flex gap-4">
          <div class="text-sm">
            <div class="flex gap-2 whitespace-nowrap">
              <span>{{ item.origin.label }}</span>
              <span>{{ item.dateReturn ? '⟷' : '⟶' }}</span>
              <span>{{ item.destination.label }}</span>
            </div>
            <p class="text-neutral-tuna-300">
              {{ format(item.dateDeparture, 'dd MMM yyyy') }}
              {{
                item.dateReturn
                  ? `- ${format(item.dateReturn, 'dd MMM yyyy')}`
                  : ''
              }}
              &bull;
              {{ item.paxNum }}
              Penumpang
            </p>
          </div>
          <button class="ml-auto" @click.stop.prevent="deleteLastSearch(index)">
            <NuxtImg
              src="/icon-close-red.svg"
              width="12px"
              height="12px"
              role="presentation"
            />
          </button>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
