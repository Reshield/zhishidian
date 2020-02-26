var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var addRouter = require('./routes/add');
var classRouter = require('./routes/class');
var questionRouter = require('./routes/question');
var shareRouter = require('./routes/share');
var commentRouter = require('./routes/comment');

var app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, 'public'))); //暴露 public 里面的静态文件
app.use('/static', express.static(path.join(__dirname, './static'))); //暴露 public 里面的静态文件
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')
app.engine('html', require('express-art-template'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser, urlencodedParser)

app.use(session({ //配置 Session
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/add', addRouter);
app.use('/class', classRouter);
app.use('/question', questionRouter);
app.use('/share', shareRouter);
app.use('/comment', commentRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error.html');
});

module.exports = app;