<template>
  <statement class="mb-6">
    <template slot="command">$ Bojan.experience</template>
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
      return `[<br/>
          &nbsp;&nbsp;"Tech Lead at InjectiveLabs 4y+", <br/>
          &nbsp;&nbsp;"Full Stack Developer at World Trade Organization +1y", <br/>
          &nbsp;&nbsp;"Full Stack Developer at Nulisec 2y", <br/>
          &nbsp;&nbsp;"Full Stack Developer at NG Solutions 2y",<br/>
      ]`
    }
  }
}
</script>
