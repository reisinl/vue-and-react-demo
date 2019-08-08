var app = new Vue({
  el: '#fileReader',

  methods: {
    readFile: function (e) {
      calBtn.errMsg = ''
      if (e.target.files.length !== 2) {
        calBtn.errMsg = 'Please select 2 different files'
        return
      }
      let fileX = e.target.files[0]
      let fileY = e.target.files[1]

      if (fileX.name === fileY.name) {
        calBtn.errMsg = 'Please select 2 different files'
        return
      }

      let hidXVal = document.getElementById('hidden-xValue')
      this.readFiles(fileX, hidXVal)
      let hidYVal = document.getElementById('hidden-yValue')
      this.readFiles(fileY, hidYVal)
      calBtn.isDisabled = false
    },

    readFiles: function (file, target) {
      let fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = function (e) {
        target.value = e.target.result.split('\r\n')
      }
    }
  }
})

var calBtn = new Vue({
  el: '#result',
  data: {
    readXResult: [],
    readYResult: [],
    isShow: false,
    rxy: 0,
    r2: 0,
    beta0: 0,
    beta1: 0,
    isDisabled: false,
    errMsg: ''
  },
  methods: {
    calcResult () {
      calBtn.errMsg = ''
      let xVal = document.getElementById('hidden-xValue').value
      let yVal = document.getElementById('hidden-yValue').value

      if (xVal === '' || yVal === '') {
        calBtn.errMsg = 'Please select 2 different files'
        return
      }
      let xArr = xVal.split(',')
      let yArr = yVal.split(',')
      let data = {
        dataX: xArr.join(','),
        dataY: yArr.join(',')
      }
      data = Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')
      axios.post('/api/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        console.log(response)
        calBtn.readXResult = xArr
        calBtn.readYResult = yArr

        calBtn.isShow = true
        calBtn.rxy = response.data.result.rxy.toFixed(9)
        calBtn.r2 = response.data.result.r2.toFixed(9)
        calBtn.beta0 = response.data.result.beta0.toFixed(9)
        calBtn.beta1 = response.data.result.beta1.toFixed(9)
        calBtn.isDisabled = true
      })
    }

  }
})
