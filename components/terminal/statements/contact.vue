<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.contact</template>
    <template slot="content">
      <!-- eslint-disable vue/no-v-html -->
      <span v-html="firstHtml"></span> "<mail></mail>"]
    </template>
  </statement>
</template>

<script>
import statement from './../statement'
import mail from '~/components/elements/mail'

export default {
  components: {
    statement,
    mail
  },

  computed: {
    firstHtml() {
      return `["<a href="https://www.linkedin.com/in/bangjelkoski/" target="_blank" rel="noopener noreferrer">Linkedin</a>", "<a href="https://github.com/bangjelkoski" target="_blank" rel="noopener noreferrer">Github</a>", "<a href="https://twitter.com/bangjelkoski" target="_blank" rel="noopener noreferrer">Twitter</a>", `
    }
  }
}
</script>
