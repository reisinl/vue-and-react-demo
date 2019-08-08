const Calcuate = require('./calculator.js')
class CorrelationCalculator extends Calcuate {
  constructor (newX, newY) {
    super(newX, newY)
    this.rxy = 0
    this.r2 = 0
  }

  doCorrelationCalculate () {
    super.dataCheck()
    if (!this.isValidated) {
      console.log('Then length of dataX and dataY is not same')
      return
    }
    super.doSetValues()
    let resutl1 = this.cnt * this.sumXY
    let result2 = this.sumX * this.sumY
    let result3 = this.cnt * this.sumX2 - this.sumX * this.sumX
    let result4 = this.cnt * this.sumY2 - this.sumY * this.sumY
    let sqrt = Math.sqrt(result3 * result4)

    this.rxy = (resutl1 - result2) / sqrt
    this.r2 = Math.pow(this.rxy, 2)
  }
}
module.exports = CorrelationCalculator
