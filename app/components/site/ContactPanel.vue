<script setup lang="ts">
import type { SiteContactLink } from "~/types/site-content";

defineProps<{
  links: SiteContactLink[];
}>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex flex-col border border-theme-border rounded p-5 hover:border-theme-tertiary transition-colors"
    >
      <h3
        class="text-base font-medium text-theme-primary mb-1 group-hover:underline underline-offset-4 decoration-theme-border group-hover:decoration-theme-primary"
      >
        {{ link.label }}
      </h3>
      <p class="text-sm text-theme-secondary">
        {{ link.note }}
      </p>
    </a>
  </div>
</template>
