<script setup lang="ts">
import { formatPostDate } from '~/utils/formatter'

const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog').path(`/blog/${route.params.slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

usePostSeo({
  title: post.value.title,
  excerpt: post.value.excerpt,
  image: post.value.image,
  keywords: post.value.keywords,
})

const postTags = computed(() => post.value?.tags?.split(',') || [])
const readingTime = computed(() => post.value?.readingTime || '')
const date = computed(() => formatPostDate(post.value?.date || ''))
</script>

<template>
  <article v-if="post">
    <h3 class="font-black text-3xl text-white">{{ post.title }}</h3>
    <p class="text-gray-600 text-sm mb-2">
      {{ date }} <span class="text-orange-500">&bull;</span> {{ readingTime }}
      <span class="text-orange-500">&bull;</span> in {{ post.category }}
    </p>
    <p>
      <ElementsTag v-for="(tag, index) in postTags" :key="`tag-${index}`" :tag="tag" />
    </p>
    <div class="mt-8 article-content">
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>
