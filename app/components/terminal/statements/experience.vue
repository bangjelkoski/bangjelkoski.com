<script setup lang="ts">
const contentHtml = computed(() => {
  return `[<br/>
    &nbsp;&nbsp;"Engineering Director at InjectiveLabs 4y+", <br/>
    &nbsp;&nbsp;"Full Stack Developer at World Trade Organization +1y", <br/>
    &nbsp;&nbsp;"Full Stack Developer at Nulisec 2y", <br/>
    &nbsp;&nbsp;"Full Stack Developer at NG Solutions 2y",<br/>
  ]`
})
</script>

<template>
  <TerminalStatement class="mb-6">
    <template #command>$ Bojan.experience</template>
    <!-- eslint-disable vue/no-v-html -->
    <template #content><span v-html="contentHtml"></span></template>
  </TerminalStatement>
</template>
