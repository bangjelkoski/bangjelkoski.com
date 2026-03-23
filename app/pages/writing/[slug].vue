<script setup lang="ts">
import { formatPostDate } from '~/utils/formatter'

const route = useRoute()
const { data: post } = await useAsyncData(`writing-${route.params.slug}`, () =>
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

const { t } = useI18n()
const postTags = computed(() => post.value?.tags?.split(',').map((tag: string) => tag.trim()) || [])
const readingTime = computed(() => post.value?.readingTime || '')
const date = computed(() => formatPostDate(post.value?.date || ''))
</script>

<template>
  <article v-if="post" class="flex flex-col">
    <header class="mb-8">
      <NuxtLink to="/writing" class="text-sm text-theme-secondary hover:text-theme-primary hover:underline underline-offset-4 transition-all mb-8 inline-block">
        {{ t("pages.writing.backLink") }}
      </NuxtLink>
      <h1 class="text-[2rem] sm:text-[2.5rem] leading-[1.15] font-medium text-theme-primary tracking-tight">
        {{ post.title }}
      </h1>
      <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-theme-secondary">
        <span class="font-mono text-xs uppercase tracking-widest">{{ date }}</span>
        <span v-if="readingTime" class="text-theme-tertiary">&middot;</span>
        <span v-if="readingTime" class="font-mono text-xs uppercase tracking-widest">{{ readingTime }}</span>
      </div>
    </header>

    <div class="prose-content">
      <ContentRenderer :value="post" />
    </div>
  </article>
</template>

<style>
.prose-content h2 {
  @apply mt-12 mb-4 font-medium text-2xl tracking-tight;
  color: var(--color-text-primary);
}

.prose-content h3 {
  @apply mt-8 mb-3 font-medium text-xl tracking-tight;
  color: var(--color-text-primary);
}

.prose-content h4 {
  @apply mt-6 mb-2 font-medium text-lg tracking-tight;
  color: var(--color-text-primary);
}

.prose-content p,
.prose-content li {
  @apply text-base leading-relaxed mb-6;
  color: var(--color-text-primary);
}

.prose-content p:last-child {
  @apply mb-0;
}

.prose-content ul,
.prose-content ol {
  @apply mb-6 pl-6;
  color: var(--color-text-primary);
}

.prose-content ul {
  @apply list-disc;
}

.prose-content ol {
  @apply list-decimal;
}

.prose-content a {
  @apply underline underline-offset-4 transition-all;
  color: var(--color-text-primary);
  text-decoration-color: var(--color-border);
}

.prose-content a:hover {
  text-decoration-color: var(--color-text-primary);
}

.prose-content img {
  @apply my-8 rounded-sm;
  border: 1px solid var(--color-border);
}

.prose-content blockquote {
  @apply my-8 pl-6 italic;
  border-left: 2px solid var(--color-border);
  color: var(--color-text-secondary);
}

.prose-content hr {
  @apply my-10;
  border-top: 1px solid var(--color-border);
}

.prose-content pre {
  @apply mb-8 overflow-x-auto rounded p-5 text-sm;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.prose-content pre code {
  @apply bg-transparent p-0;
}

.prose-content code {
  @apply font-mono text-[0.8125rem] rounded px-1.5 py-0.5;
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}
</style>
