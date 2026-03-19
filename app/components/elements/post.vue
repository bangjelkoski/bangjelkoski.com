<script setup lang="ts">
const props = defineProps<{
  post: {
    title: string;
    slug: string;
    date: string;
    readingTime: string;
    category: string;
    tags: string;
    excerpt: string;
    _path?: string;
  };
}>();

const postPath = computed(() => props.post._path || `/blog/${props.post.slug}`);
</script>

<template>
  <article class="mb-8">
    <NuxtLink :to="postPath" class="group block">
      <div
        class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-0 mb-1"
      >
        <h3
          class="text-lg font-display font-medium text-concept-cream group-hover:text-concept-coral transition-colors duration-150 sm:flex-1"
        >
          {{ post.title }}
        </h3>
        <span
          class="font-mono text-xs text-concept-muted/60 sm:ml-4 shrink-0"
          >{{ post.date }}</span
        >
      </div>
      <p class="text-sm text-concept-muted leading-relaxed">
        {{ post.excerpt }}
      </p>
    </NuxtLink>
  </article>
</template>
