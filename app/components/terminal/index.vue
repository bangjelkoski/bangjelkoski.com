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
      <TerminalStatementsPersonal class="mb-6" />
      <TerminalStatementsContact class="mb-6" />
      <TerminalStatementsEducation class="mb-6" />
      <TerminalStatementsResume class="mb-6" />
      <TerminalStatementsExperience class="mb-6" />
      <TerminalStatementsTechnologies class="mb-6" />
      <TerminalStatementsSkills class="mb-6" />
      <TerminalStatementsInterests v-if="false" class="mb-6" />
      <TerminalStatementsProjects v-if="false" class="mb-6" />
      <TerminalStatementsBlank />
    </div>
  </div>
</template>
