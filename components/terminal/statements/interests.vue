<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.interests</template>
    <template slot="content">{{
      `["DeFi", "Cutting-edge Technologies", "Innovation and Disruption", "Reading", "Exploring the world"]`
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
