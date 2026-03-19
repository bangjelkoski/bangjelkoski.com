<script setup lang="ts">
interface WritingPost {
  title: string;
  path: string;
  date?: string;
}

defineProps<{
  posts: WritingPost[];
}>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <NuxtLink
      v-for="post in posts"
      :key="post.path"
      :to="post.path"
      class="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 py-2"
    >
      <h3
        class="text-base text-theme-primary group-hover:underline underline-offset-4 decoration-theme-border group-hover:decoration-theme-primary transition-all"
      >
        {{ post.title }}
      </h3>
      <span class="text-sm text-theme-secondary shrink-0 font-mono">
        {{ post.date }}
      </span>
    </NuxtLink>
  </div>
</template>
