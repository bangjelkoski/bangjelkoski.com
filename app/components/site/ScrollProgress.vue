<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const progress = ref(0);
let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      ticking = false;
    });
    ticking = true;
  }
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none">
    <div
      class="h-full bg-[var(--color-scroll-progress)] transition-[width] duration-75"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
