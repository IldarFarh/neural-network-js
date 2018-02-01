import Events from 'events'
import Config from './flappy-config.js'

let Game = {
  score: {
    score: 0,
    record: 0,
    addScore: () => {
      Game.score.score++

      if (Game.score.score > Game.score.record) {
        Game.score.record = Game.score.score
      }
      Game.events.emit('scoreUpdate')
    },
    clearScore: () => {
      Game.score.score = 0
      Game.events.emit('scoreUpdate')
    }
  },
  events: new Events.EventEmitter(),
  limits: {
    maxHeight: Config.app.height,
    minHeight: Config.bird.height
  },
  stateNow: null,
  stateList: {
    reset: 'reset',
    ready: 'ready',
    running: 'running',
    pause: 'pause',
    over: 'over',
    stop: 'stop'
  },
  timer: {
    isRunning: false,
    timerId: 0,
    start() {
      console.log('game-js: timer start')
      this.timerId = setInterval(()=>{
        Game.events.emit('timer')
      }, Config.app.refreshInterval)
      this.isRunning = true
    },
    stop() {
      console.log('game-js: timer stop')
      clearInterval(this.timerId)
      this.isRunning = false
    }
  },
  spaceOrTouch() {
    switch (Game.stateNow) {
      case Game.stateList.ready:
        Game.setState(Game.stateList.running)
        break
      case Game.stateList.running:
        Game.events.emit('space')
        break
      case Game.stateList.stop:
        Game.setState(Game.stateList.reset)
        Game.setState(Game.stateList.ready)
        break
      default:
        break
    }
  },
  init() {
    this.score.clearScore()

    // document.addEventListener('touchstart', this.spaceOrTouch, false)
    // document.onkeydown = (e) => {
    //   if (e.keyCode === 32) {
    //     this.spaceOrTouch()
    //   }
    //   if (e.keyCode === 27) {
    //     if (this.timer.isRunning) {
    //       this.timer.stop()
    //     } else {
    //       this.timer.start()
    //     }
    //   }
    // }
    this.setState(this.stateList.reset)
    this.setState(this.stateList.ready)
    if (!this.timer.isRunning) {
      this.timer.start()
    }
  },
  start() {
    this.setState(this.stateList.running)
  },
  setState(state) {
    if (this.stateList[state] && this.stateNow !== state) {
      this.stateNow = state
      this.events.emit('stateChange', state)
      console.log('Game: state change to ' + state)
    }
  }
}

export {Game}
