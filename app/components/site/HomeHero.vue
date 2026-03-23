<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="text-center">
    <p
      class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-2"
    >
      {{ t("hero.eyebrow") }}
    </p>
    <h1
      class="text-[1.25rem] sm:text-[2rem] leading-[1.1] font-medium text-theme-primary tracking-tight mb-3"
    >
      <NuxtLink
        to="/about"
        class="no-underline underline-offset-4 decoration-theme-tertiary transition-all"
      >
        <SiteScrambleText
          text="Bojan Angjelkoski"
          scramble-on-mount
          use-cyrillic
        />
      </NuxtLink>
    </h1>
    <h2
      class="text-base sm:text-lg leading-[1.3] font-semibold text-theme-secondary tracking-normal mb-2"
    >
      {{ t("hero.title") }}
    </h2>
    <p
      class="text-sm sm:text-base leading-[1.6] text-theme-secondary max-w-lg mx-auto text-center"
    >
      {{ t("hero.intro") }}
    </p>
    <SiteHomeSearch class="mt-4" />
  </section>
</template>
