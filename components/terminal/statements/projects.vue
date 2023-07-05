<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.projects</template>
    <!-- eslint-disable-next-line vue/no-v-html -->
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
          &nbsp;&nbsp;"Booksi - Propery rental and management CMS"", <br/>
      ]`
    }
  }
}
</script>
