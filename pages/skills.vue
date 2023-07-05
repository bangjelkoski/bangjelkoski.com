<template>
  <section>
    <h3 class="text-2xl mb-4">Some of the things I can do! 👨🏻‍💻</h3>
    <p>
      I am a committed and ambitious team lead that can quickly assimilate new
      ideas and concepts, demonstrate a logical and analytical approach to
      solving complex problems and issues and successfully manage a team od
      engineers. I can analyze code and engineer well-researched, cost-effective
      and responsive solutions. I manage all aspects of the software development
      cycle, from concept to requirements definition, design, development,
      launch, maintenance, and user support.
    </p>
    <p>
      <strong class="text-orange-500">Team Leadership</strong>
      - I have a proven track record of leading and guiding teams of software
      engineers. I excel in fostering collaboration, setting clear goals, and
      providing mentorship to my team members. My strong communication skills
      and interpersonal abilities enable me to build strong relationships with
      my team and effectively coordinate efforts to achieve project success.
    </p>
    <p>
      <strong class="text-orange-500">Software Engineering</strong>
      - Working as a Software Engineer for over twelve years, I have acquired a
      deep understanding of the principles and practices of software
      development. In addition to my experience, my education has equipped me
      with advanced knowledge in software design, architecture, coding, testing,
      and maintenance. I am well-versed in various software development
      methodologies, tools, and technologies, allowing me to make informed
      decisions and deliver high-quality solutions.
    </p>
    <p>
      <strong class="text-orange-500">Project Management</strong>
      - I am skilled in project management and have a proven ability to plan,
      organize, and execute software projects effectively. I am adept at
      defining project scope, managing resources, and ensuring timely delivery.
      My strong analytical and problem-solving skills enable me to address
      challenges and overcome obstacles that may arise during the project
      lifecycle.
    </p>
    <p>
      <strong class="text-orange-500">Product Management</strong>
      - With my comprehensive understanding of software development, I am
      capable of aligning technology solutions with business goals. I can
      contribute to product management activities by analyzing market needs,
      defining product requirements, and working closely with stakeholders to
      deliver valuable software solutions. I strive to ensure that the products
      I work on meet both user expectations and business objectives.
    </p>
    <p>
      <strong class="text-orange-500">Debugging and Quality Assurance</strong>
      - I have a keen eye for troubleshooting and resolving complex software
      issues. I excel in identifying the root cause of problems and implementing
      effective solutions. My extensive knowledge of debugging techniques and
      tools allows me to efficiently analyze and resolve issues, ensuring the
      stability and reliability of software systems.
    </p>
    <p>
      <strong class="text-orange-500">
        Eye for Detail and Troubleshooting
      </strong>
      - I possess a meticulous and detail-oriented approach to my work. I pay
      close attention to every aspect of software development, from requirements
      gathering to testing and deployment. My commitment to quality and
      precision enables me to deliver software solutions that meet the highest
      standards and exceed client expectations.
    </p>
    <p>
      <strong class="text-orange-500">Disciplined and Responsible</strong>
      - I am known for my discipline and responsibility in managing software
      projects. I am committed to meeting deadlines, adhering to project
      requirements, and ensuring the successful completion of tasks. My strong
      work ethic and reliability make me a trusted professional in the industry.
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
