<template>
  <article>
    <h3 class="font-black text-3xl text-white">{{ attributes.title }}</h3>
    <p class="text-gray-600 text-sm mb-2">
      {{ date }} <span class="text-orange-500">&bull;</span> {{ readingTime }}
      <span class="text-orange-500">&bull;</span> in {{ attributes.category }}
    </p>
    <p>
      <tag v-for="(tag, index) in postTags" :key="`tag-${index}`" :tag="tag" />
    </p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="mt-8 article-content" v-html="content"></div>
  </article>
</template>

<script>
import { DefaultPostMetaTags, generateMetaTitle } from '~/utils/meta'
import { formatReadingTime, formatPostDate } from '~/utils/formatter'
import Tag from '~/components/elements/tag'

const fm = require('front-matter')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})
  .use(require('markdown-it-highlightjs'))
  .use(require('markdown-it-attrs'))

export default {
  components: {
    Tag
  },
  async asyncData({ params, app: { $md } }) {
    const result = await import(`~/posts/${params.post}.md`)
    const post = fm(result.default)

    return {
      attributes: post.attributes,
      content: md.render(post.body),
      readingTime: formatReadingTime(post.body),
      date: formatPostDate(post.attributes.date)
    }
  },

  computed: {
    postTags() {
      return this.attributes.tags.split(',')
    }
  },

  head() {
    return {
      title: this.attributes.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.attributes.keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: this.attributes.excerpt
        },
        { hid: 'og-type', property: 'og:type', content: 'article' },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.NUXT_ENV_APP_URL}${this.$route.fullPath}`
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: `${process.env.NUXT_ENV_APP_URL}${this.attributes.image}`
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: this.attributes.excerpt
        },
        {
          hid: 'twitter-description',
          property: 'twitter:description',
          content: this.attributes.excerpt
        },
        {
          hid: 'twitter-image',
          property: 'twitter:image',
          content: `${process.env.NUXT_ENV_APP_URL}${this.attributes.image}`
        },

        ...DefaultPostMetaTags,
        ...generateMetaTitle(this.attributes.title)
      ]
    }
  }
}
</script>
