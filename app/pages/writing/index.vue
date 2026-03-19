<script setup lang="ts">
import { formatPostDate } from '~/utils/formatter'

usePageSeo('Writing — Bojan Angjelkoski')

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
  <div class="flex flex-col gap-12">
    <SitePageIntro
      eyebrow="Writing"
      title="Writing."
      intro="Thoughts on software engineering, team building, and systems design."
    />

    <section>
      <SiteWritingList :posts="formattedPosts" />
    </section>
  </div>
</template>
