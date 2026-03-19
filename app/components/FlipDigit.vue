<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps<{ value: string }>();

const current = ref(props.value);
const previous = ref(props.value);
const flipping = ref(false);

const prefersReducedMotion = ref(false);

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
});

watch(
  () => props.value,
  (newVal, oldVal) => {
    if (newVal === oldVal) return;
    previous.value = oldVal;
    current.value = newVal;

    if (prefersReducedMotion.value) return;

    flipping.value = true;
    setTimeout(() => {
      flipping.value = false;
    }, 300);
  },
);
</script>

<template>
  <span class="flip-digit" aria-hidden="true">
    <span class="flip-digit-current">{{ current }}</span>
    <span v-if="flipping" class="flip-digit-old">{{ previous }}</span>
  </span>
</template>

<style scoped>
.flip-digit {
  display: inline-flex;
  width: 1ch;
  height: 1em;
  overflow: hidden;
  justify-content: center;
  position: relative;
}

.flip-digit-current {
  line-height: 1;
}

.flip-digit-old {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  line-height: 1;
  animation: slideUp 0.3s ease forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flip-digit-old {
    animation: none !important;
  }
}
</style>
