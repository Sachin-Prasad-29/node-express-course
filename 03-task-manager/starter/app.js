const express = require('express');
const app = express();
const tasks = require('./routes/tasks.route');
const { connectDB } = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
// middleware for geting the json data from frontend
app.use(express.json()); // so by using this the data from the front can be accessed from the req.body otherwise we will not able to access that data

// routes
//setting the middleware for the task router
app.use('/api/v1/tasks', tasks);

// custom 404 page (middleware)
app.use(notFound);

// custom errorHandlerMiddleware for handling all the errors (middleware)
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();
