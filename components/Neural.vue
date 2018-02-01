<template>
  <div>
    <p>Results of network working:</p>
    <ul>
      <li v-for="elem in msg">{{ elem }}</li>
    </ul>
    <button class="button" @click="train">Train it</button>
  </div>
</template>

<script>
import {NeuralNetwork} from '../server/nn.js'

export default {
  data() {
    return{
      network: new NeuralNetwork(2,16,1),
      msg: []
    }
  },
  methods: {
    train() {
      let inputs = [[1,1],[1,0],[0,1],[0,0]]
      let answer = [[0],[1],[1],[0]]
      for (var i = 0; i < 50; i++) {
        inputs = [[1,1],[1,0],[0,1],[0,0]]
        answer = [[0],[1],[1],[0]]
        this.network.train(inputs,answer)
      }


      this.msg = []
      this.msg.push(this.network.feedforward([1,0])[0])
      this.msg.push(this.network.feedforward([0,0])[0])
      this.msg.push(this.network.feedforward([1,1])[0])
      this.msg.push(this.network.feedforward([0,1])[0])
    }
  }
}
</script>
