<script setup lang="ts">
import type { SiteProject } from "~/composables/useSiteContent";

defineProps<{
  projects: SiteProject[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <article
      v-for="project in projects"
      :key="project.name"
      class="flex flex-col border border-theme-border rounded p-5 hover:border-theme-tertiary transition-colors"
    >
      <h3 class="text-base font-medium text-theme-primary mb-2">
        {{ project.name }}
      </h3>
      <p class="text-sm text-theme-secondary leading-relaxed mb-4 flex-1">
        {{ project.summary }}
      </p>
      <a
        v-if="project.href"
        :href="project.href"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-theme-primary hover:underline underline-offset-4 decoration-theme-border hover:decoration-theme-primary transition-all inline-flex items-center gap-1 mt-auto self-start"
      >
        View project <span aria-hidden="true" class="text-xs">↗</span>
      </a>
    </article>
  </div>
</template>
