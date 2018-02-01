<template>
  <div class="land"
    :style="{width:this.style.width+'px',left:this.style.left+'px',height:this.style.height+'px'}">
  </div>
</template>

<script>
  import Config from '../../server/flappy-config.js'

  export default {
    data() {
      return {
        style: {
          width: Config.app.width + Config.land.unitWidth*2,
          height: Config.land.height,
          left: 0
        }
      }
    },
    props: {
      game: {
        type: Object,
        required: true
      }
    },
    methods: {
      update() {
        if (this.hasOwnProperty(this.game.stateNow))
          this[this.game.stateNow]()
      },
      running() {
        this.style.left -= Config.land.speed
        if (this.style.left <= - Config.land.unitWidth)
          this.style.left += Config.land.unitWidth
      },
      over() {

      }      
    },
    created() {
      console.log('Land:Created')
      this.game.events.addListener('timer',this.update)
    },
    destroyed() {
      console.log('Land:Destroyed')
      this.game.events.removeListener('timer',this.update)
    }
  }
</script>

<style scoped>
  .land {
    position: absolute;
    bottom: 0;
    background: url("../../assets/img/land.png") repeat-x;
    z-index: 10;
  }
</style>
