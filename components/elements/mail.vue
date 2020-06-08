<template>
  <span class="cursor-pointer inline-block">
    <a v-if="timesClicked === 0" @click.stop.prevent="timesClicked++">
      Show Email
    </a>
    <a v-if="timesClicked === 1" @click.stop.prevent="timesClicked++">
      Click one more time
    </a>
    <a v-if="timesClicked >= 2" href="mailto:me@bangjelkoski.com">
      me@bangjelkoski.com
    </a>
  </span>
</template>

<script>
export default {
  data: () => ({
    timesClicked: 0
  })
}
</script>
