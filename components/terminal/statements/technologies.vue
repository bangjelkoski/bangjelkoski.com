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
          &nbsp;&nbsp;"Web Technologies (HTML, CSS, ...)", <br/>
          &nbsp;&nbsp;"JavaScript (Node, ES6+, TypeScript, Vue, Nuxt, React, ...)", <br/>
          &nbsp;&nbsp;"Blockchain (Web3, Solidity, CosmosSDK, ...)", <br/>
          &nbsp;&nbsp;"Software Development (OOP, Design Patterns, Git, ...) ",<br/>
      ]`
    }
  }
}
</script>
