// 定义数据连接数据
const mysqlBase = {
  /* 线上数据库start */
  // host: '127.0.0.1', // 数据库IP
  // port: '3306', // 数据库端口号
  // user: 'demo178', // 数据库用户名
  // password: '#Ganto615', // 数据库密码
  // database: 'demo178' // 连接哪个数据库
  /* 线上数据库stop */

  /* 本地数据库start */
  host: '127.0.0.1', // 数据库IP
  port: '3306', // 数据库端口号
  user: 'root', // 数据库用户名
  password: 'root', // 数据库密码
  database: 'demo178' // 连接哪个数据库
  /* 本地数据库stop */
}

const mysqlModule = require('mysql'); // 导入mysql模块
module.exports = {
  userLogin(request, response){
    console.log(request.body);
    let {username, pwd} = request.body;
    /**
     * 连接数据库
     */
    // 1. 通过mysql模块创建数据连接
    const db = mysqlModule.createConnection({
      ...mysqlBase
    })
    // 2.打开数据库连接
    db.connect();
    // 3. 对数据库进行操作
    // 参数：sql语句, 参数, 操作回调函数(错误信息, 正确信息)
    db.query("select uxinxi, uid from t_user where uname = ? and pwd = ?", [username, pwd], (err, data) => {
      console.log(data)
      if(data.length !== 0) {
        response.send(data[0]);
        return;
      }else{
        response.send('登录失败');
      }
    });
    // 4. 关闭数据库连接
    db.end();
  },
  userRegister(request, response){
    console.log(request.body);
    let {username, pwd, uxinxi} = request.body;
    /**
     * 连接数据库
     */
    // 1. 通过mysql模块创建数据连接
    const db = mysqlModule.createConnection({
      ...mysqlBase
    })
    // 2.打开数据库连接
    db.connect();
    // 3. 对数据库进行操作
    // 参数：sql语句, 参数, 操作回调函数(错误信息, 正确信息)
    db.query("insert into t_user values (null, ?, ?, ?)", [username, pwd, uxinxi], (err, data) => {
      if(data!=undefined) {
        response.send('注册成功');
      }else{
        response.send('你注册失败了');
      }
    });
    // 4. 关闭数据库连接
    db.end();
    
  },
  userUserList(request, response) {
    let {uid} = request.body;
    /**
     * 连接数据库
     */
    // 1. 通过mysql模块创建数据连接
    const db = mysqlModule.createConnection({
      ...mysqlBase
    })
    // 2.打开数据库连接
    db.connect();
    // 3. 对数据库进行操作
    // 参数：sql语句, 参数, 操作回调函数(错误信息, 正确信息)
    if(uid) {
      db.query("SELECT `uid`, `uname`, `uxinxi` FROM `t_user` WHERE uid = ?", [uid], (err, data) => {
        response.send(data);
      });
    }else{
      db.query("SELECT `uid`, `uname`, `uxinxi` FROM `t_user`", [], (err, data) => {
        response.send(data);
      });
    }
    // 4. 关闭数据库连接
    db.end();
  },
  getContentData(request, response) {
    /**
     * 连接数据库
     */
    // 1. 通过mysql模块创建数据连接
    const db = mysqlModule.createConnection({
      ...mysqlBase
    })
    // 2.打开数据库连接
    db.connect();
    // 3. 对数据库进行操作
    // 参数：sql语句, 参数, 操作回调函数(错误信息, 正确信息)
    db.query("SELECT * FROM `t_content` ORDER BY createDate DESC, id DESC", [], (err, data) => {
      response.send(data);
    });
    // 4. 关闭数据库连接
    db.end();
  },
  setContentData(request, response) {
    console.log(request.body);
    let {uid, content} = request.body;
    /**
     * 连接数据库
     */
    // 1. 通过mysql模块创建数据连接
    const db = mysqlModule.createConnection({
      ...mysqlBase
    })
    // 2.打开数据库连接
    db.connect();
    // 3. 对数据库进行操作
    // 参数：sql语句, 参数, 操作回调函数(错误信息, 正确信息)
    db.query("insert into t_content values (null, ?, ?, NOW())", [content, uid], (err, data) => {
      if(data!=undefined) {
        response.send('内容发布成功');
      }else{
        response.send('内容发布失败了');
      }
    });
    // 4. 关闭数据库连接
    db.end();
  },
  deleteContent(request, response) {
    console.log(request.query);
    let {id} = request.query;
    /**
     * 连接数据库
     */
    // 1. 通过mysql模块创建数据连接
    const db = mysqlModule.createConnection({
      ...mysqlBase
    })
    // 2.打开数据库连接
    db.connect();
    // 3. 对数据库进行操作
    // 参数：sql语句, 参数, 操作回调函数(错误信息, 正确信息)
    db.query("DELETE FROM t_content WHERE id=?", [id], (err, data) => {
      if(data!=undefined) {
        response.send('删除成功');
      }else{
        response.send('删除失败');
      }
    });
    // 4. 关闭数据库连接
    db.end();
  }
}