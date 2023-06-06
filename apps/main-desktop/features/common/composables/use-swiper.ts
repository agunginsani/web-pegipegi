type SwiperConfig = {
  el: Ref<ComponentPublicInstance<HTMLElement> | undefined>;
  isLooped: boolean;
  spaceBetween: number;
  slidesData?: Ref<Array<any> | null>;
  pending?: Ref<boolean>;
};

export default function useSwiper(config: SwiperConfig) {
  let swiperContainer: HTMLElement | null;
  let slideWidth: number;
  let slidesPerView: number;
  let realSlidesNum: number;

  let nextLoopTarget: number;
  let nextLoopThreshold: number;
  let prevLoopTarget: number;
  let prevLoopThreshold: number;

  const isOverflow = ref<boolean>(false);

  async function delay(timeout: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), timeout);
    });
  }

  async function initializeSwiper() {
    swiperContainer = config.el.value?.$el;
    if (!swiperContainer) {
      // throw new Error('Failed Swiper Initialization');
      return;
    }

    overflowCheck();

    if (!isOverflow.value || !config.isLooped || !config.slidesData?.value)
      return;

    //add fake slides to simulate looping slides (this will mutate passed refs)
    let slides = config.slidesData.value;
    config.slidesData.value = [
      slides[slides.length - 1],
      ...slides,
      ...slides,
      slides[0],
    ];

    await delay(300);

    let firstItem = swiperContainer.children.item(0);
    if (!firstItem) return;
    slideWidth = firstItem?.clientWidth;
    slidesPerView =
      swiperContainer.clientWidth /
      (firstItem?.clientWidth + config.spaceBetween);
    realSlidesNum = (config.slidesData.value.length - 2) / 2;

    // scroll to first real slide
    swiperContainer.scrollTo({ left: getOffsetPos(realSlidesNum + 1) });

    // thresholds that signifies next & prev loop, and to which location it should adjust its scroll position
    nextLoopTarget = getOffsetPos(
      Math.floor(realSlidesNum - slidesPerView) + 1
    );
    nextLoopThreshold = getOffsetPos(
      Math.floor(realSlidesNum * 2 - slidesPerView) + 1
    );
    prevLoopTarget = getOffsetPos(realSlidesNum + 1);
    prevLoopThreshold = getOffsetPos(1);

    swiperContainer.removeEventListener('scroll', onScroll);
    swiperContainer.addEventListener('scroll', onScroll);
  }

  function destroySwiper() {
    if (config.isLooped) {
      swiperContainer?.removeEventListener('scroll', onScroll);
    }
  }

  function navigate(isPrev = false) {
    if (!swiperContainer) return;

    if (config.isLooped) {
      if (
        !isPrev &&
        Math.abs(swiperContainer.scrollLeft - nextLoopThreshold) <= 3
      ) {
        swiperContainer.scrollTo({ left: nextLoopTarget });
      } else if (
        isPrev &&
        Math.abs(swiperContainer.scrollLeft - prevLoopThreshold) <= 3
      ) {
        swiperContainer.scrollTo({ left: prevLoopTarget });
      }
    }

    if (isPrev)
      swiperContainer.scrollBy({
        behavior: 'smooth',
        left: -slideWidth - config.spaceBetween,
      });
    else
      swiperContainer.scrollBy({
        behavior: 'smooth',
        left: slideWidth + config.spaceBetween,
      });
  }

  function centerTarget(targetIndex: number) {
    if (!swiperContainer || !targetIndex) return;
    const el = swiperContainer.children.item(targetIndex);
    if (el instanceof HTMLElement) {
      swiperContainer.scrollTo({
        behavior: 'smooth',
        left: el.offsetLeft - swiperContainer.clientWidth / 2,
      });
    }
  }

  function onScroll() {
    if (!swiperContainer) return;
    if (swiperContainer.scrollLeft >= nextLoopThreshold + 3) {
      swiperContainer.scrollTo({ left: nextLoopTarget });
    } else if (swiperContainer.scrollLeft <= prevLoopThreshold - 3) {
      swiperContainer.scrollTo({ left: prevLoopTarget });
    }
  }

  function overflowCheck() {
    if (
      !swiperContainer ||
      swiperContainer.scrollWidth <= swiperContainer.clientWidth
    ) {
      isOverflow.value = false;
      return;
    }
    isOverflow.value = true;
  }

  function getOffsetPos(slideIndex: number): number {
    if (!swiperContainer) return 0;
    const slide = swiperContainer.children.item(slideIndex);
    return slide && slide instanceof HTMLElement ? slide.offsetLeft : 0;
  }

  onMounted(() => {
    initializeSwiper();
  });

  if (config.pending !== undefined) {
    watch(config.pending, async () => {
      if (config.pending?.value) return;
      await nextTick();
      initializeSwiper();
    });
  }

  onUnmounted(() => {
    destroySwiper();
  });

  return {
    isOverflow,
    navigate,
    centerTarget,
  };
}
