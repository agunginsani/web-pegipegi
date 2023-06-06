<script lang="ts" setup>
  import SearchFormInput from 'search-module/components/SearchFormInput.vue';
  import useHotelSearchForm from 'search-module/composables/use-hotel-search-form';
  import usePopover from 'common-module/composables/use-popover';

  const { form, setForm } = await useHotelSearchForm();
  const label = computed(
    () => `${form.value.room} Kamar • ${form.value.guest} Tamu`
  );

  watch(
    () => form.value.room,
    (value) => {
      if (value > form.value.guest) {
        setForm({ guest: value });
      }
    }
  );

  watch(
    () => form.value.guest,
    (value) => {
      if (form.value.room > value) {
        setForm({ room: value });
      }
    }
  );

  const {
    triggerRef: guestRoomInput,
    targetRef: guestRoomModal,
    active,
    toggle,
  } = usePopover();

  function onReset() {
    setForm({
      guest: 2,
      room: 1,
    });
  }
</script>

<template>
  <div class="relative">
    <SearchFormInput
      ref="guestRoomInput"
      label="Kamar & Tamu"
      icon="/icon-search-hotel-room.svg"
      :value="{ label }"
      @click="toggle"
      :active="active"
    />
    <div
      ref="guestRoomModal"
      v-if="active"
      class="shadow-floating absolute -left-1/2 z-10 mt-2 flex min-w-[462px] flex-col gap-3 rounded-2xl bg-white px-4 py-2 xl:left-0"
    >
      <div class="flex justify-between py-2">
        <div class="mr-auto">
          <p class="font-bold">Kamar & Tamu</p>
          <p class="text-neutral-tuna-300 text-sm">
            Kamar tidak boleh lebih dari tamu
          </p>
        </div>
        <button
          @click="onReset"
          class="text-neutral-tuna-200 text-sm font-bold"
          :class="{
            'text-orange-inter-500': form.room !== 1 || form.guest !== 2,
          }"
        >
          Reset
        </button>
      </div>
      <div class="flex justify-between py-2">
        <div class="mr-auto">
          <p>Kamar</p>
          <p class="text-neutral-tuna-300 text-sm">
            Total kamar yang dibutuhkan
          </p>
        </div>
        <Counter v-model="form.room" :min="1" :max="8" />
      </div>
      <div class="flex justify-between py-2">
        <div class="mr-auto">
          <p>Tamu</p>
          <p class="text-neutral-tuna-300 text-sm">Jumlah tamu yang menginap</p>
        </div>
        <Counter v-model="form.guest" :min="1" :max="32" />
      </div>
    </div>
  </div>
</template>
