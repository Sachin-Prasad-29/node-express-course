const express = require('express')
const path = require('path') // buit in module
const app = express()

// here all the css js and logo file get loaded from public folder
//setup static and middleware
// app.use is for seting up the middleware
// static asset are the asset which the server need not need to change it
// just put those file one folder and our express will take care of those file
// it will create path and put those recourses whereever they required
app.use(express.static('./public'))

app.get('/', (req, res) => {
    const loc = path.resolve(__dirname, './navbar-app/index.html')
    res.status(200).sendFile(loc)
})

app.get('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(5000, () => {
    console.log('Server is Listening at port localhost:5000')
})
