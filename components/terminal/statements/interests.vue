<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.interests</template>
    <template slot="content">{{
      `["Reading", "Traveling and Exploring", "Learning new technologies", "Preserving the environment and help fight climate change."]`
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
