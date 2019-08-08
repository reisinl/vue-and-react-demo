const CorrelationCalculator = require('../model/correlationCalculator.js')
const LinearRegressionCalculator = require('../model/linearRegressionCalculator.js')

class Api {
  static makeResponse (request, response) {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })

    let dataX = Api.getValidList(request.dataX)
    let dataY = Api.getValidList(request.dataY)

    // validate data
    let xLength = dataX.length
    let yLength = dataY.length
    if (xLength === 0 || yLength === 0 || xLength !== yLength) {
      response.write(JSON.stringify({
        success: false,
        content: 'Please confirm the data you input'
      }))
      response.end()
    }

    let corCalc = new CorrelationCalculator(dataX, dataY)
    corCalc.doCorrelationCalculate()
    let lineCalc = new LinearRegressionCalculator(dataX, dataY)
    lineCalc.doLinearRegressionCalculate()
    response.write(JSON.stringify({
      success: true,
      result: {
        rxy: corCalc.rxy,
        r2: corCalc.r2,
        beta0: lineCalc.beta0,
        beta1: lineCalc.beta1
      }
    }))
    response.end()
  }

  static getValidList (listStr) {
    listStr = listStr || ''
    return listStr.trim(', ').split(/[, ]+/).map((num) => +num)
  }
}

module.exports = Api
