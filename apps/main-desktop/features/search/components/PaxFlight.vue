<script lang="ts" setup>
  import useFlightSearchForm from 'search-module/composables/use-flight-search-form';

  const { form, setForm } = await useFlightSearchForm();

  const passengersDetail = computed(() => ({
    adult: {
      title: 'Dewasa',
      description: '>12 tahun',
      modelValue: form.value.passengers.value.adult,
      min: 1,
      max: 7 - form.value.passengers.value.child,
    },
    child: {
      title: 'Anak-anak',
      description: '2-11 tahun',
      modelValue: form.value.passengers.value.child,
      min: 0,
      max: 7 - form.value.passengers.value.adult,
    },
    infant: {
      title: 'Bayi',
      description: '<2 tahun',
      modelValue: form.value.passengers.value.infant,
      min: 0,
      max:
        form.value.passengers.value.adult < 4
          ? form.value.passengers.value.adult
          : 4,
    },
  }));

  function onReset() {
    setForm({
      passengers: {
        label: '1 Dewasa • 0 Anak • 0 Bayi',
        value: {
          adult: 1,
          child: 0,
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
        label: `${newValue.adult} Dewasa • ${newValue.child} Anak • ${newValue.infant} Bayi`,
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
          Jumlah bayi tidak boleh lebih dari dewasa
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
