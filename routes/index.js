var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();


var mysql = require('./../database');


var app = express();

app.use(cookieParser());
app.use(session({
    secret: '1321321', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));

/* 首页路由 */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* 登陆页面路由 */
router.get('/login', function (req, res, next) {
    res.render('login', {message: ''});
});

// 登录页面
router.post('/login', function (req, res, next) {

    // 获取请求的用户名
    var name = req.body.name;
    // 获取请求的密码
    var password = req.body.password;
    // 查询数据库语句
    var query = 'SELECT * FROM blog WHERE authorName=' + 
                mysql.escape(name) + ' AND authorPassword=' + mysql.escape(password);
    mysql.query(query, function (err, rows, fields) {
        if (err){
            console.log(err);
            return;
        }
        var user = rows[0];
        if (!user){ // 如果不存在 就提示用户错误
            res.render('login', {message: '用户名或者密码错误！'});
            return;
        }

        // req.session.userSign = true;
        // req.session.userId = user.authorID;

        // 登陆成功 重定向页面
        res.redirect('/');
    })
});

module.exports = router;
