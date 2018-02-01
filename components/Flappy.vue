<template>
  <div>
    <div id="app" :style="{width:width+'px',height:height+'px'}" @click="buttonPress">
      <land :game="game"></land>
      <pipe-group :game="game"></pipe-group>
      <div v-for="bird in birds">
        <bird :game="game" :offset="bird.offset"></bird>
      </div>
      <panel :game="game"></panel>

    </div>
  </div>
</template>

<script>
import {Game} from '../server/flappy-game.js'
import Config from '../server/flappy-config.js'
import Land from './flappy/land.vue'
import PipeGroup from './flappy/pipe-group.vue'
import Bird from './flappy/bird.vue'
import Panel from './flappy/panel.vue'

export default {
  data() {
    return {
      game: Game,
      width: Config.app.width,
      height: Config.app.height,
      birds: [{offset: 0}]
    }
  },
  created() {
    Game.init()
  },
  methods: {
    buttonPress() {
      Game.spaceOrTouch()
    }
  },
  components:{
    Land,
    PipeGroup,
    Bird,
    Panel
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  #app {
    display: block;
    border: 5px solid #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: url("../assets/img/bg_day.png") 100% 100% no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
</style>
