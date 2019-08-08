// const Calcuate = require('../model/calculator.js')
const CorrelationCalculator = require('../model/correlationCalculator.js')
const LinearRegressionCalculator = require('../model/linearRegressionCalculator.js')
const fs = require('fs')

class FileReadWrite {
  constructor (iDataX, iDataY) {
    this.dataFileX = iDataX
    this.dataFileY = iDataY
  }

  readFile (dataFile) {
    let fsPromises = new Promise(function (resolve, reject) {
      fs.readFile(dataFile, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          let dataList = data.trim().split(/[\r\n \t]+/).map(num => +num)
          resolve(dataList)
        }
      })
    })
    return fsPromises
  }
  calculateWriteFile () {
    let fsPromisesX = this.readFile(this.dataFileX)
    let fsPromiseY = this.readFile(this.dataFileY)

    Promise.all([fsPromisesX, fsPromiseY])
      .then((values) => {
        let dataArrayX = values[0]
        let dataArrayY = values[1]
        let correlationCalculator = new CorrelationCalculator(dataArrayX, dataArrayY)
        correlationCalculator.doCorrelationCalculate()

        let rxy = correlationCalculator.rxy
        let r2 = correlationCalculator.r2

        let linearRegressionCalculator = new LinearRegressionCalculator(dataArrayX, dataArrayY)
        linearRegressionCalculator.doLinearRegressionCalculate()
        let beta0 = linearRegressionCalculator.beta0
        let beta1 = linearRegressionCalculator.beta1

        console.log('Files data')
        console.log('file (x)', this.dataFileX, dataArrayX.join(', '))
        console.log('file (y)', this.dataFileY, dataArrayY.join(', '))
        console.log()
        console.log('The calculate results are :')
        console.log('Correlation: rxy->', rxy, 'Correlation: r2->', r2)
        console.log('Linear Regression: beta0->', beta0, 'Linear Regression: beta1->', beta1)

        fs.writeFile('calculation_result.txt', JSON.stringify({ Correlation: { rxy: rxy, r2: r2 }, LinearRegression: { beta0: beta0, beta1: beta1 } }), (err) => {
          if (err) console.log(err)
          console.log('The calculation result has been written into calculation_result.txt successfully')
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

module.exports = FileReadWrite
