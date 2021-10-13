<template>
  <section>
    <h3 class="text-2xl mb-4">Let me introduce myself! 👋</h3>
    <p>
      I'm a <strong>Senior Software Engineer</strong> currently living in
      Skopje, Macedonia, aged {{ new Date().getFullYear() - 1994 }}. Devoted to
      my mission to <strong>inspire and motivate people to do better</strong>, I
      always try to be kind, humble, and give back to the people around me.
      Having people around me who care about my successes and failures,
      accomplishing the tasks that I set for myself, achieving long-term goals,
      and putting efforts into preserving our environment are
      <strong>things that make me happy.</strong>
    </p>
    <p>
      I have completed my
      <strong>master's studies in Software Engineering</strong> at the
      <a href="https://etf.bg.ac.rs" target="_blank" rel="noopener noreferrer">
        University of Belgrade
      </a>
      in September 2021. Keeping my skills sharp and up to date is my everyday
      goal. I usually do that by taking courses, reading books, or building
      stuff.
    </p>
    <p>
      As a Senior Software Engineer with over
      <nuxt-link :to="{ name: 'skills' }"
        >eight years of diverse development experience</nuxt-link
      >, I build products focused on customer satisfaction. I manage
      <strong>all aspects of the web development cycle</strong>, from concept to
      requirements definition, design, development, launch, maintenance, and
      user support. I enjoy the client-facing role and working closely with team
      members to produce <strong>high-quality deliverables.</strong>
    </p>
    <p>
      Also, proud owner of
      <a href="http://booksicms.com" target="_blank" rel="noopener noreferrer"
        >Booksi</a
      >
      - one of the most popular Property and Home rentals CMS in the world (with
      5.00 rating from more than 250 customers).
    </p>
    <p>
      Want to learn more? You can
      <nuxt-link :to="{ name: 'contact' }">contact me</nuxt-link> and I will be
      delighted to reply 😄
    </p>
  </section>
</template>

<script>
import { DefaultTags, generateMetaTitle } from '~/utils/meta'

const title = "About me - Bojan Angjelkoski's Portfolio Website"

export default {
  head() {
    return {
      title,
      bodyAttrs: {
        class: 'about'
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
