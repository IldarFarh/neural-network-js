'use strict'

class Matrix {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = []

    for (var i = 0; i < this.rows; i++) {
      this.data[i] = []
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = 0
      }
    }
  }

  // static methods
  static dot(a,b) {
    if (a.cols != b.rows) {
      console.log("Matrix can not be dotted! cols: " + a.cols + ", rows: " + b.rows)
      return undefined
    }
    let result = new Matrix(a.rows, b.cols)

    for (let i = 0; i < result.rows; i++) {
      result.data[i] = []
      for (let j = 0; j < result.cols; j++) {
        let sum = 0
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j]
        }
        result.data[i][j] = sum
      }
    }
    return result
  }

  static subtract(a,b) {
    let result = new Matrix(a.rows, a.cols)
    for (let i = 0; i < result.rows; i++) {
      result.data[i] = []
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j]
      }
    }
    return result
  }

  static fromArray(array) {
    let result = new Matrix(1,array.length)
    for (var i = 0; i < array.length; i++) {
        result.data[0][i] = array[i];
    }
    return result
  }

  //operations on this object
  randomize() {
    this.data.forEach((row,i,array) => {
      row.forEach((el,j) => {
        array[i][j] = Math.random()*2-1
      })
    })
  }

  add(n) {
    if (n instanceof Matrix) {
      this.data.forEach((row,i,array) => {
        row.forEach((el,j) => {
          array[i][j] += n.data[i][j]
        })
      })
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n
        }
      }
    }
  }

  multiply(n) {
    if (n instanceof Matrix) {
      this.data.forEach((row,i,array) => {
        row.forEach((el,j) => {
          this.data[i][j] *= n.data[i][j]
        })
      })
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= n
        }
      }
    }
  }

  //returns new object
  toArray() {
    let arr = []
    this.data.forEach((row,i) => {
      row.forEach((el,j) => {
        arr.push(el)
      })
    })
    return arr
  }

  transpose() {
    let result = new Matrix(this.cols, this.rows)
    this.data.forEach((row,i) => {
      row.forEach((el,j) => {
        result.data[j][i] = el
      })
    })
    return result
  }

  copy() {
    let result = new Matrix(this.rows, this.cols)
    this.data.forEach((row,i) => {
      row.forEach((el,j) => {
        result.data[i][j] = el
      })
    })
    return result
  }

  map(fn) {
    let result = new Matrix(this.rows, this.cols)
    this.data.forEach((row,i) => {
      row.forEach((el,j) => {
        result.data[i][j] = fn(el)
      })
    })
    return result
  }

  //returns sun of elements in row or col
  getsum(type, n) {
    let result = 0
    if (type == 'row') {
      if (n > this.rows || n < 1) return result;
      for (let i = 0; i < this.cols; i++) {
        result += this.data[n-1][i]
      }
    }
    if (type == 'col' || n < 1) {
      if (n > this.cols) return result;
      for (var i = 0; i < this.rows; i++) {
        result += this.data[i][n-1]
      }
    }
    return result
  }

  print() {
    console.table(this.data)
  }
}

// module.exports = Matrix
export default Matrix
