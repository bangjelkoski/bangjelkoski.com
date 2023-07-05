<template>
  <div class="rounded-lg shadow-md">
    <div class="bg-gray-800 py-2 rounded-t-lg px-4">
      <button
        class="rounded-full w-3 h-3 shadow bg-red-500 mr-2"
        aria-label="Close"
      ></button>
      <button
        class="rounded-full w-3 h-3 shadow bg-yellow-500 mr-2"
        aria-label="Minimize"
      ></button>
      <button
        class="rounded-full w-3 h-3 shadow bg-green-500"
        aria-label="Full Screen"
      ></button>
    </div>
    <div class="bg-code font-code py-6 px-4 rounded-b-lg">
      <personal class="mb-6" />
      <contactStatement class="mb-6" />
      <education class="mb-6" />
      <resume class="mb-6" />
      <experience class="mb-6" />
      <technologies class="mb-6" />
      <skills class="mb-6" />
      <interests v-if="false" class="mb-6" />
      <projects v-if="false" class="mb-6" />
      <blank />
    </div>
  </div>
</template>

<script>
import personal from './statements/personal'
import contactStatement from './statements/contact'
import resume from './statements/resume'
import experience from './statements/experience'
import education from './statements/education'
import skills from './statements/skills'
import technologies from './statements/technologies'
import interests from './statements/interests'
import projects from './statements/projects'
import blank from './statements/blank'

export default {
  components: {
    personal,
    resume,
    experience,
    education,
    skills,
    technologies,
    interests,
    projects,
    blank,
    contactStatement
  }
}
</script>
