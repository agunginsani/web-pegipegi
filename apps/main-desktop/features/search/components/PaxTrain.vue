<script lang="ts" setup>
  import useTrainSearchForm from 'search-module/composables/use-train-search-form';

  const { form, setForm } = await useTrainSearchForm();

  const passengersDetail = computed(() => ({
    adult: {
      title: 'Dewasa',
      description: '>3 tahun',
      modelValue: form.value.passengers.value.adult,
      min: 1,
      max: 4,
    },
    infant: {
      title: 'Bayi',
      description: '<3 tahun, tidak dapat kursi',
      modelValue: form.value.passengers.value.infant,
      min: 0,
      max: form.value.passengers.value.adult,
    },
  }));

  function onReset() {
    setForm({
      passengers: {
        label: '1 Dewasa • 0 Bayi',
        value: {
          adult: 1,
          infant: 0,
        },
      },
    });
  }

  function onUpdate(value: number, key: string) {
    const newValue = JSON.parse(JSON.stringify(form.value.passengers.value));
    newValue[key] = value;

    setForm({
      passengers: {
        label: `${newValue.adult} Dewasa • ${newValue.infant} Bayi`,
        value: newValue,
      },
    });
  }

  watch(
    () => form.value.passengers.value.adult,
    () => {
      const pax = form.value.passengers.value;
      if (pax.adult < pax.infant) {
        onUpdate(pax.adult, 'infant');
      }
    }
  );
</script>

<template>
  <div class="shadow-raised w-[400px] rounded-xl bg-white p-4 outline-none">
    <div class="flex">
      <div class="mr-auto">
        <h3 class="font-bold">Jumlah Penumpang</h3>
        <p class="text-neutral-tuna-300 text-sm">
          Bayi duduk bersama orang dewasa
        </p>
      </div>
      <button class="text-orange-inter-600 font-bold" @click="onReset">
        Reset
      </button>
    </div>
    <ul>
      <li v-for="(item, key) in passengersDetail" class="mt-5 flex">
        <div class="mr-auto">
          <p>{{ item.title }}</p>
          <p class="text-neutral-tuna-300 text-sm">{{ item.description }}</p>
        </div>
        <Counter
          :modelValue="item.modelValue"
          :min="item.min"
          :max="item.max"
          @update:modelValue="onUpdate($event, key)"
        />
      </li>
    </ul>
  </div>
</template>
