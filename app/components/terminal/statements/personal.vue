<template>
  <TerminalStatement class="mb-6">
    <template #command>$ Bojan.<NuxtLink :to="{ name: 'about' }">personal</NuxtLink></template>
    <template #content>{{ `"Age ${new Date().getFullYear() - 1994}. Skopje, Macedonia"` }}</template>
  </TerminalStatement>
</template>
