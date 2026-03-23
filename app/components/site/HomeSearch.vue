<script setup lang="ts">
import type {
  SiteContactLink,
  SiteEducationEntry,
  SiteExperienceEntry,
  SitePersonalEntry,
} from "~/types/site-content";

const { t, tm, rt } = useI18n();

const experience = computed(() =>
  (tm("experience") as SiteExperienceEntry[]).map((entry) => ({
    role: rt(entry.role),
    company: rt(entry.company),
    period: rt(entry.period),
  })),
);
const about = computed(() =>
  (tm("about") as string[]).map((paragraph) => rt(paragraph)),
);
const contactHrefById = {
  email: "mailto:hello@abojan.me",
  github: "https://github.com/bangjelkoski",
  linkedin: "https://linkedin.com/in/bangjelkoski",
  x: "https://x.com/bangjelkoski",
} as const;
const contactLinks = computed(() =>
  (tm("contactLinks") as Array<Omit<SiteContactLink, "href">>).map((link) => ({
    id: link.id,
    label: rt(link.label),
    note: rt(link.note),
    href: contactHrefById[link.id as keyof typeof contactHrefById],
  })),
);
const education = computed(() =>
  (tm("education") as SiteEducationEntry[]).map((entry) => ({
    degree: rt(entry.degree),
    institution: rt(entry.institution),
    period: rt(entry.period),
  })),
);
const personal = computed(() =>
  (tm("personal") as SitePersonalEntry[]).map((item) => ({
    label: rt(item.label),
    value: rt(item.value),
    ...(item.href ? { href: rt(item.href) } : {}),
  })),
);
const hints = computed(() => (tm("search.hints") as string[]).map((hint) => rt(hint)));
const tryPrefix = computed(() => t("search.tryPrefix"));

const searchItems = computed(() => {
  const items: string[] = [];

  for (const entry of experience.value) {
    items.push(`${entry.role} at ${entry.company} — ${entry.period}`);
  }
  for (const paragraph of about.value) items.push(paragraph);
  for (const entry of education.value) {
    items.push(`${entry.degree} — ${entry.institution} (${entry.period})`);
  }
  for (const item of personal.value) items.push(`${item.label}: ${item.value}`);

  return items;
});

const query = ref("");
const focused = ref(false);
const inputRef = ref<HTMLInputElement>();

const animatedPlaceholder = ref("");
let animationTimer: ReturnType<typeof setTimeout> | null = null;

function startPlaceholderAnimation() {
  if (hints.value.length === 0) return;

  let hintIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    if (focused.value || query.value) {
      animatedPlaceholder.value = "";
      return;
    }

    const hint = hints.value[hintIndex];

    if (!deleting) {
      charIndex++;
      animatedPlaceholder.value = tryPrefix.value + hint.slice(0, charIndex);
      if (charIndex === hint.length) {
        animationTimer = setTimeout(() => {
          deleting = true;
          tick();
        }, 1500);
        return;
      }
      animationTimer = setTimeout(tick, 80);
    } else {
      charIndex--;
      animatedPlaceholder.value = tryPrefix.value + hint.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        hintIndex = (hintIndex + 1) % hints.value.length;
        animationTimer = setTimeout(tick, 400);
        return;
      }
      animationTimer = setTimeout(tick, 40);
    }
  }

  tick();
}

function stopPlaceholderAnimation() {
  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = null;
  }
  animatedPlaceholder.value = "";
}

watch(focused, (isFocused) => {
  if (isFocused) {
    stopPlaceholderAnimation();
  } else if (!query.value) {
    startPlaceholderAnimation();
  }
});

onMounted(() => {
  startPlaceholderAnimation();
});

onBeforeUnmount(() => {
  stopPlaceholderAnimation();
});

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return [];
  return searchItems.value
    .filter((item) => item.toLowerCase().includes(q))
    .slice(0, 5);
});

function highlightMatch(text: string) {
  const q = query.value.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return `${escapeHtml(before)}<mark class="bg-theme-accent/20 text-theme-primary rounded px-0.5">${escapeHtml(match)}</mark>${escapeHtml(after)}`;
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    query.value = "";
    (e.target as HTMLInputElement).blur();
  }
}

const showDropdown = computed(
  () => focused.value && query.value.trim() && results.value.length > 0,
);
</script>

<template>
  <div class="relative flex justify-center">
    <div class="relative w-full max-w-lg">
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        :placeholder="
          focused
            ? t('search.placeholder')
            : animatedPlaceholder || t('search.placeholder')
        "
        class="w-full px-6 py-3.5 text-base font-mono bg-theme-surface border border-theme-border rounded-full text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:border-theme-secondary focus:ring-1 focus:ring-theme-secondary"
        @focus="focused = true"
        @blur="focused = false"
        @keydown="onKeydown"
      />
      <Transition name="dropdown">
        <div
          v-if="showDropdown"
          class="absolute top-full left-0 right-0 mt-1 rounded-2xl border border-theme-border bg-theme-surface shadow-lg z-50 overflow-hidden"
        >
          <div
            v-for="(item, i) in results"
            :key="i"
            class="px-3 py-2 text-xs text-theme-secondary leading-relaxed border-t border-theme-border first:border-t-0"
            v-html="highlightMatch(item)"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
