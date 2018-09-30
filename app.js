const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const index = require('./routes/index');
const api = require('./routes/api');
const authenticate = require('./routes/authenticate')(passport);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dic2');
const app = express();

//to redirect non-www to www and https
function wwwHttpsRedirect(req, res, next) {
    if (req.headers.host.slice(0, 4) !== 'www.' || req.protocol === 'http') {
        if (req.headers.host.slice(0, 4) !== 'www.'){
            var newHost = 'www.' + req.headers.host;
        } else {
            var newHost = req.headers.host;
        }
        return res.redirect(301, 'https' + '://' + newHost + req.originalUrl);
    }
    next();
}

//this terrible line causes non-green https on browsers!!!
//app.set('trust proxy', true);
if (process.env.IS_LOCALHOST === 'no'){
    app.use(wwwHttpsRedirect);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

const MongoStore = require('connect-mongo/es5')(session);

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection:mongoose.connection,
            ttl: 14 * 24 * 60 * 60
    },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', authenticate);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//// Initialize Passport
const initPassport = require('./lib/passport-init');
initPassport(passport);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
