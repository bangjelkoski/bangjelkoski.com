<template>
  <component
    :is="shouldAffixBeEnabled ? 'affix' : 'div'"
    ref="sidebar-inner"
    relative-element-selector="main"
    class="transition-width"
    :enabled="shouldAffixBeEnabled"
    @affix="setFiltersWidthToChild"
  >
    <aside class="md:pr-4 md:border-r border-gray-700">
      <div class="aside-inner">
        <nav>
          <ul class="list-nav marginless mb-0">
            <nuxt-link :to="{ name: 'index' }" tag="li" exact>
              <button type="button" aria-label="Home">Home</button>
            </nuxt-link>
            <nuxt-link :to="{ name: 'about' }" tag="li">
              <button type="button" aria-label="About">About</button>
            </nuxt-link>
            <nuxt-link :to="{ name: 'skills' }" tag="li">
              <button type="button" aria-label="Skills">Skills</button>
            </nuxt-link>
            <nuxt-link :to="{ name: 'technologies' }" tag="li">
              <button type="button" aria-label="Technologies">
                Technologies
              </button>
            </nuxt-link>
            <nuxt-link :to="{ name: 'blog' }" tag="li">
              <button type="button" aria-label="Blog">Blog</button>
            </nuxt-link>
            <!-- <nuxt-link :to="{name: 'contact'}"
                        tag="li">
                        <button type="button">Contact</button>
                    </nuxt-link> -->
          </ul>
        </nav>
      </div>
    </aside>
  </component>
</template>

<script>
import WindowSizeMixin from '~/mixins/windowSize'

export default {
  mixins: [WindowSizeMixin],

  computed: {
    shouldAffixBeEnabled() {
      return this.window.width >= 768
    }
  },

  methods: {
    setFiltersWidthToChild() {
      if (this.$refs.sidebar) {
        const width = this.$refs.sidebar.offsetWidth
        this.$refs['sidebar-inner'].$el.style.width = `calc(${width}px - 2rem)`
      }
    }
  }
}
</script>
