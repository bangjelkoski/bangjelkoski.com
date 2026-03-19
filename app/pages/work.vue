<script setup lang="ts">
usePageSeo('Work — Bojan Angjelkoski')
const { projects } = useSiteContent()
</script>

<template>
  <div class="flex flex-col gap-12">
    <SitePageIntro
      eyebrow="Work"
      title="Selected work."
      intro="Products and systems I have built, scaled, or directed over the years."
    />

    <section>
      <SiteWorkGrid :projects="projects" />
    </section>
  </div>
</template>
