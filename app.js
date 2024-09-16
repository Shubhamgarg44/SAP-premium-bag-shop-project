const express = require('express')
const router = express.Router()
const db = require('./config/mongoose-connections')
const app = express();
const path = require('path')
const cookieParser = require('cookie-parser')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')
const index = require('./routes/index');
require("dotenv").config()
console.log("EXPRESS_SECRET_KEY:", process.env.EXPRESS_SECRET_KEY);

const expressSession = require('express-session')
const flash = require("connect-flash")

app.use(
    expressSession({
        secret: process.env.JWT_KEY,  // Secret key for session encryption
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));



app.use('/', index);
app.use('/owners', ownersRouter)
app.use('/users', usersRouter)
app.use('/owners/product', productsRouter)


app.listen(3000);


