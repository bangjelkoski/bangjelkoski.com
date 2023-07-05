<template>
  <section>
    <h3 class="text-2xl mb-4">Some of the technologies I use! 💻</h3>
    <p>
      <strong class="text-orange-500">TypeScript</strong> - I am highly
      proficient in TypeScript (JavaScript). I have hands-on experience in
      writing clean and maintainable code using TypeScript, leveraging its
      strong typing system and modern language features. With TypeScript, I can
      enhance the scalability, maintainability, and overall quality of software
      applications.
    </p>
    <p>
      <strong class="text-orange-500">Web3 and Cryptography</strong> - I have a
      strong understanding of Web3 technologies and cryptography. I am familiar
      with protocols and frameworks such as Ethereum, CosmosSDK, CosmWasm,
      allowing me to develop decentralized applications (dApps) and interact
      with smart contracts. Additionally, my knowledge of cryptography enables
      me to implement secure and private communication protocols, cryptographic
      algorithms, consensus mechanisms, digital signature schemes, ...
    </p>
    <p>
      <strong class="text-orange-500">Blockchain and CosmosSDK</strong> - I have
      expertise in blockchain development and am well-versed in the Cosmos SDK
      framework. I am capable of designing, building, and deploying
      blockchain-based applications using the Cosmos ecosystem. My knowledge
      includes (but not limited to) creating custom modules, handling
      transactions, implementing governance mechanisms, custom messages,
      keepers, ante handlers - all while ensuring the security and integrity of
      the blockchain network.
    </p>
    <p>
      <strong class="text-orange-500">UI Frameworks</strong> - I am proficient
      in various modern web development frameworks such as Vue.js, React, and
      Angular. I have hands-on experience in building scalable and interactive
      user interfaces using these frameworks. Additionally, I am skilled in
      utilizing TailwindCSS, a utility-first CSS framework, to create responsive
      and visually appealing web designs.
    </p>
    <p>
      <strong class="text-orange-500">Software Architecture</strong> - I have a
      strong understanding of software architecture principles and best
      practices. I am skilled in designing scalable, modular, and maintainable
      software systems. My expertise includes defining system components,
      establishing communication protocols, and ensuring the separation of
      concerns. I am capable of evaluating architectural trade-offs and making
      informed decisions to achieve optimal system performance and flexibility.
    </p>
    <p>
      <strong class="text-orange-500">Design Patterns</strong> - I am
      well-versed in various software design patterns that provide reusable
      solutions to common design problems. I have practical experience in
      applying design patterns such as MVC (Model-View-Controller), Observer,
      Factory, and Singleton and many others. These patterns enhance code
      organization, promote code reusability, and improve the maintainability of
      software projects. I can leverage design patterns effectively to create
      well-structured and extensible software architectures.
    </p>
  </section>
</template>

<script>
import { DefaultTags, generateMetaTitle } from '~/utils/meta'

const title = "Technologies - Bojan Angjelkoski's Portfolio Website"

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
