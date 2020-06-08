<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.resume</template>
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
      return `"<a href="/ba_resume_2020.pdf" target="_blank" rel="noopener noreferrer">resume.pdf</a>"`
    }
  }
}
</script>
