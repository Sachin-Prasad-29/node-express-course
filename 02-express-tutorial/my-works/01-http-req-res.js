const http = require('http') //http is built in module

// Createserver takes callback function which gets called every time when user hits the server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1> Home Page </h1>')
    res.end()

    // It is always important to incluede response.end()
    // This method signals to the server that all the reponse headers and body have been set
    // That server should consider this message complete .This method response.end(), Must be called on each response
})

server.listen(5000) // IN 5000 port we are listening for the req
