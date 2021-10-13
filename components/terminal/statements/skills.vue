<template>
  <statement class="mb-6">
    <template slot="command"
      >$ Bojan.<nuxt-link :to="{ name: 'skills' }">skills</nuxt-link></template
    >
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
          &nbsp;&nbsp;"Leadership (Taking initiative, Mentoring, Inspiring others, ...)", <br/>
          &nbsp;&nbsp;"Product Engineering (Requirements, Specs, Eliminating complexity, ...)", <br/>
          &nbsp;&nbsp;"Software Engineering (Code Quality, Analysis and research, Debugging, ...)", <br/>
          &nbsp;&nbsp;"Project Management (Time management, Team management, ...)", <br/>
          &nbsp;&nbsp;"Soft Skills (Efficient communication, Team player, Reponsible, Independent, Remote work, ...)", <br/>
      ]`
    }
  }
}
</script>
