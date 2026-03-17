<template>
  <div class="container">
    <div class="min-h-screen flex flex-col overflow-x-hidden">
      <LayoutHeader />
      <main class="flex-1 py-4">
        <div class="flex md:-mx-8 flex-wrap items-start">
          <div
            class="w-full mb-4 items-center flex md:w-1/4 md:justify-end md:mb-0 md:px-8"
          >
            <client-only>
              <LayoutSidebar />
            </client-only>
          </div>
          <div class="w-full md:w-3/4 md:px-8 content">
            <slot />
          </div>
        </div>
      </main>
      <LayoutFooter />
    </div>
  </div>
</template>
