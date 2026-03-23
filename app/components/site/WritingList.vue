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
  <div class="flex flex-col">
    <NuxtLink
      v-for="(post, i) in posts"
      :key="post.path"
      :to="post.path"
      class="group flex items-baseline justify-between gap-4 py-2.5"
      :class="{ 'border-t border-theme-border': i > 0 }"
    >
      <h3
        class="text-base text-theme-primary group-hover:underline underline-offset-4 decoration-theme-border group-hover:decoration-theme-primary transition-all flex-1 min-w-0 line-clamp-2"
      >
        {{ post.title }}
      </h3>
      <span class="text-sm text-theme-secondary shrink-0 font-mono w-[7rem] text-right tabular-nums">
        {{ post.date }}
      </span>
    </NuxtLink>
  </div>
</template>
