const path = require('path')
const fs = require('fs');

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session')

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelper');

// const connectDB = require('./server/config/db')

const app = express();
const PORT = process.env.PORT || 8080

// process.env.PORT

// CONNECT TO DB
connectDB();

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'talksolutions',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}))


// Template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App Listening on port ${PORT}`);
})