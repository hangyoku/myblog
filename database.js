/**
 * Created by wdg01 on 2018/1/10.
 */
const mysql = require('mysql');
const config = require('./config');

/*链接数据库*/
const database = mysql.createConnection({
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database
});

database.connect(function (err) {
    if (err) {
        console.error('error connecting:' + err.stack);
    }
    console.log('connected as id ' + database.threadId);
});
module.exports = database;