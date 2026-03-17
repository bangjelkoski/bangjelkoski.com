<script setup lang="ts">
import { formatPostDate } from '~/utils/formatter'

usePageSeo("Blog - Bojan Angjelkoski's Portfolio Website")

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const formattedPosts = computed(() => {
  if (!posts.value) return []
  return posts.value.map((post) => ({
    ...post,
    readingTime: post.readingTime || '',
    date: formatPostDate(post.date),
  }))
})
</script>

<template>
  <section>
    <ElementsPost
      v-for="(post, index) in formattedPosts"
      :key="`post-${index}`"
      :post="post"
    />
  </section>
</template>
