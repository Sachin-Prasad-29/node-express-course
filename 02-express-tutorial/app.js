const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

// static assets
app.use(express.static('./methods-public')); // built in middleware

//parse form  data this middleware get the form data sended as Post in req.body object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/login', auth);  //middleware for login

app.use('/api/people', people);    // middleware for people

app.listen(5000, () => {
    console.log('Server is listening at localhost/5000');
});
