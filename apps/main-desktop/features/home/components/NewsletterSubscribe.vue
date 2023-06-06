<script lang="ts" setup>
  import Input from 'common-module/components/Input.vue';
  import useSnackbar from 'common-module/composables/use-snackbar';

  const config = useRuntimeConfig();
  const { sendInfo } = useSnackbar();

  const email = ref<string>('');
  const isDirty = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isEmailValid = computed<boolean>(() => {
    const regex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
    );
    return !!email.value.match(regex);
  });

  async function onSubscribe() {
    isDirty.value = true;
    if (!isEmailValid.value || isLoading.value) return;
    isLoading.value = true;
    try {
      await $fetch('/api/subscribe-newsletter', {
        method: 'POST',
        body: {
          email: email.value,
        },
      });
      sendInfo('Berhasil subscribe newsletter 🙌');
    } catch (e) {
      console.error(e);
    }
    isLoading.value = false;
    isDirty.value = false;
    email.value = '';
  }
</script>

<template>
  <div
    class="bg-neutral-tuna-25 grid w-full grid-cols-2 gap-8 rounded-xl px-8 py-7"
  >
    <div class="text-neutral-tuna-800">
      <h2 class="mb-3 text-xl font-bold">Mau promo eksklusif dari Pegipegi?</h2>
      <p>
        Daftarin email kamu yuk, biar pas Pegipegi lagi bagi-bagi promo bisa
        dikabarin!
      </p>
    </div>
    <div class="text-neutral-tuna-800 flex gap-3">
      <div>
        <Input
          v-model="email"
          :is-error="!isEmailValid && isDirty"
          error-text="Cek kembali email yang kamu masukan"
          class="mb-2 w-full text-sm outline-0"
          placeholder="Tulis email kamu di sini"
          @blur="isDirty = true"
        />

        <p class="text-[10px]">
          Dengan mengklik <strong>Saya Mau</strong>, kamu setuju dengan
          <a
            :href="`${config.public.homeUrl}/syarat-ketentuan`"
            class="text-orange-inter-600"
            >Syarat & Ketentuan
          </a>
          dan
          <a
            :href="`${config.public.homeUrl}/kebijakan-privasi`"
            class="text-orange-inter-600"
            >Kebijakan Privasi
          </a>
          kami.
        </p>
      </div>
      <button
        class="border-orange-inter-600 text-orange-inter-600 hover:bg-orange-inter-50 transition-duration-300 h-fit shrink-0 rounded-[28px] border border-solid px-8 py-4 font-bold transition"
        @click="onSubscribe"
      >
        Saya Mau!
      </button>
    </div>
  </div>
</template>
