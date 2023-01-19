<script lang="ts" setup>
  import Swiper from './Swiper.vue';

  const homeUrl = useRuntimeConfig().public.homeUrl || 'https://pegipegi.com';
  const airlineGroups = [
    [
      {
        id: 'JT',
        url: 'LionAir.png',
        label: 'Lion Air',
        path: 'lion-air',
        color: '#ec0000',
      },
      {
        id: 'QG',
        url: 'Citilink.png',
        label: 'Citilink',
        path: 'citilink',
        color: '#52b650',
      },
      {
        id: 'SJ',
        url: 'Sriwijaya.png',
        label: 'Sriwijaya',
        path: 'sriwijaya',
        color: '#45508f',
      },
      {
        id: 'GA',
        url: 'GarudaIndonesia.png',
        label: 'Garuda Indonesia',
        path: 'garuda-indonesia',
        color: '#54b2cb',
      },
      {
        id: 'IW',
        url: 'WingsAir.png',
        label: 'Wings Air',
        path: 'wings-air',
        color: '#eb0000',
      },
      {
        id: 'QZ',
        url: 'AirAsia.png',
        label: 'Air Asia',
        path: 'air-asia',
        color: '#e32526',
      },
      {
        id: 'IN',
        url: 'Nam.png',
        label: 'Nam Air',
        path: 'nam-air',
        color: '#0a0a48',
      },
      {
        id: 'ID',
        url: 'BatikAir.png',
        label: 'Batik Air',
        path: 'batik-air',
        color: '#d41b60',
      },
      {
        id: 'TR',
        url: 'Scoot.png',
        label: 'Scoot',
        path: 'scoot',
        color: '#ffe900',
      },
      {
        id: 'MH',
        url: 'MalaysiaAirlines.png',
        label: 'Malaysia Airlines',
        path: 'malaysia-airlines',
        color: '#80bbed',
      },
    ],
    [
      {
        id: 'SQ',
        url: 'SingaporeAirlines.png',
        label: 'Singapore Airlines',
        path: 'singapore-airlines',
        color: '#00266b',
      },
      {
        id: 'CX',
        url: 'CathayPacific.png',
        label: 'Cathay Pacific Airways',
        path: 'cathay-pacific-airways',
        color: '#006565',
      },
      {
        id: 'KL',
        url: 'KLM.png',
        label: 'KLM',
        path: 'klm',
        color: '#0da6e0',
      },
      {
        id: 'VN',
        url: 'VietnamAirlines.png',
        label: 'Vietnam Airlines',
        path: 'vietnam-airlines',
        color: '#0584aa',
      },
      {
        id: 'FD',
        url: 'AirAsia.png',
        label: 'Thai AirAsia',
        path: 'thai-airasia',
        color: '#ff0008',
      },
      {
        id: 'QF',
        url: 'Qantas.png',
        label: 'Qantas',
        path: 'qantas',
        color: '#394f59',
      },
      {
        id: 'CI',
        url: 'ChinaAirlines.png',
        label: 'China Airlines',
        path: 'china-airlines',
        color: '#97a7e2',
      },
      {
        id: 'KE',
        url: 'KoreanAir.png',
        label: 'Korean Air',
        path: 'korean-air',
        color: '#0d58ad',
      },
      {
        id: 'BR',
        url: 'EvaAir.png',
        label: 'EVA Air',
        path: 'eva-air',
        color: '#058341',
      },
      {
        id: 'CZ',
        url: 'ChinaSouthernAirlines.png',
        label: 'China Southern Airlines',
        path: 'china-southern-airlines',
        color: '#062d70',
      },
    ],
    [
      {
        id: 'PG',
        url: 'BangkokAirways.png',
        label: 'Bangkok Airways',
        path: 'bangkok-airways',
        color: '#264aa1',
      },
      {
        id: 'PR',
        url: 'PhilippineAirlines.png',
        label: 'Philippine Airlines',
        path: 'philippine-airlines',
        color: '#022a67',
      },
      {
        id: 'CA',
        url: 'AirChina.png',
        label: 'Air China',
        path: 'air-china',
        color: '#0a417a',
      },
      {
        id: 'HX',
        url: 'HongKongAirlines.png',
        label: 'Hong Kong Airlines',
        path: 'hong-kong-airlines',
        color: '#d60316',
      },
      {
        id: 'JQ',
        url: 'Jetstar.png',
        label: 'Jetstar',
        path: 'jetstar',
        color: '#F78D5A',
      },
      {
        id: 'JL',
        url: 'JapanAirlines.png',
        label: 'Japan Airlines',
        path: 'japan-airlines',
        color: '#D7061A',
      },
      {
        id: 'NH',
        url: 'ANA.png',
        label: 'All Nippon Airways',
        path: 'all-nippon-airways',
        color: '#114A8D',
      },
      {
        id: 'MU',
        url: 'ChinaEasternAir.png',
        label: 'China Eastern Airlines',
        path: 'china-eastern-airlines',
      },
      {
        id: 'BI',
        url: 'RoyalBrunei.png',
        label: 'Royal Brunei Airlines',
        path: 'royal-brunei-airlines',
        color: '#ffe319',
      },
      {
        id: 'OZ',
        url: 'AsianaAirlines.png',
        label: 'Asiana Airlines',
        path: 'asiana-airlines',
        color: '#E30214',
      },
    ],
    [
      {
        id: 'TG',
        url: 'ThaiAirways.png',
        label: 'Thai Airways',
        path: 'thai-airways',
        color: '#4B225B',
      },
      {
        id: 'FM',
        url: 'ShanghaiAir.png',
        label: 'Shanghai Airlines',
        path: 'shanghai-airlines',
        color: '#DE0039',
      },
      {
        id: 'KA',
        url: 'CathayDragon.png',
        label: 'Cathay Dragon',
        path: 'cathay-dragon',
        color: '#BA0030',
      },
      {
        id: 'FY',
        url: 'Firefly.png',
        label: 'Firefly',
        path: 'firefly',
        color: '#F2641A',
      },
      {
        id: 'MI',
        url: 'SilkAir.png',
        label: 'SilkAir',
        path: 'silk-air',
        color: '#009484',
      },
      {
        id: '5J',
        url: 'CebuPacific.png',
        label: 'Cebu Pacific',
        path: 'cebu-pacific',
        color: '#06A6E0',
      },
      {
        id: 'MF',
        url: 'XiamenAirlines.png',
        label: 'Xiamen Air',
        path: 'xiamen-air',
        color: '#008AC5',
      },
      {
        id: 'WE',
        url: 'ThaiSmile.png',
        label: 'Thai Smile',
        path: 'thai-smile',
        color: '#F07623',
      },
    ],
  ];
</script>

<template>
  <section class="text-neutral-tuna-800 my-6" aria-labelledby="airlines-title">
    <h1 id="airlines-title" class="text-center text-base font-bold">
      Partner Maskapai Pegipegi
    </h1>
    <Swiper :indicated="true">
      <li
        class="mt-[2px] flex min-w-full justify-center px-3"
        v-for="(airlines, index) in airlineGroups"
        :key="index"
      >
        <div class="h-auto max-w-[230px]">
          <NuxtLink
            v-for="(airline, index) in airlines"
            :key="index"
            :to="`${homeUrl}/flight/${airline.path}`"
          >
            <NuxtImg
              :src="airline.url"
              width="36px"
              height="36px"
              :alt="airline.label"
              style="box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.200994)"
              class="shadow-floating mr-2.5 mt-2.5 inline rounded-full"
            />
          </NuxtLink>
        </div>
      </li>
    </Swiper>
  </section>
</template>
