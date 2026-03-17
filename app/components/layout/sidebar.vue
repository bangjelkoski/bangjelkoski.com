<template>
  <div class="md:sticky md:top-4">
    <aside class="md:pr-4 md:border-r border-gray-700">
      <div class="aside-inner">
        <nav>
          <ul class="list-nav marginless mb-0">
            <NuxtLink v-slot="{ isActive }" :to="{ name: 'index' }" custom>
              <li :class="{ 'is-active': isActive }">
                <button type="button" aria-label="Home" @click="navigateTo({ name: 'index' })">Home</button>
              </li>
            </NuxtLink>
            <NuxtLink v-slot="{ isActive }" :to="{ name: 'about' }" custom>
              <li :class="{ 'is-active': isActive }">
                <button type="button" aria-label="About" @click="navigateTo({ name: 'about' })">About</button>
              </li>
            </NuxtLink>
            <NuxtLink v-slot="{ isActive }" :to="{ name: 'skills' }" custom>
              <li :class="{ 'is-active': isActive }">
                <button type="button" aria-label="Skills" @click="navigateTo({ name: 'skills' })">Skills</button>
              </li>
            </NuxtLink>
            <NuxtLink v-slot="{ isActive }" :to="{ name: 'technologies' }" custom>
              <li :class="{ 'is-active': isActive }">
                <button type="button" aria-label="Technologies" @click="navigateTo({ name: 'technologies' })">Technologies</button>
              </li>
            </NuxtLink>
            <NuxtLink v-slot="{ isActive }" :to="{ name: 'blog' }" custom>
              <li :class="{ 'is-active': isActive }">
                <button type="button" aria-label="Blog" @click="navigateTo({ name: 'blog' })">Blog</button>
              </li>
            </NuxtLink>
          </ul>
        </nav>
      </div>
    </aside>
  </div>
</template>
