<script setup lang="ts">
usePageSeo('Contact — Bojan Angjelkoski')
const { contactLinks } = useSiteContent()
</script>

<template>
  <div class="flex flex-col gap-8">
    <SitePageIntro
      eyebrow="Contact"
      title="Get in touch."
      intro="Open to conversations about engineering leadership, infrastructure, product execution, and interesting problems."
    />

    <section class="max-w-xl">
      <SiteContactPanel :links="contactLinks" />
    </section>
  </div>
</template>
