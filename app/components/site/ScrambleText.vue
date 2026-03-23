<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  text: string;
  scrambleOnMount?: boolean;
  useCyrillic?: boolean;
}>();

const cyrillicMap: Record<string, string> = {
  a: "а",
  b: "б",
  c: "ц",
  d: "д",
  e: "е",
  f: "ф",
  g: "г",
  h: "х",
  i: "и",
  j: "ј",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  q: "к",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  v: "в",
  w: "в",
  x: "кс",
  y: "и",
  z: "з",
};

const cyrillicDigraphs: Record<string, string> = {
  gj: "ѓ",
  dz: "ѕ",
  lj: "љ",
  nj: "њ",
  kj: "ќ",
};

interface Token {
  latin: string;
  cyrillic: string;
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < text.length) {
    if (text.charAt(i) === " ") {
      tokens.push({ latin: " ", cyrillic: " " });
      i++;
      continue;
    }

    // Try digraph (2 chars)
    if (i + 1 < text.length) {
      const pair = text.slice(i, i + 2).toLowerCase();
      const digraph = cyrillicDigraphs[pair];
      if (digraph) {
        const charAtI = text.charAt(i);
        const isUpper = charAtI === charAtI.toUpperCase();
        const cyrillic = isUpper ? digraph.toUpperCase() : digraph;
        tokens.push({ latin: text.slice(i, i + 2), cyrillic });
        i += 2;
        continue;
      }
    }

    // Single char
    const ch = text.charAt(i);
    const lower = ch.toLowerCase();
    const cyrillic = cyrillicMap[lower];
    if (cyrillic) {
      const mapped = ch === ch.toUpperCase() ? cyrillic.toUpperCase() : cyrillic;
      tokens.push({ latin: ch, cyrillic: mapped });
    } else {
      tokens.push({ latin: ch, cyrillic: ch });
    }
    i++;
  }
  return tokens;
}

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const cyrillicScrambleChars = "абвгдѓежзѕијклмнопрстќуфхцчш";

function getScrambleChar(): string {
  const idx = Math.floor(Math.random() * scrambleChars.length);
  return scrambleChars.charAt(idx);
}

function getRandomCyrillic(): string {
  const idx = Math.floor(Math.random() * cyrillicScrambleChars.length);
  return cyrillicScrambleChars.charAt(idx);
}

interface CharState {
  char: string;
  active: boolean;
}

function initChars(): CharState[] {
  if (props.useCyrillic) {
    return tokenize(props.text).map((t) => ({
      char: t.cyrillic,
      active: false,
    }));
  }
  return [...props.text].map((ch) => ({ char: ch, active: false }));
}

const chars = ref<CharState[]>(initChars());

let animating = false;

function scramble() {
  if (animating) return;
  animating = true;

  if (props.useCyrillic) {
    // Reset to Cyrillic first, then animate to Latin
    chars.value = tokenize(props.text).map((t) => ({
      char: t.cyrillic,
      active: false,
    }));
    setTimeout(scrambleCyrillic, 400);
  } else {
    scrambleDefault();
  }
}

function scrambleCyrillic() {
  const tokens = tokenize(props.text);
  const settled = new Array(tokens.length).fill(false);
  const totalDuration = 600;
  const staggerPerToken = totalDuration / tokens.length;
  const startTime = performance.now();

  function animate() {
    const elapsed = performance.now() - startTime;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]!;
      if (token.latin === " ") {
        settled[i] = true;
        continue;
      }
      if (elapsed >= i * staggerPerToken + 200) {
        settled[i] = true;
      }
    }

    let activeIdx = -1;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]!;
      if (!settled[i] && token.latin !== " ") {
        activeIdx = i;
        break;
      }
    }

    const next: CharState[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]!;
      if (token.latin === " ") {
        next.push({ char: " ", active: false });
      } else if (settled[i]) {
        next.push({ char: token.latin, active: false });
      } else if (i === activeIdx) {
        next.push({ char: token.cyrillic, active: true });
      } else {
        next.push({ char: getRandomCyrillic(), active: false });
      }
    }

    chars.value = next;

    if (!settled.every(Boolean)) {
      requestAnimationFrame(animate);
    } else {
      animating = false;
    }
  }

  requestAnimationFrame(animate);
}

function scrambleDefault() {
  const target = props.text;
  const settled = new Array(target.length).fill(false);
  const totalDuration = 600;
  const staggerPerChar = totalDuration / target.length;
  const startTime = performance.now();

  function animate() {
    const elapsed = performance.now() - startTime;

    for (let i = 0; i < target.length; i++) {
      if (target.charAt(i) === " ") {
        settled[i] = true;
        continue;
      }
      if (elapsed >= i * staggerPerChar + 200) {
        settled[i] = true;
      }
    }

    let activeIdx = -1;
    for (let i = 0; i < target.length; i++) {
      if (!settled[i] && target.charAt(i) !== " ") {
        activeIdx = i;
        break;
      }
    }

    const next: CharState[] = [];
    for (let i = 0; i < target.length; i++) {
      const ch = target.charAt(i);
      if (ch === " ") {
        next.push({ char: " ", active: false });
      } else if (settled[i]) {
        next.push({ char: ch, active: false });
      } else {
        next.push({
          char: getScrambleChar(),
          active: i === activeIdx,
        });
      }
    }

    chars.value = next;

    if (!settled.every(Boolean)) {
      requestAnimationFrame(animate);
    } else {
      animating = false;
    }
  }

  requestAnimationFrame(animate);
}

onMounted(() => {
  if (props.scrambleOnMount) {
    setTimeout(scramble, props.useCyrillic ? 1200 : 0);
  }
});

defineExpose({ scramble });
</script>

<template>
  <span @mouseenter="scramble"
    ><span
      v-for="(ch, i) in chars"
      :key="i"
      :class="{ 'scramble-cursor': ch.active }"
      >{{ ch.char }}</span
    ></span
  >
</template>

<style scoped>
.scramble-cursor {
  border-bottom: 1.5px solid currentColor;
  padding-bottom: 1px;
}
</style>
