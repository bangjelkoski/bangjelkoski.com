<template>
  <section>
    <h3 class="text-2xl mb-4">Let me introduce myself! 👋</h3>
    <p>
      A <strong>Full Stack Developer</strong>, currently living in Belgrade,
      Serbia but originally from a small and beautiful country named Macedonia.
      Even though I passed a quarter of a century (aged
      {{ new Date().getFullYear() - 1994 }}), I feel more
      <strong>alive and energized</strong> than ever. Devoted to my mission to
      <strong>inspire and motivate people to do better</strong>, I always try to
      be kind, humble and give back to the people around me. Having people
      around me that care about both my successes and failures, accomplishing
      the tasks that I set for myself, achieving long term goals, putting
      efforts into preserving our environment are some of the
      <strong>things that make me happy.</strong>
    </p>
    <p>
      At the
      <a href="https://etf.bg.ac.rs" target="_blank" rel="noopener noreferrer"
        >University of Belgrade</a
      >, I have completed my
      <strong
        >bachelor studies in Electrical Engineering and Computer science</strong
      >
      in March 2018. At the moment, I am attending my
      <strong>master studies for Software Engineering</strong> at the same
      university. Keeping my skills sharp and up to date is my everyday goal. I
      usually do that by taking courses, reading books or building stuff.
    </p>
    <p>
      As a Full Stack developer with over
      <nuxt-link :to="{ name: 'skills' }"
        >6 years of diverse development experience</nuxt-link
      >, I build products focused on customer satisfaction. I manage
      <strong>all aspects of the web development cycle</strong>, from concept to
      requirements definition, design, development, launch, maintenance and user
      support. I enjoy the client-facing role and working closely with team
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
