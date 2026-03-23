<script setup lang="ts">
const { isDark, init, toggle } = useTheme();
const { t } = useI18n();

onMounted(() => {
  init();
});
</script>

<template>
  <div
    class="min-h-screen bg-transparent text-theme-primary relative font-sans"
  >
    <SiteScrollProgress />

    <nav class="absolute top-0 left-0 right-0 z-50">
      <div
        class="w-full mx-auto px-6 sm:py-4 py-8 bg-[var(--color-header)] backdrop-blur-md border-b border-transparent dark:border-white/[0.06]"
      >
        <div class="flex items-center justify-between max-w-3xl mx-auto px-6">
          <NuxtLink
            to="/"
            class="text-theme-primary hover:text-theme-secondary transition-colors"
            aria-label="Home"
          >
            <SiteLogo />
          </NuxtLink>
          <div class="flex items-center gap-5">
            <NuxtLink
              to="/about"
              class="text-sm text-theme-secondary hover:text-theme-primary transition-colors"
            >
              {{ t("nav.about") }}
            </NuxtLink>
            <NuxtLink
              to="/writing"
              class="text-sm text-theme-secondary hover:text-theme-primary transition-colors"
            >
              {{ t("nav.blog") }}
            </NuxtLink>
            <button
              @click="toggle"
              class="text-theme-secondary hover:text-theme-primary transition-colors mr-4"
              :aria-label="t('nav.toggleTheme')"
            >
              <svg
                v-if="isDark"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div
      class="flex flex-col min-h-screen mx-auto max-w-3xl w-full px-6 bg-[var(--color-bg)]"
    >
      <main class="relative flex-1 pt-28 sm:pt-20">
        <slot />
      </main>
      <SiteFooter />
    </div>
  </div>
</template>
