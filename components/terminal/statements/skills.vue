<template>
  <statement class="mb-6">
    <template slot="command"
      >$ Bojan.<nuxt-link :to="{ name: 'skills' }">skills</nuxt-link></template
    >
    <template slot="content">{{
      `["Software Engineering", "Project Management", "Strong Communications Skills", "Team Player", "Quality Assurance", "Eye for Detail", "Independent and responsible", "Remote work", ... ]`
    }}</template>
  </statement>
</template>

<script>
import statement from './../statement'

export default {
  components: {
    statement
  }
}
</script>
