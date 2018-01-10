var express = require('express');
var router = express.Router();

var mysql = require('./../database');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {message: ''});
});

// 登录页面
router.post('/login', function (req, res, next) {

    var name = req.body.name;
    var password = req.body.password;

    var query = 'SELECT * FROM blog WHERE authorName=' + mysql.escape(name) + ' AND authorPassword=' + mysql.escape(password);
    mysql.query(query, function (err, rows, fields) {
        if (err){
            console.log(err);
            return;
        }
        var user = rows[0];
        if (!user){
            res.render('login', {message: '用户名或者密码错误！'});
            return;
        }
        // req.session.userSign = true;
        // req.session.userId = user.authorID;
        res.redirect('/');
    })
});

module.exports = router;
