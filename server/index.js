var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var config = require('./config/default'),
    cors = require('cors'),
    http = require('http');

var apiRouter = require('./routes/api/index');
var app = express();

var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// io.on('connection', function(socket){ 
//   /* … */ 
//   console.log('io')
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log('my other event',data);
//   });
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 跨域
app.use(cors({
  credentials: true
}));

app.use(cookieParser());
// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  }),
  resave: false,
  saveUninitialized: true
}));

// 添加模板必需的变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// uncomment after placing your favicon in /public 
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
// 静态资源访问
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',apiRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// server.listen(3000);

module.exports = app;
