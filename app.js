require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
const path = require('path');
const db = require('./config/mongoose-connection');
const product = require('./models/product');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const expressSession = require('express-session');
const flash = require('connect-flash');
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
app.use("/", indexRouter)


// app.get('/', (req, res) => {
//     res.send('Hello World How are You !');
// });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})