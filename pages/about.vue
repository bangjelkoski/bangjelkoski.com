<template>
  <section>
    <h3 class="text-2xl mb-4">Let me introduce myself! 👋</h3>
    <p>
      Hi, I'm Bojan and I'm {{ new Date().getFullYear() - 1994 }}. 
      Currently living in Skopje, Macedonia. 
      As an <strong>Engineering Director</strong> at <a href="https://injectivelabs.org" target="_blank" rel="noopener noreferrer">InjectiveLabs</a>, 
      I have the privilege of being part of a dynamic and innovative team that is 
      driving amazing technological advancements in DeFi.
    </p>
    <p>
      I have completed my
      <strong>master's studies in Software Engineering</strong> at the
      <a href="https://etf.bg.ac.rs" target="_blank" rel="noopener noreferrer">
        University of Belgrade
      </a>
      in September 2021. It was during my time there that I solidified the deep passion I always had for the 
      intricacies of software development and learned the importance of staying at the <strong>forefront of emerging technologies</strong>.
    </p>
    <p>
      With a solid foundation and <nuxt-link :to="{ name: 'skills' }">twelve years of experience as a developer</nuxt-link>, 
      I have had the opportunity to contribute to various projects, gaining invaluable knowledge along the way. 
      The ever-evolving nature of this field keeps me motivated to continuously learn, adapt, and embrace new challenges.
      I manage <strong>all aspects of the Software Development Cycle</strong>, from concept to
      requirements definition, design, development, launch, maintenance, and
      user support. I enjoy the client-facing role and working closely with team
      members to produce <strong>high-quality deliverables.</strong>
    </p>
    <p>
      While professional accomplishments are significant, I believe that true fulfillment lies in the way we interact with and <strong>impact the lives of others.</strong> 
      I strive to embody qualities such as <strong>humility, kindness, and giving back</strong> to the people who mean the most to me. 
      Nurturing meaningful relationships and contributing positively to the lives of those around me is a guiding principle in both my personal and professional endeavors.
      It is my sincerest hope that through my work, I can make a meaningful contribution to the world of technology while also<strong>inspiring others to pursue their passions</strong> and uplift those in their communities.
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
