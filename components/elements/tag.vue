<template>
  <span
    class="rounded-full px-2 py-px bg-indigo-700 text-indigo-100 text-xs font-bold inline-block select-none mr-2"
  >
    {{ tag.trim() }}
  </span>
</template>

<script>
export default {
  props: {
    tag: {
      required: true,
      type: String
    }
  }
}
</script>
