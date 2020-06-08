<template>
  <statement>
    <template slot="command"
      >$ <span class="coursor-blinking">|</span></template
    >
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
