<script setup lang="ts">
usePageSeo('About — Bojan Angjelkoski')
const { about } = useSiteContent()
</script>

<template>
  <div class="flex flex-col gap-8">
    <SitePageIntro
      eyebrow="About"
      title="Engineering leadership, product systems, and thoughtful software execution."
      intro="Currently leading engineering at Injective Labs. Focused on high-leverage execution, technical leadership, and building systems that scale."
    />

    <section class="max-w-2xl space-y-6">
      <p v-for="paragraph in about" :key="paragraph" class="text-base leading-relaxed text-theme-primary">
        {{ paragraph }}
      </p>
    </section>
  </div>
</template>
