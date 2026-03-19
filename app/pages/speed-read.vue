<script setup lang="ts">
usePageSeo('Speed Read — Bojan Angjelkoski')

const { active, toggle } = useSpeedRead()
const { about } = useSiteContent()

const sampleText = [
  'Engineering leadership is about creating the conditions where teams can do their best work consistently. It requires balancing technical depth with strategic clarity.',
  'Good systems are legible. They communicate their intent through structure, naming, and constraints rather than documentation alone.',
  'The hardest part of building products is knowing when to stop adding and start shipping. Every feature is a commitment to maintain.',
  ...about,
]

const processedParagraphs = computed(() => {
  if (!active.value) return null
  return sampleText.map(paragraph => {
    return paragraph.split(/(\s+)/).map(word => {
      if (/^\s+$/.test(word) || word === '') return { bold: '', rest: word }
      const boldLen = Math.ceil(word.length / 2)
      return { bold: word.slice(0, boldLen), rest: word.slice(boldLen) }
    })
  })
})
</script>

<template>
  <div class="flex flex-col">
    <section class="mb-8" style="opacity: 0; animation: fadeUp 0.6s ease forwards;">
      <h1 class="text-[1.5rem] sm:text-[2rem] leading-[1.1] font-medium text-theme-primary tracking-tight mb-3">
        <SiteScrambleText text="Speed Read" />
      </h1>
      <p class="text-sm text-theme-secondary leading-relaxed max-w-lg mb-6">
        Toggle bionic reading mode. The first half of each word is bolded to guide your eyes faster through the text.
      </p>

      <button
        class="text-xs font-mono px-3 py-1.5 border rounded-full transition-colors"
        :class="active
          ? 'bg-theme-primary text-[var(--color-bg)] border-theme-primary'
          : 'text-theme-secondary border-theme-border hover:text-theme-primary hover:border-theme-tertiary'"
        @click="toggle"
      >
        {{ active ? 'On' : 'Off' }}
      </button>
    </section>

    <div class="h-px bg-theme-border mb-8" />

    <section style="opacity: 0; animation: fadeUp 0.6s ease forwards; animation-delay: 0.1s;">
      <div class="space-y-4">
        <template v-if="active && processedParagraphs">
          <p
            v-for="(words, i) in processedParagraphs"
            :key="i"
            class="text-sm leading-relaxed text-theme-primary"
          >
            <template v-for="(w, j) in words" :key="j">
              <template v-if="w.bold"><strong>{{ w.bold }}</strong>{{ w.rest }}</template>
              <template v-else>{{ w.rest }}</template>
            </template>
          </p>
        </template>
        <template v-else>
          <p
            v-for="(paragraph, i) in sampleText"
            :key="i"
            class="text-sm leading-relaxed text-theme-primary"
          >
            {{ paragraph }}
          </p>
        </template>
      </div>
    </section>
  </div>
</template>

<style>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
