<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer
    class="w-full py-8 mt-12 border-t border-theme-border flex flex-col items-center gap-4"
  >
    <SiteLiveClock />
    <div class="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
    <p class="text-sm text-theme-secondary">
      &copy; {{ new Date().getFullYear() }} {{ t("footer.copyrightName") }}
    </p>
    <div class="flex items-center gap-6">
      <a
        href="https://github.com/bangjelkoski"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-theme-secondary hover:text-theme-primary hover:underline transition-all"
      >
        {{ t("footer.github") }}
      </a>
      <a
        href="https://linkedin.com/in/bangjelkoski"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-theme-secondary hover:text-theme-primary hover:underline transition-all"
      >
        {{ t("footer.linkedin") }}
      </a>
      <a
        href="https://x.com/bangjelkoski"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-theme-secondary hover:text-theme-primary hover:underline transition-all"
      >
        {{ t("footer.twitter") }}
      </a>
    </div>
    </div>
  </footer>
</template>
