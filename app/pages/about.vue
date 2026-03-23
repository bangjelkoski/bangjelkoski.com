<script setup lang="ts">
const { t, tm, rt } = useI18n()
usePageSeo(() => t("pages.about.seo"))
const about = computed(() => (tm("about") as string[]).map((paragraph) => rt(paragraph)))
</script>

<template>
  <div class="flex flex-col gap-8">
    <SitePageIntro
      :eyebrow="t('pages.about.eyebrow')"
      :title="t('pages.about.title')"
      :intro="t('pages.about.intro')"
    />

    <section class="max-w-2xl space-y-6">
      <p v-for="paragraph in about" :key="paragraph" class="text-base leading-relaxed text-theme-primary">
        {{ paragraph }}
      </p>
    </section>
  </div>
</template>
