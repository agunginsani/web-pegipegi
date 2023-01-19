<script lang="ts" setup>
  const isOpen = ref<boolean>(false);

  const contentValues = [
    {
      title:
        '<h2 class="font-bold">Booking Pesawat Mudah, Murah, dan Banyak Pilihannya Hanya di Pegipegi!</h2>',
      paragraph:
        "<p class='text-neutral-tuna-300 mt-3 text-sm'>Anda penat atau bosan? Liburan tentu bisa menjadi solusi tepat untuk mengobatinya. Salah satu caranya adalah Anda berkunjung ke destinasi favorit atau menjelajahi berbagai spot wisata menarik yang ada di Indonesia. Seperti yang Anda tahu, Indonesia memiliki banyak sekali tempat wisata memesona, mulai dari pantai, gunung, hingga pulau-pulau eksotis yang tersebar di penjuru negeri.Belum lagi tempat wisata hits dan kekinian yang sayang jika Anda lewatkan. Berkomitmen sebagai 'fun traveling partner' untuk Anda, Pegipegi hadir memberikan kemudahan dalam pemesanan tiket pesawat. Alhasil, destinasi impian pun bisa lebih cepat Anda kunjungi. Nah, bagaimana Pegipegi membantu Anda mendapatkan tiket pesawat dengan mudah plus OK harganya?</p>",
    },
    {
      title:
        '<h2 class="font-bold mt-6">Mau Terbang ke Destinasi Impian? Gampang!</h2>',
      paragraph: `<p class="text-neutral-tuna-300 mt-3 text-sm">Pegipegi siap membantu Anda mendapatkan tiket pesawat ke destinasi impian. Dengan sistem pemesanan berbasis online, Pegipegi dapat diakses kapan saja dan dari mana saja, baik melalui aplikasi smartphone maupun situs desktop dan mobile. Selain itu, Pegipegi memiliki lebih dari 25.000 rute penerbangan domestik, sehingga Anda bisa dengan cepat dan nyaman memesan tiket pesawat ke Bali, tiket pesawat ke Jogja, tiket pesawat ke Jakarta, tiket pesawat ke Lombok, tiket pesawat ke Malang, tiket pesawat ke Medan, dan tiket pesawat ke kota-kota lainnya. </p><p class="text-neutral-tuna-300 mt-3 text-sm">Bekerja sama resmi dengan berbagai maskapai terbaik, seperti Citilink, Lion Air, Garuda Indonesia, AirAsia, Sriwijaya Air, Batik Air, Wings Air, NAM Air, dan Scoot, Pegipegi tidak hanya memberikan kemudahan saat melakukan pemesanan tiket pesawat online, tapi juga kepercayaan dan tiket promo spesial untuk para pelanggan.</p><p class="text-neutral-tuna-300 mt-3 text-sm">Menariknya lagi, di Pegipegi Anda bisa merencanakan perjalanan, baik single trip maupun round trip dengan mudah. Setelah itu, Anda bisa membandingkan harga tiket pesawat dan jadwal tiket pesawat secara online dari seluruh maskapai yang beroperasi di penerbangan tersebut. Tersedia juga fitur 'Filter' meliputi Maskapai, Waktu, Harga, dan Transit untuk mempercepat proses pencarian tiket pesawat Anda.</p>`,
    },
    {
      title:
        '<h2 class="font-bold mt-6">Butuh Tiket Pesawat Harga OK? Pasti Ada!</h2>',
      paragraph:
        "<p class='text-neutral-tuna-300 mt-3 text-sm'>Selain memiliki proses pemesanan tiket pesawat yang ramah digunakan, setiap harinya Pegipegi juga selalu menghadirkan promo tiket pesawat yang dapat Anda manfaatkan. Seperti promo reguler, promo spesial, hingga promo dari bank partner terbaik, sehingga Anda bisa mendapatkan harga tiket pesawat yang sesuai dengan bujet atau bahkan tiket pesawat murah. Promo tiket pesawat ini hadir salah satunya demi menjawab kebutuhan para pelanggan akan tiket murah.</p>",
    },
    {
      title:
        '<h2 class="font-bold mt-6">Praktis dengan Berbagai Metode Pembayaran</h2>',
      paragraph:
        "<p class='text-neutral-tuna-300 mt-3 text-sm'>Untuk melengkapi kemudahan, keamanan, dan kenyamanan bertransaksi Anda, Pegipegi dibekali dengan berbagai metode pembayaran. Mulai dari transfer bank melalui ATM, perbankan online, kartu kredit, sampai dengan cicilan 0%. Anda juga dapat mengunjungi Alfamart atau Indomaret terdekat untuk melakukan pembayaran secara tunai.</p>",
    },
    {
      title:
        '<h2 class="font-bold mt-6">Didukung oleh Customer Service Berpengalaman</h2>',
      paragraph:
        "<p class='text-neutral-tuna-300 mt-3 text-sm'>Satu lagi yang menjadi kelebihan Pegipegi. Bila Anda menemukan kesulitan atau membutuhkan bantuan saat melakukan booking hotel secara online, Anda dapat menghubungi Customer Service Pegipegi di nomor telepon 0804 1400 777. Dengan pelayanan yang profesional dan berpengalaman, Customer Service Pegipegi siap membantu Anda setiap hari selama 24 jam.</p><p class='text-neutral-tuna-300 mt-3 text-sm'>Selain itu, Customer Service Pegipegi juga dapat membantu Anda untuk melakukan pembatalan pemesanan (cancel), pengembalian dana (refund), atau penjadwalan ulang (reschedule) pada pemesanan hotel yang telah berhasil Anda lakukan. Oleh sebab itu, Anda tak perlu panik pemesanan akan hangus.</p>",
    },
  ];
</script>

<template>
  <section
    aria-label="SEO Content"
    class="border-neutral-tuna-100 mx-4 border-b-[1px] py-6"
  >
    <div
      class="content-wrapper overflow-hidden text-center transition-all duration-500"
      :class="{
        'max-h-[2500px]': isOpen,
        'max-h-[120px]': !isOpen,
      }"
    >
      <div v-for="(content, index) in contentValues" :key="index">
        <div v-html="content.title" />
        <div v-html="content.paragraph" />
      </div>
    </div>
    <button
      class="mx-auto mt-2 flex items-center gap-x-[9px]"
      @click="isOpen = !isOpen"
    >
      <p class="text-orange-inter-600 font-bold">
        {{ isOpen ? 'Sembunyikan' : 'Selengkapnya' }}
      </p>
      <NuxtImg
        src="/icon-chevron-down-orange.svg"
        width="20px"
        height="20px"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
  </section>
</template>
