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
          &nbsp;&nbsp;"Leadership, Team Management and Mentoring", <br/>
          &nbsp;&nbsp;"Software Engineering, Architecture and Design", <br/>
          &nbsp;&nbsp;"Problem Solving, Critical Thinking and Decision Making", <br/>
          &nbsp;&nbsp;"Continuous Learning and Adaptability", <br/>
          &nbsp;&nbsp;"Communication, Emotional Intelligence and Collaboration" <br/>
          &nbsp;&nbsp;"..."<br/>
      ]`
    }
  }
}
</script>
