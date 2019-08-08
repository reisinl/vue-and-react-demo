const FileOperation = require('./fileOperation.js')

class Start {
  constructor (iArgs) {
    this.args = iArgs
  }
  doArgsCheck () {
    if (this.args.length !== 4) {
      console.log('The args are not correct. Please input 2 data files')
      return false
    }
    return true
  }

  startCalculate () {
    if (!this.doArgsCheck()) {
      return
    }

    let fileOp = new FileOperation(this.args[2], this.args[3])
    fileOp.calculateWriteFile()
  }
}

(new Start(process.argv)).startCalculate()
