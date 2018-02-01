<template>
  <ul class="pipe-group">
    <li v-for="pipe in pipes"><pipe :position="pipe.position" :topPipeHeight="pipe.topPipeHeight"></pipe></li>
  </ul>
</template>

<script>
import Config from '../../server/flappy-config.js'
import Pipe from './pipe.vue'

export default {
  data() {
    return {
      pipes: [],
      isPassing: false
    }
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  components: {
    Pipe
  },
  methods: {
    newPipe(position, topHeight) {
      return {
        position: position,
        topPipeHeight: topHeight || (Config.pipe.topPipeHeightMin +
          Math.random()*(Config.pipe.topPipeHeightMax - Config.pipe.topPipeHeightMin))
      }
    },
    update() {
      if (this.hasOwnProperty(this.game.stateNow))
        this[this.game.stateNow]()
    },
    changeLimit(height) {
      if (this.isPassing) {
        this.game.limits.maxHeight = Config.app.height - height - Config.bird.height
        this.game.limits.minHeight = Config.app.height - height - Config.pipe.spaceHeight
      } else {
        this.game.limits.maxHeight = Config.app.height - Config.bird.height
        this.game.limits.minHeight = Config.land.height
      }
    },
    running() {
      let passPos = -1
      this.pipes.forEach((el,i) => {
        let pos = el.position
        let topHeight = el.topPipeHeight
        pos -= Config.pipe.speed
        if (pos < -Config.pipe.width) {
          pos += (Config.pipe.width + Config.pipe.distance) * Config.pipe.pipeCount
          this.pipes.splice(i, 1, this.newPipe(pos))
        } else {
          el.position = pos//this.pipes.splice(i, 1, this.newPipe(pos, topHeight))
        }
        if (el.position <= Config.bird.left + Config.bird.width
              && Config.bird.left <= el.position + Config.pipe.width) {
          passPos = i
        }
      })
      if (passPos != -1) {
        if (!this.isPassing) {
          this.isPassing = true
          this.changeLimit(this.pipes[passPos].topPipeHeight)
        }
      } else {
        if (this.isPassing) {
          this.game.score.addScore()
        }
        this.isPassing = false
        this.changeLimit()
      }
    },
    stateChange(state) {
      if (state == this.game.stateList.reset) {
        this.reset()
      }
    },
    reset() {
      while (this.pipes.length) this.pipes.pop()
      for (var i = 0; i < Config.pipe.pipeCount; i++) {
        this.pipes.push(
          this.newPipe(Config.app.width + i * (Config.pipe.width + Config.pipe.distance))
        )
      }
      this.isPassing = false;
    }
  },
  created() {
    console.log('PipeGroup:Created')
    this.reset()
    this.game.events.addListener('timer', this.update)
    this.game.events.addListener('stateChange', this.stateChange)
  },
  destroyed() {
    console.log('PipeGroup:Destroyed')
    this.game.events.removeListener('timer', this.update)
    this.game.events.removeListener('stateChange', this.stateChange)
  }
}
</script>

<style>
  .pipe-group{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .pipe-group li {
    text-decoration: none;
  }
</style>
