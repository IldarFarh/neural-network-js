<template>
  <section class="container">
    <neural></neural>
    <nuxt-link class="button" to="/flappygame">
      Flappy bird game
    </nuxt-link>
  </section>
</template>

<script>
  import Neural from '../components/Neural.vue'
  export default {
    components: {
      Neural
    }
  }
</script>
