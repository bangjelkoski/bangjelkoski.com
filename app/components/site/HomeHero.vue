<script setup lang="ts">
const { hero } = useSiteContent();
</script>

<template>
  <section class="text-center">
    <p class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-2">
      {{ hero.eyebrow }}
    </p>
    <h1
      class="text-[1.25rem] sm:text-[2rem] leading-[1.1] font-medium text-theme-primary tracking-tight mb-3"
    >
      <NuxtLink
        to="/about"
        class="hover:underline underline-offset-4 decoration-theme-tertiary transition-all"
      >
        <SiteScrambleText text="Bojan Angjelkoski" scramble-on-mount use-cyrillic />
      </NuxtLink>
    </h1>
    <p class="text-sm sm:text-base leading-[1.6] text-theme-secondary max-w-lg">
      {{
        hero.intro ||
        "Director of Engineering at Injective Labs. First employee. Building teams, systems, and products that ship."
      }}
    </p>
    <SiteHomeSearch class="mt-4" />
  </section>
</template>
