<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.education</template>
    <template slot="content">{{
      `"B.Sc. in Electrical Engineering and Computer Science - University of Belgrade, Serbia"`
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
