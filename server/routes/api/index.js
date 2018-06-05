var express = require('express');
var apiRouter = express.Router();

var book =require('./book'),
    user = require('./user'),
    comment = require('./comment');

apiRouter.get('*',function(req, res, next) {
    var allowOrigin=["http://localhost:8090/","http://127.0.0.1:8090/","http://172.18.84.28:8017"];
    var reqOrigin ='http://' + req.header("referer");
    var isAllow=false;
  
    for(var i=0,len=allowOrigin.length;i<len;i++){
      if(reqOrigin !=undefined && reqOrigin.indexOf(allowOrigin[i])>-1){
        isAllow=true;
        break;
      }
    }
    if(reqOrigin !=undefined && isAllow){
        // 允许所有域的请求 
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
        next();
    }else{
      res.writeHead(403,{'Content-Type': 'text/plain'});
      res.end();
    }
});


apiRouter
    .use('/book',book)
    .use('/user',user)
    .use('/comment',comment)

//错误处理
apiRouter.use(function(err, req, res, next) {
    // console.error(11111111111);
    console.log('err',err)
    res.status(500).send(err);
});

module.exports = apiRouter;

