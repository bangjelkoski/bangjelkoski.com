<script setup lang="ts">
const contentHtml = computed(() => {
  return `[<br/>
    &nbsp;&nbsp;"TypeScript, React, Vue, Angular ...", <br/>
    &nbsp;&nbsp;"Blockchain, CosmosSDK, Crypto, Web3 ... ", <br/>
    &nbsp;&nbsp;"Software Architecture, OOP, Design Patterns, TDD, ... ",<br/>
    &nbsp;&nbsp;"DeFi, EVM, SVM, IBC, CosmWasm, "<br/>
    &nbsp;&nbsp;"..."<br/>
  ]`
})
</script>

<template>
  <TerminalStatement class="mb-6">
    <template #command>$ Bojan.<NuxtLink :to="{ name: 'technologies' }">technologies</NuxtLink></template>
    <!-- eslint-disable vue/no-v-html -->
    <template #content><span v-html="contentHtml"></span></template>
  </TerminalStatement>
</template>
