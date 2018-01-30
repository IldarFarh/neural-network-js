'use strict'

function sigmoid(x) {
  return 1/(1 + Math.exp(-x))
}

function dsigmoid(x) {
  return x * (1 - x)
}

function tanh(x) {
  return Math.tanh(x)
}

function dtanh(x) {
  return 1 / (pow(Math.cosh(x), 2));
}

function ReLU(x) {
  return Math.max(0.01,x)
}

function dReLU(x) {
  if (x >= 0) return 1
  else return 0
}

function mutate(x) {
  if (Math.random() < 0.01) return x + Math.random()*0.5
  else return x
}

// const Matrix = require('./matrix.js')
import Matrix from './matrix.js'

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes, learning_rate) {
    this.input_nodes = input_nodes
    this.hidden_nodes = hidden_nodes
    this.second_layer = hidden_nodes
    this.output_nodes = output_nodes

    this.weight_ih = new Matrix(input_nodes + 1, hidden_nodes)
    this.weight_ih.randomize()
    this.weight_hs = new Matrix(hidden_nodes +1, hidden_nodes)
    this.weight_hs.randomize()
    this.weight_so = new Matrix(hidden_nodes +1, output_nodes)
    this.weight_so.randomize()

    this.lr = learning_rate || 0.01

    this.activation = ReLU
    this.derivative = dReLU
  }

  mutate() {
    this.weight_hs = this.weight_hs.map(mutate)
    this.weight_so = this.weight_so.map(mutate)
    this.weight_ih = this.weight_ih.map(mutate)
  }

  feedforward(input_array) {
    if (input_array.length != this.input_nodes) {
      console.log('Inputs are incorrect');
      return undefined
    }
    input_array.push(1)
    let input = Matrix.fromArray(input_array)

    let hidden_inputs = Matrix.dot(input, this.weight_ih)
    let hidden_outputs = hidden_inputs.map(this.activation)
    hidden_outputs.data[0].push(1)
    hidden_outputs.cols++

    let second_inputs = Matrix.dot(hidden_outputs, this.weight_hs)
    let second_outputs = second_inputs.map(this.activation)
    second_outputs.data[0].push(1)
    second_outputs.cols++

    let output_inputs = Matrix.dot(second_outputs, this.weight_so)
    let outputs = output_inputs.map(this.activation)

    return outputs.toArray()
  }

  train(inputs, answer) {
    inputs.forEach((input_array,j) => {
      input_array.push(1)
      let input = Matrix.fromArray(input_array)
      let target = Matrix.fromArray(answer[j])

      let hidden_inputs = Matrix.dot(input, this.weight_ih)
      let hidden_outputs = hidden_inputs.map(this.activation)
      hidden_outputs.data[0].push(1)
      hidden_outputs.cols++

      let second_inputs = Matrix.dot(hidden_outputs, this.weight_hs)
      let second_outputs = second_inputs.map(this.activation)
      second_outputs.data[0].push(1)
      second_outputs.cols++

      let output_inputs = Matrix.dot(second_outputs, this.weight_so)
      let outputs = output_inputs.map(this.activation)

      let outputs_errors = Matrix.subtract(target, outputs)
      let gradient_output = outputs.map(this.derivative)
      gradient_output.multiply(outputs_errors)
      gradient_output.multiply(this.lr)
      let deltaW_output = Matrix.dot(second_outputs.transpose(), gradient_output)

      let second_errors = Matrix.dot(this.weight_so, outputs_errors.transpose())
      second_errors = second_errors.transpose()
      second_errors.data[0].pop()
      second_errors.cols--
      second_outputs.data[0].pop()
      second_outputs.cols--
      let gradient_second = second_outputs.map(this.derivative)
      gradient_second.multiply(second_errors)
      gradient_second.multiply(this.lr)
      let deltaW_second = Matrix.dot(hidden_outputs.transpose(), gradient_second)

      let hidden_errors = Matrix.dot(this.weight_hs, second_errors.transpose())


      let gradient_hidden = hidden_outputs.map(this.derivative)
      gradient_hidden.data[0].pop()
      gradient_hidden.cols--
      gradient_hidden.multiply(hidden_errors.transpose())
      gradient_hidden.multiply(this.lr)
      let deltaW_hidden = Matrix.dot(input.transpose(), gradient_hidden)

      this.weight_so.add(deltaW_output)
      this.weight_hs.add(deltaW_second)
      this.weight_ih.add(deltaW_hidden)
    })
  }
}

// module.exports = NeuralNetwork
export {NeuralNetwork}
