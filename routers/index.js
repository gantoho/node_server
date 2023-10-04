// 使用express提供的路由模块
const express = require('express'),
      router = express.Router(),
      userCtrl = require('../controller/index')

// 拦截请求 这里不用传入request, response 因为express会自动将这两个参数传入
router.post('/login', userCtrl.userLogin); // 登录
router.post('/register', userCtrl.userRegister); // 注册
router.post('/getUserData', userCtrl.userUserList); // 用户列表
router.get('/getContentData', userCtrl.getContentData); // 获取内容列表
router.post('/setContentData', userCtrl.setContentData); // 添加内容列表
router.delete('/deleteContent', userCtrl.deleteContent); // 删除内容列表

module.exports = router