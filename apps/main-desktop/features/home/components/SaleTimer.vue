<script lang="ts" setup>
  const props = defineProps<{
    duration: number;
  }>();
  const emit = defineEmits<{
    (name: 'finished'): void;
  }>();

  const timeRemaining = ref<number>(Math.max(0, props.duration));
  function leadingZero(num: number) {
    return `0${Math.floor(num)}`.slice(-2);
  }
  const hoursRemain = computed(() =>
    leadingZero(timeRemaining.value / (1000 * 60 * 60))
  );
  const minutesRemain = computed(() =>
    leadingZero((timeRemaining.value % (1000 * 60 * 60)) / 60000)
  );
  const secondsRemain = computed(() =>
    leadingZero((timeRemaining.value % (1000 * 60)) / 1000)
  );

  let interval: NodeJS.Timer;
  onMounted(() => {
    let lastTick: number = new Date().getTime();
    interval = setInterval(() => {
      const tickDiff: number = new Date().getTime() - lastTick;
      lastTick = new Date().getTime();
      timeRemaining.value -= tickDiff;

      if (timeRemaining.value <= 0) {
        timeRemaining.value = 0;
        emit('finished');
        clearInterval(interval);
      }
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(interval);
  });
</script>

<template>
  <div class="flex items-center gap-1 text-xs">
    <div class="bg-red-flower-700 text-neutral-tuna-0 rounded-lg p-1">
      {{ hoursRemain }}
    </div>
    <p>:</p>
    <div class="bg-red-flower-700 text-neutral-tuna-0 rounded-lg p-1">
      {{ minutesRemain }}
    </div>
    <p>:</p>
    <div class="bg-red-flower-700 text-neutral-tuna-0 rounded-lg p-1">
      {{ secondsRemain }}
    </div>
  </div>
</template>
