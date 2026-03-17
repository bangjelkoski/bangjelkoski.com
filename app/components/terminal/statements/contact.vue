<script setup lang="ts">
const firstHtml = computed(() => {
  return `["<a href="https://www.linkedin.com/in/bangjelkoski/" target="_blank" rel="noopener noreferrer">Linkedin</a>", "<a href="https://github.com/bangjelkoski" target="_blank" rel="noopener noreferrer">Github</a>", "<a href="https://twitter.com/bangjelkoski" target="_blank" rel="noopener noreferrer">Twitter</a>", `
})
</script>

<template>
  <TerminalStatement class="mb-6">
    <template #command>$ Bojan.contact</template>
    <template #content>
      <!-- eslint-disable vue/no-v-html -->
      <span v-html="firstHtml"></span> "<ElementsMail />"]
    </template>
  </TerminalStatement>
</template>
