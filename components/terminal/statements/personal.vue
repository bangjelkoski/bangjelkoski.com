<template>
  <statement class="mb-6">
    <template slot="command"
      >$ Bojan.<nuxt-link :to="{ name: 'about' }">personal</nuxt-link></template
    >
    <template slot="content">{{
      `"Age ${new Date().getFullYear() - 1994}. Belgrade, Serbia"`
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
