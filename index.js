require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use("/", require('./router/index'));


app.listen(port, (error) => {
    if (error) { console.log('Error starting the server:', error); return; }
    console.log('Server is running on port', port);
})
