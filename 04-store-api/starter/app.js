require('dotenv').config();
//async errors
require('express-async-errors');
const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { connectDB } = require('./db/connect');
const productsRouter = require('./routes/products.route');

// middleware starts here
//standard middleware
app.use(express.json());

//routes middleware
app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Product route</a>');
});

// products route middleware
app.use('/api/v1/products', productsRouter);

// notfound and errorhandler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
// connecting to db
const start = async () => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening port ${port} ...`));
    } catch (error) {
        console.log(error);
    }
};

start();
