<template>
  <section>
    <post v-for="(post, index) in posts" :key="`post-${index}`" :post="post" />
  </section>
</template>

<script>
import post from '~/components/elements/post'
import { formatReadingTime, formatPostDate } from '~/utils/formatter'
import { DefaultTags, generateMetaTitle } from '~/utils/meta'
const fm = require('front-matter')

const title = "Blog - Bojan Angjelkoski's Portfolio Website"

export default {
  components: {
    post
  },

  async asyncData() {
    const resolve = await require.context('~/posts/', true, /\.md$/)
    const posts = resolve
      .keys()
      .map((key) => resolve(key))
      .map((post) => {
        const result = fm(post.default)
        return {
          ...result.attributes,
          readingTime: formatReadingTime(result.body),
          date: formatPostDate(result.attributes.date)
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return {
      posts
    }
  },

  head() {
    return {
      title,
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
