<template>
  <statement class="mb-6">
    <template slot="command"
      >$ Bojan.<nuxt-link :to="{ name: 'technologies' }"
        >technologies</nuxt-link
      ></template
    >
    <template slot="content">{{
      `["HTML5", "CSS3 (Sass, Frameworks, Responsiveness)", "JavaScript (Node, ES6+, Express, Vue, Nuxt, React, jQuery)", "PHP (Laravel)", "databases (MySQL, SQLite, MongoDB)", "OOP and Design Patterns", "Git" ...]`
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
