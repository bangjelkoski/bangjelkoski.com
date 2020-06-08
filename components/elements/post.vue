<template>
  <article
    v-scroll-reveal.reset
    class="mb-6 sm:mb-8 md:mb-10 cursor-pointer"
    @click="
      $router.push({
        name: `blog-post`,
        params: { post: post.slug, file: post.file }
      })
    "
  >
    <h3 class="font-black text-2xl mb-2">
      <nuxt-link
        :to="{
          name: `blog-post`,
          params: { post: post.slug, file: post.file }
        }"
      >
        {{ post.title }}
      </nuxt-link>
    </h3>
    <p class="text-gray-600 text-sm mb-2">
      {{ post.date }} <span class="text-orange-500">&bull;</span>
      {{ post.readingTime }} <span class="text-orange-500">&bull;</span> in
      {{ post.category }}
    </p>
    <p class="mb-4">
      <tag v-for="(tag, index) in postTags" :key="`tag-${index}`" :tag="tag" />
    </p>
    <p>{{ post.excerpt }}</p>
  </article>
</template>

<script>
import Tag from '~/components/elements/tag'

export default {
  components: {
    Tag
  },

  props: {
    post: {
      required: true,
      type: Object
    }
  },

  computed: {
    postTags() {
      return this.post.tags.split(',')
    }
  }
}
</script>
