function Perceptor(numI) {
  let self = this
  this.weights = []
  for (var i = 0; i < numI; i++) {
    this.weights[i] = random(-100,100)
  }

  this.getGuess = (inputs) => {
    sum = 0
    this.weights.forEach((el, i) => {
      sum += el * inputs[i]
    })
    if(sum >= 0) {
      return 1
    }
    else {
      return -1
    }
  }

  this.train = (inputs, target) => {
    let output = self.getGuess(inputs)
    let err = target - output
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] += err*lc*inputs[i]
    }
  }

}



Perceptor.prototype.getLine = function (x) {
  return -this.weights[2]/this.weights[1] - (x*this.weights[0])/this.weights[1]
}
