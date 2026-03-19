<script setup lang="ts">
const { experience, projects, about, principles, contactLinks, snapshots } =
  useSiteContent();

const searchItems = computed(() => {
  const items: string[] = [];

  for (const e of experience) items.push(`${e.role} at ${e.company} — ${e.summary}`);
  for (const p of projects) items.push(`${p.name} — ${p.summary}`);
  for (const a of about) items.push(a);
  for (const p of principles) items.push(`${p.label}: ${p.text}`);
  for (const c of contactLinks) items.push(`${c.label}: ${c.note}`);
  for (const s of snapshots) items.push(`${s.label}: ${s.value} — ${s.detail}`);

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
        class="search-input w-full px-6 py-3.5 text-base font-mono rounded-full focus:outline-none"
        @focus="focused = true"
        @blur="focused = false"
        @keydown="onKeydown"
      />
      <Transition name="dropdown">
        <div
          v-if="showDropdown"
          class="search-dropdown absolute top-full left-0 right-0 mt-1 rounded-2xl shadow-lg z-50 overflow-hidden"
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

<style>
.search-input {
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  color: #171717;
  transition: background 0.5s ease, border-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease;
}
.search-input::placeholder {
  color: #A3A3A3;
  transition: color 0.5s ease;
}
.search-input:focus {
  border-color: #525252;
  box-shadow: 0 0 0 1px #525252;
}

.dark .search-input {
  background: #272727;
  border-color: #202020;
  color: #EDEDED;
}
.dark .search-input::placeholder {
  color: #707070;
}
.dark .search-input:focus {
  border-color: #A3A3A3;
  box-shadow: 0 0 0 1px #A3A3A3;
}

.search-dropdown {
  background: #F5F5F5;
  border: 1px solid #E5E5E5;
  transition: background 0.5s ease, border-color 0.5s ease;
}
.dark .search-dropdown {
  background: #272727;
  border-color: #202020;
}

.search-dropdown > div {
  color: #525252;
  border-color: #E5E5E5;
  transition: color 0.5s ease, border-color 0.5s ease;
}
.dark .search-dropdown > div {
  color: #A3A3A3;
  border-color: #202020;
}

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
