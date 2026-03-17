<script setup lang="ts">
const props = defineProps<{
  post: {
    title: string
    slug: string
    date: string
    readingTime: string
    category: string
    tags: string
    excerpt: string
    _path?: string
  }
}>()

const postTags = computed(() => props.post.tags.split(','))
const postPath = computed(() => props.post._path || `/blog/${props.post.slug}`)
</script>

<template>
  <article
    class="mb-6 sm:mb-8 md:mb-10 cursor-pointer scroll-reveal-item"
  >
    <h3 class="font-black text-2xl mb-2">
      <NuxtLink :to="postPath">
        {{ post.title }}
      </NuxtLink>
    </h3>
    <p class="text-gray-600 text-sm mb-2">
      {{ post.date }} <span class="text-orange-500">&bull;</span>
      {{ post.readingTime }} <span class="text-orange-500">&bull;</span> in
      {{ post.category }}
    </p>
    <p class="mb-4">
      <ElementsTag v-for="(tag, index) in postTags" :key="`tag-${index}`" :tag="tag" />
    </p>
    <p>{{ post.excerpt }}</p>
  </article>
</template>
