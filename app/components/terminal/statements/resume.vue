<script setup lang="ts">
const contentHtml = computed(() => {
  return `"<a href="/resume_2023.pdf" target="_blank" rel="noopener noreferrer">resume.pdf</a>"`
})
</script>

<template>
  <TerminalStatement class="mb-6">
    <template #command>$ Bojan.resume</template>
    <!-- eslint-disable vue/no-v-html -->
    <template #content><span v-html="contentHtml"></span></template>
  </TerminalStatement>
</template>
