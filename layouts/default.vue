<template>
  <div class="container">
    <div class="min-h-screen flex flex-col overflow-x-hidden">
      <app-header />
      <main class="flex-1 py-4">
        <div class="flex md:-mx-8 flex-wrap items-start">
          <div
            class="w-full mb-4 items-center flex md:w-1/4 md:justify-end md:mb-0 md:px-8"
          >
            <client-only>
              <app-sidebar></app-sidebar>
            </client-only>
          </div>
          <div class="w-full md:w-3/4 md:px-8 content">
            <nuxt />
          </div>
        </div>
      </main>
      <app-footer />
    </div>
  </div>
</template>

<script>
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import Sidebar from '~/components/layout/sidebar'

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-sidebar': Sidebar
  }
}
</script>
