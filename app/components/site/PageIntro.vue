<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  intro: string;
}>();
</script>

<template>
  <header class="mb-16">
    <p class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-4">
      {{ eyebrow }}
    </p>
    <h1
      class="text-[2rem] sm:text-[2.5rem] leading-[1.15] font-medium text-theme-primary tracking-tight mb-6"
    >
      {{ title }}
    </h1>
    <p class="text-base sm:text-[1.0625rem] leading-[1.6] text-theme-primary max-w-xl">
      {{ intro }}
    </p>
  </header>
</template>
