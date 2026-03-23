<script setup lang="ts">
import { formatPostDate } from '~/utils/formatter'

const { t } = useI18n()
usePageSeo(() => t("pages.writing.seo"))

const { data: posts } = await useAsyncData('writing', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const formattedPosts = computed(() => (posts.value || []).map((post) => ({
  title: post.title,
  path: `/writing/${post.slug}`,
  date: formatPostDate(post.date),
})))
</script>

<template>
  <div class="flex flex-col gap-8">
    <SitePageIntro
      :eyebrow="t('pages.writing.eyebrow')"
      :title="t('pages.writing.title')"
      :intro="t('pages.writing.intro')"
    />

    <section>
      <SiteWritingList :posts="formattedPosts" />
    </section>
  </div>
</template>
