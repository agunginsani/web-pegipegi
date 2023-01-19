<script lang="ts" setup>
  import Swiper from './Swiper.vue';
  import SwiperItem from './SwiperItem.vue';

  const uspContents = [
    {
      title: 'Kemudahan Pembayaran',
      text: ' Pilih metode pembayaran sesuai keinginan Anda (transfer, kartu kredit, pembayaran di swalayan, internet banking, dan cicilan).',
      imageUrl: '/figure-usp-pembayaran.png',
    },
    {
      title: 'Diskon & Promo',
      text: 'Nikmati harga spesial dan dapatkan juga beragam promo menarik lainnya.',
      imageUrl: '/figure-usp-promo.png',
    },
    {
      title: 'Sistem yang Terpecaya',
      text: 'Telah terverifikasi oleh SSL yang menjamin privasi dan keamanan transaksi online Anda. Customer Service 24 Jam ',
      imageUrl: '/figure-usp-terpercaya.png',
    },
    {
      title: 'Customer Service 24 Jam ',
      text: 'Punya pertanyaan seputar hotel, tiket pesawat dan tiket kereta, atau ingin menanyakan pesanan Anda? Silakan hubungi Customer Service kami di: 0804 1400 777',
      imageUrl: '/figure-usp-cs.png',
    },
  ];
</script>

<template>
  <section class="text-neutral-tuna-800" aria-labelledby="usp-title">
    <h2 id="usp-title" class="text-center text-base font-bold">
      Kenapa Pegipegi?
    </h2>
    <Swiper>
      <SwiperItem
        class="border-neutral-tuna-100 mt-3 flex min-w-full flex-col items-center justify-center gap-1 border-b-[1px]"
        v-for="(content, index) in uspContents"
        :key="index"
      >
        <NuxtImg
          :src="content.imageUrl"
          width="140px"
          height="140px"
          :alt="content.title"
          class="my-3"
        />
        <h2 class="mb-2 text-sm font-bold">
          {{ content.title }}
        </h2>
        <p class="mb-4 text-center text-sm">{{ content.text }}</p>
      </SwiperItem>
    </Swiper>
  </section>
</template>
