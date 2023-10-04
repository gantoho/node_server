// 导入express
const express = require('express'),
      logger = require('morgan'),
      route = require('./routers/index'),
      bodyParser = require('body-parser');
      


// 创建应用实例
const app = express();


// 处理跨域问题
app.all("*", function(request, response, next) {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    response.header('Access-Control-Allow-Origin', '*');
    // 允许header类型
    response.header('Access-Control-Allow-Headers', 'content-type');
    // 允许跨域的请求方式
    response.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS');
    
    if(request.method.toLowerCase() == 'options'){
        response.sendStatus(200); // 让options尝试请求快速结束
    }else{
        next();
    }
})

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // 将数据转换成json
//app.use(express.static(__dirname+"/src"));
app.use(route);




// 监听8091端口
app.listen('8091', () => {
  console.log('8091')
})