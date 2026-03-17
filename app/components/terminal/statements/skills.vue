<script setup lang="ts">
const contentHtml = computed(() => {
  return `[<br/>
    &nbsp;&nbsp;"Leadership, Team Management and Mentoring", <br/>
    &nbsp;&nbsp;"Software Engineering, Architecture and Design", <br/>
    &nbsp;&nbsp;"Problem Solving, Critical Thinking and Decision Making", <br/>
    &nbsp;&nbsp;"Continuous Learning and Adaptability", <br/>
    &nbsp;&nbsp;"Communication, Emotional Intelligence and Collaboration" <br/>
    &nbsp;&nbsp;"..."<br/>
  ]`
})
</script>

<template>
  <TerminalStatement class="mb-6">
    <template #command>$ Bojan.<NuxtLink :to="{ name: 'skills' }">skills</NuxtLink></template>
    <!-- eslint-disable vue/no-v-html -->
    <template #content><span v-html="contentHtml"></span></template>
  </TerminalStatement>
</template>
