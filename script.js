let brain

function setup() {
  createCanvas(300,200)


  brain = new NeuralNetwork(2,16,16,1)

  // let inputs = [[1,0]]
  // // let inputs = [[1,1],[1,0],[0,1],[0,0]]
  // let answer = [[0],[1],[1],[0]]
  // brain.train(inputs,answer)

  // let input = [1,0]
  // let output = brain.feedforward(input)
  // console.table(output);
}

function draw() {
  background(51)
  let inputs = [[1,1],[1,0],[0,1],[0,0]]
  let answer = [[0],[1],[1],[0]]
  brain.train(inputs,answer)
  //brain.mutate()

  stroke(255)
  rect(50,0,50,brain.feedforward([1,0])[0]*200)
  rect(100,0,50,(1-brain.feedforward([1,1])[0])*200)
  rect(150,0,50,(1-brain.feedforward([0,0])[0])*200)
  rect(200,0,50,brain.feedforward([0,1])[0]*200)
}

function mousePressed() {
  let inputs = [[1,1],[1,0],[0,1],[0,0]]
    let answer = [[0],[1],[1],[0]]
    brain.train(inputs,answer)

    console.log('1: ' + brain.feedforward([1,0])[0] + ', 0: ' + brain.feedforward([0,0])[0])
}
