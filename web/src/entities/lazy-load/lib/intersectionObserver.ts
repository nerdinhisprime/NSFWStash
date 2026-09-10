import { onMounted, onUnmounted, nextTick, Ref, ref } from 'vue';

export const ioFn = (
  targetEl: Ref<HTMLElement | null>,
  fn: () => Promise<boolean | void> | boolean | void,
  rootMargin = 200,
) => {
  const isLoad = ref(false);
  const isDone = ref(false);
  let observer: IntersectionObserver;

  const isStillIntersecting = () => {
    if (!targetEl.value) return false;
    const rect = targetEl.value.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight + rootMargin && rect.bottom >= -rootMargin
    );
  };

  const handleIntersect = async () => {
    if (isLoad.value || isDone.value) return;
    isLoad.value = true;
    let shouldContinue: boolean | void = true;
    try {
      shouldContinue = await fn();
    } finally {
      isLoad.value = false;
    }
    if (shouldContinue === false) {
      isDone.value = true;
      observer?.disconnect();
      return;
    }
    await nextTick();
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
