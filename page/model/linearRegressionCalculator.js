class LinearRegressionCalculator extends Calcuate {
  constructor (newX, newY) {
    super(newX, newY)
    this.beta1 = 0
    this.beta0 = 0
  }

  doLinearRegressionCalculate () {
    super.dataCheck()
    if (!this.isValidated) {
      console.log('Then length of dataX and dataY is not same')
      return
    }
    super.doSetValues()

    let xAverage = this.sumX / this.cnt
    let yAverage = this.sumY / this.cnt

    let result1 = this.sumXY - (this.cnt * xAverage * yAverage)
    let result2 = this.sumX2 - (this.cnt * xAverage * xAverage)

    this.beta1 = result1 / result2
    this.beta0 = yAverage - (this.beta1 * xAverage)
  }
}
