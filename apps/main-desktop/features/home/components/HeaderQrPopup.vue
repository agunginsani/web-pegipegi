<template>
  <div
    class="shadow-raised bg-neutral-tuna-0 z-30 flex w-[375px] items-center gap-6 rounded-2xl p-6"
  >
    <NuxtImg src="/figure-install-qr.svg" width="120" />
    <div>
      <p class="mb-3 text-sm font-bold">
        Scan QR disamping ini atau download aplikasi di:
      </p>
      <div class="flex gap-2">
        <a
          href="https://play.google.com/store/apps/details?id=com.pegipegi.android&referrer=af_tranid%3DRDPVcAKIh_dU_5n1CEkJ1g%26pid%3Dinternal%26c%3Dsp_main_homepage%26utm_source%3Dinternal%26utm_campaign%3Dsp_main_homepage"
          target="_blank"
          rel="noopener"
        >
          <NuxtImg src="/figure-google-play.webp" alt="Google Play" />
        </a>
        <a
          href="https://apps.apple.com/ID/app/id1054846518?mt=8"
          target="_blank"
          rel="noopener"
        >
          <NuxtImg src="/figure-app-store.webp" alt="App Store" />
        </a>
      </div>
    </div>
  </div>
</template>
