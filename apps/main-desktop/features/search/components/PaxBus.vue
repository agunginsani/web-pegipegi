<script lang="ts" setup>
  import useBusSearch from 'search-module/composables/use-bus-search';

  const { form, assignForm } = await useBusSearch();
</script>

<template>
  <div
    class="shadow-raised z-10 w-[400px] rounded-xl bg-white p-4 outline-none"
  >
    <div class="flex">
      <div class="mr-auto">
        <h3 class="font-bold">Jumlah Penumpang</h3>
        <p class="text-neutral-tuna-300 text-sm">
          Umur di atas 2 tahun wajib pesan kursi
        </p>
      </div>
      <button
        class="text-orange-inter-600 font-bold"
        @click="assignForm('paxNum', 1)"
      >
        Reset
      </button>
    </div>
    <ul>
      <li class="mt-5 flex">
        <div class="mr-auto">
          <p>Kursi</p>
          <p class="text-neutral-tuna-300 text-sm">Jumlah kursi yang dipesan</p>
        </div>
        <Counter
          :min="1"
          :max="4"
          :model-value="form.paxNum"
          @update:modelValue="assignForm('paxNum', $event)"
        />
      </li>
    </ul>
  </div>
</template>
