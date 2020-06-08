<template>
  <section>
    <h3 class="text-2xl mb-4">Some of the technologies I use! 💻</h3>
    <p>
      <strong class="text-orange-500">HTML5</strong> - Typing this markup
      language and making web apps out of it for more than 7 years now. I
      started writing HTML on Microsoft's Web Expression 3.0, which is when I
      fell in love with web development. Trying to
      <strong>constantly follow semantic markup</strong> for every web app I
      build.
    </p>
    <p>
      <strong class="text-orange-500">CSS3</strong> - Working for more than 7
      years on a <strong>technology will surelly give you profiency</strong>.
      With CSS and other CSS preprocessors like <strong>Sass/Less</strong>,
      utilities/frameworks like <strong>TailwindCss</strong>, Material,
      Bootstrap, Bulma, and using latest design practices I build
      <strong
        >UI's that are focused mainly on UX and customer satisfaction</strong
      >.
    </p>
    <p>
      <strong class="text-orange-500">PHP</strong> - PHP is my day-to-day
      language for
      <strong>building web applications and API's</strong> alongside JavaScript
      for the past 5 years. I started building websites using native PHP, and
      then I found out Laravel. After being introduced to a framework like that
      I never looked back ever since and I use
      <strong>Laravel every single day</strong>. I built
      <a href="http://booksicms.com" target="_blank" rel="noopener noreferrer"
        >Booksi</a
      >
      using Laravel and Vue.js 2 years ago.
    </p>
    <p>
      <strong class="text-orange-500">JavaScript</strong> - JavaScript is
      probably the biggest name in application development right now. Proficient
      in vanilla JavaScript with the latest ES6+ standards,
      <strong>JavaScript is my preferred choice</strong> to build client-side
      (also server-side nowadays) applications.
      <strong>Vue.js is my framework of choice</strong>, and I have been using
      it to <strong>build and scale projects for 3 years now</strong>. While
      working on my side projects, I try to deepen my knowledge about
      <strong>Node.js and React</strong> by using them constantly and daily. And
      yes, I also know jQuery.
    </p>
    <p>
      <strong class="text-orange-500">Databases</strong> - Even though
      <strong>JAM stack</strong> is getting a lot of traction at the moment, we
      all know that the biggest percentage of web applications use databases.
      <strong>My preferred choice is MySQL</strong> because I started exploring
      it and SQL queries when I started learning PHP. When I am building
      <strong>Node.js applications I mainly use MongoDB</strong>. If I had to
      pick an ORM implementation, it would be the Laravel's
      <strong>Eloquent ARM.</strong>
    </p>
    <p>
      <strong class="text-orange-500">Git</strong> - Version control is really
      important for any development process.
      <strong>Git is present in my daily workflow</strong> both for personal and
      work-related projects. Writing git commands is my way to go, but sometimes
      I use SourceTree.
      <strong>Code Reviews, rebases, merges, pull requests</strong> are some of
      the stuff that I encounter daily.
    </p>
    <p>
      <strong class="text-orange-500">Design</strong> - We all know developers
      are usually afraid of design. That is not the case with me. I
      <strong>fully embrace the design</strong> as one of the necessities in
      application development.
      <strong>Understanding UI/UX principles and apply them</strong> to the
      projects I work on is a challenge I fully embrace. I can say I have basic
      knowledge of Photoshop and Illustrator.
    </p>
  </section>
</template>

<script>
import { DefaultTags, generateMetaTitle } from '~/utils/meta'

const title = "Technologies - Bojan Angjelkoski's Portfolio Website"

export default {
  head() {
    return {
      title,
      bodyAttrs: {
        class: 'skills'
      },
      meta: [
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.NUXT_ENV_APP_URL}${this.$route.fullPath}`
        },
        ...DefaultTags,
        ...generateMetaTitle(title)
      ]
    }
  }
}
</script>
