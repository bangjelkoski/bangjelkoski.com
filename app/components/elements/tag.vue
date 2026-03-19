<script setup lang="ts">
defineProps<{
  tag: string;
}>();
</script>

<template>
  <span
    class="text-xs font-mono text-concept-muted border border-concept-border rounded px-2 py-0.5"
  >
    {{ tag.trim() }}
  </span>
</template>
