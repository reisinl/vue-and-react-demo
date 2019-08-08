class Calcuate {
  constructor (newX, newY) {
    this.x = newX
    this.y = newY
    this.x2 = 0
    this.xy = 0
    this.y2 = 0
    this.sumX = 0
    this.sumXY = 0
    this.sumY = 0
    this.sumX2 = 0
    this.sumY2 = 0
    this.cnt = 0
    this.isValidated = true
  }

  /**
  * To check the length of two number arrays
  * return: false, length are not the same
  */
  dataCheck () {
    if (this.x.length !== this.y.length || this.x.length === 0 || this.y.length === 0) {
      this.isValidated = false
    }
  }

  doSetValues () {
    this.cnt = this.x.length
    this.xy = this.getXY(this.x, this.y)
    this.x2 = this.getSquare(this.x)
    this.y2 = this.getSquare(this.y)
    // console.log(this.xy)
    // console.log(this.x2)
    // console.log(this.y2)
    this.sumX = this.x.reduce(this.makeSum)
    this.sumXY = this.xy.reduce(this.makeSum)
    this.sumY = this.y.reduce(this.makeSum)
    this.sumX2 = this.x2.reduce(this.makeSum)
    this.sumY2 = this.y2.reduce(this.makeSum)
  }

  getSquare (item) {
    let target = []
    item.forEach(function (value) {
      target.push(Math.pow(value, 2))
    })
    return target
  }

  getXY (x, y) {
    let target = []
    x.forEach(function (value, index) {
      target.push(value * y[index])
    })
    return target
  }

  /**
  * To get the sum of a number array
  * total: the sum of the number array
  * num: add num
  */
  makeSum (total, num) {
    return parseFloat(total) + parseFloat(num)
  }
}
module.exports = Calcuate
