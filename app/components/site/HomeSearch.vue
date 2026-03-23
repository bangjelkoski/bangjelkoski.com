<script setup lang="ts">
const { experience, projects, about, principles, contactLinks, snapshots, education, personal } =
  useSiteContent();

const searchItems = computed(() => {
  const items: string[] = [];

  for (const e of experience) items.push(`${e.role} at ${e.company} — ${e.summary}`);
  for (const p of projects) items.push(`${p.name} — ${p.summary}`);
  for (const a of about) items.push(a);
  for (const p of principles) items.push(`${p.label}: ${p.text}`);
  for (const c of contactLinks) items.push(`${c.label}: ${c.note}`);
  for (const s of snapshots) items.push(`${s.label}: ${s.value} — ${s.detail}`);
  for (const e of education) items.push(`${e.degree} — ${e.institution} (${e.period})`);
  for (const p of personal) items.push(`${p.label}: ${p.value}`);

  return items;
});

const query = ref("");
const focused = ref(false);
const inputRef = ref<HTMLInputElement>();

const hints = [
  "Engineering leadership and team scaling",
  "Frontend architecture and platform systems",
  "Building products in the blockchain ecosystem",
  "From zero to production at a startup",
  "TypeScript SDKs and developer tooling",
  "Designing systems that survive real use",
];

const animatedPlaceholder = ref("");
let animationTimer: ReturnType<typeof setTimeout> | null = null;

function startPlaceholderAnimation() {
  let hintIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const prefix = "Try: ";

  function tick() {
    if (focused.value || query.value) {
      animatedPlaceholder.value = "";
      return;
    }

    const hint = hints[hintIndex];

    if (!deleting) {
      charIndex++;
      animatedPlaceholder.value = prefix + hint.slice(0, charIndex);
      if (charIndex === hint.length) {
        animationTimer = setTimeout(() => { deleting = true; tick(); }, 1500);
        return;
      }
      animationTimer = setTimeout(tick, 80);
    } else {
      charIndex--;
      animatedPlaceholder.value = prefix + hint.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        hintIndex = (hintIndex + 1) % hints.length;
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
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    query.value = "";
    (e.target as HTMLInputElement).blur();
  }
}

const showDropdown = computed(() => focused.value && query.value.trim() && results.value.length > 0);
</script>

<template>
  <div class="relative flex justify-center">
    <div class="relative w-full max-w-lg">
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        :placeholder="focused ? 'Search about me...' : animatedPlaceholder || 'Search about me...'"
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
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
