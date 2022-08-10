const express = require('express')
const app = express()
const { products } = require('./data.js') //importing the json data

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res) => {
    const newProduct = products.map((product) => {
        const { name, id, price, image } = product
        return { name, id, price, image } // here we will select the limited product
    })
    res.json(newProduct)
})

app.get('/api/products/:productId', (req, res) => {
    //console.log(req.params)
    const { productId } = req.params
    const singleProduct = products.find((product) => product.id === Number(productId))
    // console.log(singleProduct);
    if (!singleProduct) {
        return res.status(404).send('Product Does Not Exist')
    }
    res.json(singleProduct)
})

// Here from the brower we will able to get the value of productId and review Id as string
app.get('/api/products/:productId/reviews/:reviewId',(req,res) => {
  console.log(req.params);
  res.send('Hello world');
})

app.listen(5000, () => {
    console.log('listening on Port 5000...')
})
