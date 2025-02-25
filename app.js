const path = require('path')
const fs = require('fs')

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');

// const connectDB = require('./server/config/db')

const app = express();
const PORT = process.env.PORT || 8080

// process.env.PORT

// CONNECT TO DB
// connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))


// Template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');
app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App Listening on port ${PORT}`);
})