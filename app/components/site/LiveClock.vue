<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

interface Digits {
  h1: string;
  h2: string;
  m1: string;
  m2: string;
  s1: string;
  s2: string;
}

const digits = ref<Digits>({ h1: "0", h2: "0", m1: "0", m2: "0", s1: "0", s2: "0" });
const tz = ref("");
let timer: ReturnType<typeof setInterval> | null = null;

function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  digits.value = {
    h1: h.charAt(0),
    h2: h.charAt(1),
    m1: m.charAt(0),
    m2: m.charAt(1),
    s1: s.charAt(0),
    s2: s.charAt(1),
  };

  if (!tz.value) {
    tz.value =
      Intl.DateTimeFormat("en", { timeZoneName: "short" })
        .formatToParts(now)
        .find((p) => p.type === "timeZoneName")?.value || "";
  }
}

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <span class="text-xs font-mono text-theme-secondary inline-flex items-center">
    <FlipDigit :value="digits.h1" />
    <FlipDigit :value="digits.h2" />
    <span class="mx-px">:</span>
    <FlipDigit :value="digits.m1" />
    <FlipDigit :value="digits.m2" />
    <span class="mx-px">:</span>
    <FlipDigit :value="digits.s1" />
    <FlipDigit :value="digits.s2" />
    <span class="ml-1">{{ tz }}</span>
  </span>
</template>
