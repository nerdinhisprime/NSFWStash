import { onMounted, onUnmounted, nextTick, Ref, ref } from 'vue';

export const ioFn = (
  targetEl: Ref<HTMLElement | null>,
  fn: () => Promise<void> | void,
  rootMargin = 200,
) => {
  const isLoad = ref(false);
  let observer: IntersectionObserver;

  // ручная проверка пересечения с учётом rootMargin
  const isStillIntersecting = () => {
    if (!targetEl.value) return false;
    const rect = targetEl.value.getBoundingClientRect();
    return rect.top <= window.innerHeight + rootMargin && rect.bottom >= -rootMargin;
  };

  const handleIntersect = async () => {
    if (isLoad.value) return;
    isLoad.value = true;
    try {
      await fn();
    } finally {
      isLoad.value = false;
    }
    // ждём, пока Vue отрендерит новые элементы в DOM
    await nextTick();
    // если после подгрузки sentinel всё ещё в зоне видимости — грузим ещё
    if (isStillIntersecting()) {
      handleIntersect();
    }
  };

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleIntersect();
      },
      { rootMargin: `${rootMargin}px` },
    );
    if (targetEl.value) observer.observe(targetEl.value);
  });

  onUnmounted(() => observer?.disconnect());
};
