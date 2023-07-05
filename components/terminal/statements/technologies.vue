<template>
  <statement class="mb-6">
    <template slot="command"
      >$ Bojan.<nuxt-link :to="{ name: 'technologies' }"
        >technologies
      </nuxt-link>
    </template>
    <!-- eslint-disable vue/no-v-html -->
    <template slot="content"><span v-html="contentHtml"></span></template>
  </statement>
</template>

<script>
import statement from './../statement'

export default {
  components: {
    statement
  },

  computed: {
    contentHtml() {
      return `[<br/>
          &nbsp;&nbsp;"TypeScript, React, Vue, Angular ...", <br/>
          &nbsp;&nbsp;"Blockchain, CosmosSDK, Crypto, Web3 ... ", <br/>
          &nbsp;&nbsp;"Software Architecture, OOP, Design Patterns, TDD, ... ",<br/>
          &nbsp;&nbsp;"DeFi, EVM, SVM, IBC, CosmWasm, "<br/>
          &nbsp;&nbsp;"..."<br/>
      ]`
    }
  }
}
</script>
