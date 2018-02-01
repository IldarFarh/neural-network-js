<template>
  <div :class="['bird',classList[wingState]]"
      :style="styles">
  </div>
</template>

<script>
import Config from '../../server/flappy-config.js'

export default {
  data() {
    return {
      velocityUpdateCounter: 0,
      velocityUpdateCountMax: 5,
      heightNow: Config.bird.bottom + this.offset,
      classList: ['bird-0', 'bird-1', 'bird-2'],
      velocity: Config.bird.flyVector,
      rotateRate: 0.02,
      limitBottom: 0,
      limitTop: Config.app.height
    }
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    offset: {
      type: Number,
      required: true
    }
  },
  computed: {
    wingState() {
      if (this.velocity > 0) return 2
      if (this.velocity === 0) return 1
      return 0
    },
    gameState() {
      return this.game.stateNow
    },
    rotate() {
      switch (this.game.stateNow) {
        case this.game.stateList.running:
          return -Math.atan(this.velocity*this.rotateRate)/Math.PI*180
        case this.game.stateList.over:
          if (this.heightNow > Config.land.height) {
            return 90
          }
          return 0
        default:
          return 0
      }
    },
    styles() {
      return {
        width:Config.bird.width+'px',
        height:Config.bird.height+'px',
        left:Config.bird.left+'px',
        bottom:this.heightNow+'px',
        transform: 'rotate('+this.rotate+'deg)'
      }
    }
  },
  methods: {
    reset() {
      this.velocityUpdateCounter = 0
      this.velocityUpdateCountMax = 5
      this.classList = ['bird-0', 'bird-1', 'bird-2']
      this.heightNow = Config.bird.bottom + this.offset
      this.velocity = Config.bird.flyVector
      this.rotateRate = 0.02
      this.limitBottom = 0
      this.limitTop = Config.app.height
    },
    update() {
      if (this.hasOwnProperty(this.game.stateNow))
        this[this.game.stateNow]()
    },
    fly() {
      if (this.game.stateNow == this.game.stateList.running)
        this.velocity = Config.bird.flyVector
    },
    stateChange(state) {
      if (state == this.game.stateList.reset) {
        this.reset()
      }
    },
    over() {
      if (this.heightNow > Config.land.height) {
        this.velocity = Config.bird.gravity
        this.heightNow += this.velocity
      } else if (this.heightNow < Config.land.height) {
        this.heightNow = Config.land.heightNow
      } else {
        this.game.setState(this.game.stateList.stop)
        setTimeout(()=>{
          this.game.init()
        },500)
      }
    },
    running() {
      this.velocityUpdateCounter++
      this.heightNow += this.velocity
      if (this.velocityUpdateCounter == this.velocityUpdateCountMax) {
        this.velocityUpdateCounter = 0
        this.velocity += Config.bird.gravity
      }
      if (this.heightNow > this.game.limits.maxHeight || this.heightNow < this.game.limits.minHeight) {
        this.game.timer.stop()
        setTimeout(()=> {
          this.game.timer.start()
        }, 500)
        this.game.setState(this.game.stateList.over)
        console.log('Bird:Height now:'+this.heightNow);
      }
    }
  },
  created() {
    console.log('Bird:Created');
    this.reset()
    this.game.events.addListener('timer', this.update)
    this.game.events.addListener('space', this.fly)
    this.game.events.addListener('stateChange', this.stateChange)
  },
  destroyed() {
    console.log('Bird:Destroyed');
    this.game.events.removeListener('timer', this.update)
    this.game.events.removeListener('space', this.fly)
    this.game.events.removeListener('stateChange', this.stateChange)
  }

}
</script>

<style>
  .bird {
    position: absolute;
    transition: transform 0.5s;
  }
  .bird-0 {
      background: url("../../assets/img/bird0_0.png") 50% 50% no-repeat;
      background-size: 135%;
  }
  .bird-1 {
      background: url("../../assets/img/bird0_1.png") 50% 50% no-repeat;
      background-size: 135%;
  }
  .bird-2 {
      background: url("../../assets/img/bird0_2.png") 50% 50% no-repeat;
      background-size: 135%;
  }
</style>
