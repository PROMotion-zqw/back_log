var createError = require('http-errors');
var express = require('express');
var table = require("./libs/Schema")();
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer({dest: './uploads/'});

express.sta
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(upload.single('fl'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
var arr = [];

for (var i = 0; i < 100000; i++) {
	arr[i] = 'secret' + Math.random() * 1000;
}
app.use(cookieSession({
	name: 'session_id',
	keys: arr,
	maxAge: 4 * 60 * 60 * 1000
}))
app.use(express.static(path.join(__dirname, 'dist')));
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	//Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	// res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});
app.use(require('./routes/api')(table));
app.use(require('./routes/add_router')());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(8085, () => {
	console.log('http://localhost:8085');
})
