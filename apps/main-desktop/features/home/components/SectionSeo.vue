<script lang="ts" setup>
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  } from '@headlessui/vue';
</script>

<template>
  <div class="mb-6 py-5">
    <h2 class="mb-3 text-2xl font-bold">
      Booking Hotel Mudah, Murah, dan Banyak Pilihannya Hanya di Pegipegi
    </h2>
    <Disclosure v-slot="{ open }">
      <p>
        Menginap di hotel atau penginapan yang nyaman merupakan salah satu cara
        terbaik untuk menikmati perjalanan, baik itu untuk liburan ataupun
        perjalanan bisnis. Di Pegipegi, Anda bisa dengan mudah menemukan hotel
        atau penginapan yang tepat plus sesuai bujet, mulai dari hotel murah,
        boutique hotel, hingga hotel bintang 5. Nah, momen mencari hotel terbaik
        ini juga menjadi hal yang penting, khususnya bagi Anda yang berencana
        liburan bersama keluarga. Anda perlu melengkapi informasi mengenai
        fasilitas dan keunikan yang ditawarkan dari masing-masing hotel untuk
        menyesuaikannya dengan kebutuhan Anda. Misalnya, bagi yang gemar berfoto
        Anda dapat memilih hotel bergaya industrialis atau hotel syariah untuk
        Anda yang mencari nuansa Islami. Bagaimana Pegipegi membantu Anda
        menemukan hotel terbaik dengan mudah?
      </p>
      <transition
        v-show="open"
        enter-active-class="transition duration-200 ease-out origin-top"
        enter-from-class="transform scale-y-50 opacity-0"
        enter-to-class="transform scale-y-100 opacity-100"
        leave-active-class="transition duration-100 ease-out origin-top"
        leave-from-class="transform scale-y-100 opacity-100"
        leave-to-class="transform scale-y-50 opacity-0"
      >
        <DisclosurePanel static class="mt-3 flex flex-col gap-3">
          <h3 class="mt-2 font-bold">
            Mau Hotel Seperti Apa? Pegipegi Banyak Pilihannya!
          </h3>
          <p>
            Apapun kebutuhan perjalanan Anda, Pegipegi hadir sebagai fun
            traveling partner yang siap membantu Anda melakukan pemesanan hotel.
            Melalui sistem pemesanan yang berbasis online, Anda dapat mengakses
            Pegipegi dari aplikasi booking hotel di smartphone maupun situs
            desktop dan mobile. Tak hanya untuk booking hotel murah, Anda juga
            dapat menemukan inspirasi dan informasi seputar promo hotel dari
            media sosial dan situs Pegipegi.
          </p>
          <p>
            Selain itu, Pegipegi juga menawarkan banyak pilihan hotel yang bisa
            dipesan secara online. Mulai dari hotel kelas menengah hingga kelas
            berbintang untuk kebutuhan menginap Anda selama traveling. Anda juga
            bisa dengan mudah menemukan hotel-hotel strategis seperti hotel
            dekat bandara, hotel dekat pantai, hotel dekat stasiun, dan hotel
            dekat tempat wisata.
          </p>
          <p>
            Bersama Pegipegi, Anda tak perlu khawatir kehabisan pilihan hotel
            menarik, karena Pegipegi menyediakan lebih dari 25.000 pilihan hotel
            di Indonesia dan juga internasional. Mulai dari hotel di Bandung,
            hotel di Jogja, hotel di Malang, hotel di Surabaya, hotel di
            Jakarta, hotel di Bali, hotel di Semarang, hingga hotel di
            Singapore, hotel di Kuala Lumpur, dan hotel di Penang. Selain hotel,
            Anda juga bisa menemukan penginapan murah atau bujet seperti
            homestay, guest house, hostel, dan villa murah.
          </p>
          <p>
            Untuk menjamin kenyamanan Anda, Pegipegi bekerja sama secara resmi
            dengan berbagai grup hotel terkemuka. Mulai dari Amaris Hotel, POP!
            Hotel, HARRIS Hotel, Swiss-Belhotel, Whiz Hotel, Red Planet Hotel,
            favehotel, Aston Hotel, Santika Hotel, Jayakarta Hotel, Sahid Hotel,
            Horison Hotel, Kagum Hotel, Best Western Hotel, Grand Tjokro Hotel,
            Airy, ZEN Rooms, RedDoorz Hotel, dan banyak lagi lainnya.
          </p>
          <h3 class="mt-2 font-bold">
            Pastikan Anda Memilih Hotel Tepat dengan Informasi Akurat
          </h3>
          <p>
            Ragu pas mau pesan hotel? Tenang, di Pegipegi Anda dapat melihat
            rating dan membaca review (ulasan) asli yang dikirim langsung oleh
            wisatawan pada setiap hotel. Rating dan review ini bisa Anda
            manfaatkan sebagai pertimbangan dalam memilih hotel yang tepat
            sesuai dengan kebutuhan perjalanan Anda.
          </p>
          <p>
            Selain itu, informasi dari setiap hotel berupa foto-foto, pilihan
            tipe kamar, tempat-tempat menarik di sekitar hotel serta fasilitas
            hotel lainnya seperti ada atau tidaknya kolam renang, restoran,
            layanan spa, pusat kebugaran, dan fasilitas bisnis juga bisa dengan
            mudah Anda temukan di Pegipegi.
          </p>
          <p>
            Bagi Anda yang membutuhkan hotel-hotel dekat dengan tempat menarik
            tertentu, misalnya hotel dekat Malioboro, hotel dekat Taman Safari,
            hotel dekat Trans Studio Bandung, hotel dekat Bandara Juanda, atau
            hotel dekat Pantai Kuta, Pegipegi hadir memberikan rekomendasi yang
            akurat meliputi jarak tempuh dan informasi detail mengenai
            tempat-tempat menarik tersebut.
          </p>
          <h3 class="mt-2 font-bold">
            Galau Mau Bayar Pakai Apa? Tenang, Semua Bisa!
          </h3>
          <p>
            Setelah melihat rating, membaca review, dan memilih hotel yang Anda
            inginkan, tahap selanjutnya adalah melakukan pembayaran. Untuk
            melengkapi kemudahan, keamanan, dan kenyamanan Anda, Pegipegi
            dibekali dengan berbagai metode pembayaran. Mulai dari transfer bank
            melalui ATM, perbankan online, kartu kredit, hingga cicilan 0%.
            Selain itu, Anda juga dapat mengunjungi Alfamart atau Indomaret
            terdekat untuk melakukan pembayaran secara tunai.
          </p>
          <h3 class="mt-2 font-bold">
            Didukung oleh Customer Service Berpengalaman
          </h3>
          <p>
            Satu lagi yang menjadi kelebihan Pegipegi. Bila Anda menemukan
            kesulitan atau membutuhkan bantuan saat melakukan booking hotel
            secara online, Anda dapat menghubungi Customer Service Pegipegi di
            <a
              class="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
              href="mailto:cs@pegipegi.com"
            >
              cs@pegipegi.com</a
            >
            ataupun kontak yang tertera di halaman
            <a
              class="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
              href="https://www.pegipegi.com/faq"
            >
              FAQ</a
            >. Dengan pelayanan yang profesional dan berpengalaman, Customer
            Service Pegipegi siap membantu Anda setiap hari dari pukul 07.00 -
            22.00.
          </p>
          <p>
            Selain itu, Customer Service Pegipegi juga dapat membantu Anda untuk
            melakukan pembatalan pemesanan (cancel), pengembalian dana (refund),
            atau penjadwalan ulang (reschedule) pada pemesanan hotel yang telah
            berhasil Anda lakukan. Oleh sebab itu, Anda tak perlu panik
            pemesanan akan hangus.
          </p>
          <p>
            Jadi tunggu apalagi? Segera booking hotel impian Anda melalui
            Pegipegi dan temukan berbagai promo hotel menarik untuk
            menyempurnakannya.
          </p>
          <p>Mudah pakainya, semakin banyak pilihan hotelnya! #pegipegiyuk</p>
        </DisclosurePanel>
      </transition>
      <DisclosureButton
        class="text-orange-inter-600 mr-auto mt-3 flex items-center gap-1 text-sm font-bold"
        >{{ open ? 'Sembunyikan' : 'Baca selengkapnya' }}
        <NuxtImg
          :class="{ 'rotate-180': open }"
          src="/icon-chevron-down-orange.svg"
          alt="Button Toggle"
        />
      </DisclosureButton>
    </Disclosure>
  </div>
</template>
