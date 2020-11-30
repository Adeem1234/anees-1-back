const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');



//config command to use the dotenv 
const PORT = 5000 || process.env.PORT;
// 
const app = express();
app.use(fileUpload());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static('./public'));
// passport Config
require('./config/passport')(passport);
// database Config
const DB = require('./config/keys').MongoURI;
console.log(DB)
mongoose.connect(DB, {
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connected');
}).catch(error => {
    console.log(error);
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('view cache', false);

// Middleware fro using cross-orgin data transfer
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_ADDRESS, "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// passport Middlewares	
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global Variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
//Route Middlewares
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
// 
app.listen(PORT, () => {
    console.log('Server Up & Running on ', PORT);
});