const api = require('./server-api.js')
const http = require('http')
const url = require('url')
const path = require('path')
const qs = require('querystring')
const fs = require('fs')

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
}

class HttpServer {
  startServer () {
    http.createServer((request, response) => {
      // Parse the request containing file name
      let urlName = url.parse(request.url).pathname

      // Get the extension of the required file
      const ext = path.parse(urlName).ext

      // the request from the web page
      if (!ext && (urlName.substr(0, 5) === '/api/')) {
        let content = ''
        if (request.method === 'POST') {
          request.on('data', function (data) {
            content += data
          })

          request.on('end', function () {
            let iRequest = qs.parse(content)
            api.makeResponse(iRequest, response)
          })
        }
      } else {
        var fileName = urlName.substr(1)
        fs.readFile(fileName, function (err, data) {
          if (err) {
            console.log(err)

            response.writeHead(404, {
              'Content-Type': 'text/html'
            })
            response.end(`File ${urlName} not found!`)
            return
          }

          response.writeHead(200, {
            'Content-Type': mimeType[ext]
          })

          // Write the content of the file to response body
          response.write(data)

          // Send the response body
          response.end()
        })
      }
    }).listen(8788)
    console.log(`Server is running at localhost:8788`)
  }
}

new HttpServer().startServer()
