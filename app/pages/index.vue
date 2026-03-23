<script setup lang="ts">
import { formatPostDate } from "~/utils/formatter";

usePageSeo("Bojan Angjelkoski — Director of Engineering");

const experience = useExperience();
const { highlights, education, personal } = useSiteContent();

const { data: posts } = await useAsyncData("home-writing", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all(),
);

const featuredPosts = computed(() =>
  (posts.value || []).map((post) => ({
    title: post.title,
    path: `/writing/${post.slug}`,
    date: formatPostDate(post.date),
  })),
);


function scrollToContent() {
  document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  function onKeyDown(e: KeyboardEvent) {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    )
      return;
    if (e.key !== "j" && e.key !== "k") return;

    const scrollAmount = window.innerHeight * 0.75;
    const direction = e.key === "j" ? 1 : -1;
    window.scrollBy({ top: scrollAmount * direction, behavior: "smooth" });
  }

  window.addEventListener("keydown", onKeyDown);
  onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));
});
</script>

<template>
  <div class="flex flex-col -mt-28 sm:-mt-20">
    <div
      class="relative min-h-screen flex items-center justify-center"
      style="
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
        width: 100vw;
        opacity: 0;
        animation: fadeUp 0.6s ease forwards;
        animation-delay: 0s;
      "
    >
      <div class="absolute inset-0 z-0 pointer-events-none opacity-50">
        <SiteWebGLCanvas />
      </div>
      <div class="relative z-10 mx-auto max-w-3xl w-full px-6">
        <SiteHomeHero />
      </div>
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <p class="text-[0.625rem] text-theme-tertiary font-mono">
          <kbd
            class="px-1 py-0.5 border border-theme-border rounded text-[0.625rem]"
            >j</kbd
          >
          /
          <kbd
            class="px-1 py-0.5 border border-theme-border rounded text-[0.625rem]"
            >k</kbd
          >
          to scroll
        </p>
        <button
          class="animate-bounce cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
          @click="scrollToContent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-theme-secondary">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="h-px my-8 bg-gradient-to-r from-transparent via-theme-border to-transparent"
    />

    <section
      id="highlights"
      style="
        opacity: 0;
        animation: fadeUp 0.6s ease forwards;
        animation-delay: 0.1s;
      "
    >
      <h2
        class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-3 group relative"
      >
        <a
          href="#highlights"
          class="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-theme-tertiary"
          >#</a
        >
        <SiteScrambleText text="Highlights" />
      </h2>
      <div class="flex flex-col">
        <div
          v-for="(highlight, i) in highlights"
          :key="i"
          class="flex gap-6 py-2.5"
          :class="{ 'border-t border-theme-border': i > 0 }"
        >
          <span class="text-xs text-theme-secondary font-mono w-20 shrink-0 pt-0.5">{{ highlight.label }}</span>
          <div class="flex flex-col gap-1.5">
            <span
              v-for="(item, j) in highlight.items"
              :key="j"
              class="text-sm text-theme-primary leading-relaxed"
            >{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <div
      class="h-px my-8 bg-gradient-to-r from-transparent via-theme-border to-transparent"
    />

    <section
      id="work"
      style="
        opacity: 0;
        animation: fadeUp 0.6s ease forwards;
        animation-delay: 0.2s;
      "
    >
      <h2
        class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-3 group relative"
      >
        <a
          href="#work"
          class="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-theme-tertiary"
          >#</a
        >
        <SiteScrambleText text="Work" />
      </h2>
      <div class="flex flex-col">
        <div
          v-for="(entry, i) in experience"
          :key="i"
          class="flex items-center justify-between py-2.5"
          :class="{ 'border-t border-theme-border': i > 0 }"
        >
          <span class="text-sm text-theme-primary flex items-center gap-2">
            <span
              v-if="i === 0"
              class="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"
            />
            {{ entry.role }} at {{ entry.company }}
          </span>
          <span class="text-xs text-theme-secondary font-mono shrink-0 ml-4">{{
            entry.period
          }}</span>
        </div>
      </div>
    </section>

    <div
      class="h-px my-8 bg-gradient-to-r from-transparent via-theme-border to-transparent"
    />

    <section
      id="background"
      style="
        opacity: 0;
        animation: fadeUp 0.6s ease forwards;
        animation-delay: 0.25s;
      "
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2
            class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-3 group relative"
          >
            <a
              href="#background"
              class="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-theme-tertiary"
              >#</a
            >
            <SiteScrambleText text="Personal" />
          </h2>
          <div class="flex flex-col">
            <div
              v-for="(item, i) in personal"
              :key="i"
              class="py-2.5"
              :class="{ 'border-t border-theme-border': i > 0 }"
            >
              <span class="text-xs text-theme-secondary font-mono">{{ item.label }}</span>
              <a
                v-if="item.href"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-theme-primary block underline underline-offset-4 decoration-theme-border hover:decoration-theme-primary transition-colors"
              >{{ item.value }}</a>
              <span v-else class="text-sm text-theme-primary block">{{ item.value }}</span>
            </div>
          </div>
        </div>
        <div>
          <h2
            class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-3"
          >
            <SiteScrambleText text="Education" />
          </h2>
          <div class="flex flex-col">
            <div
              v-for="(entry, i) in education"
              :key="i"
              class="py-2.5"
              :class="{ 'border-t border-theme-border': i > 0 }"
            >
              <span class="text-sm text-theme-primary block">{{ entry.degree }}</span>
              <span class="text-xs text-theme-secondary font-mono">{{ entry.institution }} · {{ entry.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      class="h-px my-8 bg-gradient-to-r from-transparent via-theme-border to-transparent"
    />

    <section
      id="writing"
      style="
        opacity: 0;
        animation: fadeUp 0.6s ease forwards;
        animation-delay: 0.3s;
      "
    >
      <h2
        class="text-xs uppercase tracking-widest text-theme-secondary font-mono mb-3 group relative"
      >
        <a
          href="#writing"
          class="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity text-theme-tertiary"
          >#</a
        >
        <SiteScrambleText text="Writing" />
      </h2>
      <SiteWritingList :posts="featuredPosts" />
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
