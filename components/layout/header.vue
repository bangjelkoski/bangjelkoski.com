<template>
  <header class="pt-8 pb-2 md:py-12 lg:py-16">
    <div class="inner flex flex-wrap items-center">
      <img
        src="/me_1.jpg"
        class="w-auto hidden md:block md:h-16 lg:h-20 rounded-full shadow-lg mr-4 cursor-pointer"
        alt="Bojan Angjelkoski"
        @click.prevent="$router.push({ name: 'index' })"
      />
      <div class="flex-1">
        <div class="flex flex-wrap">
          <h1
            class="text-2xl text-gray-200 md:text-3xl leading-snug truncate w-full font-black"
          >
            Bojan Angjelkoski
          </h1>
          <div>
            <h3
              class="uppercase text-gray-500 text-sm tracking-wide font-normal stack"
            >
              Technical Lead
              <span class="text-orange-500">&bull;</span> MSc in Software
              Engineering
            </h3>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
