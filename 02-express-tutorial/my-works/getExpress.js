// Express middleWare are the function which execute during the request to the server.
// Each Middleware function  has access to req and res object and when its come to the functionality its sky is the limit
// Middle ware is every where is the express
// Middle ware is heart and sole of the express

const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./logger');
const authorize = require('./authorize');

// Here req, res, next will get supplied by express when logger is added as middleware
// when we have a middleware we must must include next
// here logger is a middleware function

// req => middleware => res
// This is the manual way of adding the middleware
//app.get('/', logger, (req, res) => {

//1. use vs route
// 2. options - our own /express/ third party

//Middleware implementation
//  Always remmver middle ware order matters therefro always put them in the top
//app.use([logger, authorize]); // here logger is the callback function // our own middleware

//app.user(express.static('./public)) // express build in middleware

app.use(morgan('tiny'));  // third party middleware

//app.use (path,callback)
//mounts the apecified middleware function or function ata the specific path: the middleware
// fucntion is executed when the base of the requested path matches path

app.get('/', (req, res) => {
    res.send('<h1>HOME</h1>');
});
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
});
app.get('/api/product', (req, res) => {
    res.send('<h1>Products</h1>');
});
app.get('/api/item', (req, res) => {
    console.log(req.user);
    res.send('<h1>Items</h1>');
});
app.listen(5000, () => {
    console.log('Server is listening at localhost/5000');
});
