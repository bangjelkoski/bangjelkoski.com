<template>
  <footer class="pb-2 pt-4 md:pt-6 lg:pt-8">
    <div class="flex flex-wrap items-center">
      <ul class="list-inline my-2 marginless">
        <li>
          <a
            href="https://www.linkedin.com/in/bangjelkoski/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
        </li>
        <li>
          <a
            href="https://github.com/bangjelkoski"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/bangjelkoski"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <mail />
        </li>
      </ul>
      <div class="w-full md:flex-1">
        <p class="text-left md:text-right text-sm text-gray-400">
          Copyright &copy; {{ new Date().getFullYear() }}. All rights reserved
          by Bojan Angjelkoski.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import mail from '~/components/elements/mail'

export default {
  components: {
    mail
  }
}
</script>
