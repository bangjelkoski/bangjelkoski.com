<template>
  <section>
    <h3 class="text-2xl mb-4">Some of the things I can do! 👨🏻‍💻</h3>
    <p>
      I am a committed and ambitious professional that can quickly assimilate
      new ideas and concepts and demonstrate a logical and analytical approach
      to solving complex problems and issues. I can analyze code and engineer
      well-researched, cost-effective and responsive solutions. I manage all
      aspects of the web development cycle, from concept to requirements
      definition, design, development, launch, maintenance, and user support.
    </p>
    <p>
      <strong class="text-orange-500">Software Engineering</strong> - My
      programming career started working on C++ when I learned the basics of OOP
      programming. Getting to work on
      <strong>big scale projects</strong> requires me to implement different
      <strong>design patterns and algorithms</strong> for different problems the
      project is trying to tackle. When possible I try to adopt TDD in my
      development. <strong>DDD, Event Sourcing, CQRS</strong> are relatively new
      stuff to me, so I am trying to learn more and use them in my newest
      projects when are the obvious choice.
    </p>
    <p>
      <strong class="text-orange-500">Project Management</strong> - Working as a
      Full Stack Developer and in small teams in the past few years taught me
      how to <strong>properly manage a project</strong>. From organizing sprints
      and tasks, doing code reviews and quality checks, executing the tasks to
      managing the team to
      <strong>achieve goals and meet the criteria</strong> set at the time.
    </p>
    <p>
      <strong class="text-orange-500">Strong communication skills</strong> -
      <strong>Communicating clearly</strong> while taking into account who my
      audience is, is an important factor while building products used by
      different groups of people. Explaining technical terms and situations to
      customers who are not so technically educated is something I am good at.
      <strong>Being polite</strong> in every situation is one of my biggest
      perks, even if I have to be brutally honest about something.
    </p>
    <p>
      <strong class="text-orange-500">Team Player</strong> - Achieving the
      <strong>best results requires teamwork</strong>, especially when working
      on big scale projects. Within the team, I always try to be
      <strong>honest and transparent</strong> with my opinions about the results
      we are trying to achieve. Sometimes in team work, my opinion won't be the
      same as the group decision, which is totally fine and I always value that
      decision and act upon it.
    </p>
    <p>
      <strong class="text-orange-500">Independent and responsible work</strong>
      - When I am being assigned a task I take
      <strong>full responsability and ownership</strong> of the task and do what
      I promised. I understand the why of decisions and always suggest
      improvements when there is an opportunity to do so. Even if I stumble
      across a problem, finding a way to overcome them is a
      <strong>challenge I full embrace</strong>.
    </p>
    <p>
      <strong class="text-orange-500">Quality assurance</strong> - I always aim
      for <strong>quality over quantity</strong>. Expanding my knowledge (both
      technically and non-technically) is something I
      <strong>strive actively and consistently</strong>, which helps me
      <strong>deliver high-end solutions</strong> for the project I am working
      on. When working within a team, I always try to give constructive and
      actionable feedback. <strong>Writing clean code is my obsession.</strong>
    </p>
    <p>
      <strong class="text-orange-500"
        >Eye for Detail and Troubleshooting</strong
      >
      - Troubleshooting and debugging a lot of issues and problems has given me
      the <strong>ability to quickly find and fix bugs and issues</strong>.
      Working in this industry for a long time taught me to
      <strong>anticipate potential bugs</strong> which save time to work and
      improve other features within the project I am currently working on.
    </p>
    <p>
      <strong class="text-orange-500">Remote Work</strong> - While remote work
      has a lot of benefits, it can be
      <strong>challenging and requires a higher level of discipline</strong>.
      Since <strong>communication is the key to working remotely</strong>, I can
      <strong
        >search and find information efficiently, document everything</strong
      >
      in a way that is accessible for everyone. Also, I
      <strong>don't hesitate to ask questions</strong> and seek help when
      needed.
    </p>
  </section>
</template>

<script>
import { DefaultTags, generateMetaTitle } from '~/utils/meta'

const title = "Skills - Bojan Angjelkoski's Portfolio Website"

export default {
  head() {
    return {
      title,
      bodyAttrs: {
        class: 'skills'
      },
      meta: [
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${process.env.NUXT_ENV_APP_URL}${this.$route.fullPath}`
        },
        ...DefaultTags,
        ...generateMetaTitle(title)
      ]
    }
  }
}
</script>
