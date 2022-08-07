const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Home Page 1')
})

app.get('/about', (req, res) => {
    res.status(200).send(' About Page ')
})

app.all('*', (req, res) => {
    res.status(404).send('<h1> Resource Not found</h1>')
})

app.listen(5000, () => {
    console.log('Server is listening on Port 5000')
})

// HTTP METHODS
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
