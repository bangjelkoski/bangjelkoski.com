<template>
  <div>
    <Terminal />
  </div>
</template>

<script>
import Terminal from '~/components/terminal'
import { DefaultTags, generateMetaTitle } from '~/utils/meta'

const title = "Bojan Angjelkoski's Portfolio Website"

export default {
  components: {
    Terminal
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
