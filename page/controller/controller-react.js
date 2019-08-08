class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readXResult: [],
      readYResult: [],
      isShow: false,
      rxy: 0,
      r2: 0,
      beta0: 0,
      beta1: 0,
      isDisabled: false,
      errMsg: ''
    }
  }

 readFile = (e)=>{
      this.setState({errMsg:''})
      if (e.target.files.length !== 2) {
        this.setState({errMsg:'Please select 2 different files'})
        return
      }
      let fileX = e.target.files[0]
      let fileY = e.target.files[1]

      if (fileX.name === fileY.name) {
        this.setState({errMsg:'Please select 2 different files'})
        return
      }

      let fileXReader = new FileReader()
      fileXReader.readAsText(fileX)
      fileXReader.onload =(e)=> {
        this.setState({readXResult: e.target.result.split('\r\n')})
      }

      let fileYReader = new FileReader()
      fileYReader.readAsText(fileY)
      fileYReader.onload = (e) => {
        this.setState({readYResult: e.target.result.split('\r\n')})
      }
      
      this.setState({isDisabled :false, isShow: false})
    }

  calcResult = () => {
    this.setState({errMsg:''})
    if (this.state.readXResult.length === 0 || this.state.readYResult.length === 0) {
      this.setState({errMsg:'Please select 2 different files'})
      return
    }

    let corCalc = new CorrelationCalculator(this.state.readXResult, this.state.readYResult)
    corCalc.doCorrelationCalculate()
    let lineCalc = new LinearRegressionCalculator(this.state.readXResult, this.state.readYResult)
    lineCalc.doLinearRegressionCalculate()

    this.setState({
      isShow: true,
      rxy: corCalc.rxy.toFixed(9),
      r2: corCalc.r2.toFixed(9),
      beta0: lineCalc.beta0.toFixed(9),
      beta1: lineCalc.beta1.toFixed(9),
      isDisabled: true
    })
  }

  render() {
    
    return (
      <div>
        <div id="fileReader">
          <input type="file" className="btn btn-warning" onChange={this.readFile} multiple/>
        </div>
        
        <div id="result">
          <button id="btn-calc" className="btn btn-primary" onClick={this.calcResult} disabled={this.state.isDisabled} data-toggle="tooltip" data-placement="right" title="Click here to calculate">Click to show the result</button>
          <div class="alert alert-primary cal-info" role="alert">
            Choose two files, and click the "click to show the result" button to calculate the correaltion and the Linear Regression
          </div>
          {this.state.errMsg != '' &&
            <div class="alert alert-danger cal-info" role="alert">
              {this.state.errMsg }
            </div>
          }
          
          {this.state.isShow &&
            <table className="table table-striped table-sm table-bordered">
                  <tbody>
                    <tr>
                      <th>Data X</th>
                      <th>Data Y</th>
                    </tr>
                    {this.state.readXResult.map((item,index, arr)=>{
                      return <tr key={index}>
                          <td>{this.state.readXResult[index]}</td>
                          <td>{this.state.readYResult[index]}</td>
                      </tr>
                      })

                    }

                    
                    
                  </tbody>
              </table>
          }
          {this.state.isShow &&
              <table className="table table-striped table-sm table-bordered ">
                <tbody>
                    <tr>
                      <th>Rxy</th>
                      <th>R2</th>
                      <th>beta0</th>
                      <th>beta1</th>
                    </tr>
                    <tr>
                        <td>{this.state.rxy}</td>
                        <td>{this.state.r2}</td>
                        <td>{this.state.beta0}</td>
                        <td>{this.state.beta1}</td>
                    </tr>
                </tbody>
              </table>
          }
          </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
