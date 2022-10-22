const pg = require('pg');

const pgConfig = {
    user: 'postgres',           // 数据库用户名
    database: 'postgres',       // 数据库
    password: 'Passw0rd',       // 数据库密码
    host: '127.0.0.1',        // 数据库所在IP
    port: '5432'                // 连接端口
};
const pool = new pg.Pool(pgConfig);
module.exports = pool;