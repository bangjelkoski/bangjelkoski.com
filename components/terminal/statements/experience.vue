<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.experience</template>
    <template slot="content">{{
      `["Full Stack Developer at World Trade Organization 1y", "Frontend Lead Engineer at Injective Protocol 1y", "Full Stack Developer at Nulisec 2y+", "Full Stack Developer at NG Solutions 2y", "Web Developer at Dev&Webdesign 2y"]`
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
