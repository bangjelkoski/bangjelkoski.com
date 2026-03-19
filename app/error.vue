<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => props.error?.statusCode || 500)
const message = computed(() => {
  if (statusCode.value === 404) return 'Page not found'
  return props.error?.message || 'Something went wrong'
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-concept-navy flex items-center justify-center px-6">
    <div class="text-center max-w-md">
      <p class="font-mono text-sm text-concept-coral mb-4">{{ statusCode }}</p>
      <h1 class="font-display text-2xl font-medium text-concept-cream mb-3">{{ message }}</h1>
      <p class="text-concept-muted mb-8">
        <template v-if="statusCode === 404">
          The page you're looking for doesn't exist or has been moved.
        </template>
        <template v-else>
          Something went wrong while loading this page.
        </template>
      </p>
      <button
        class="text-sm text-concept-muted hover:text-concept-cream transition-colors duration-150"
        @click="handleError"
      >
        &larr; Back to home
      </button>
    </div>
  </div>
</template>
