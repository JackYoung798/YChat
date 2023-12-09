//连接mysql数据库
const mysql = {
    host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'root',
	database: 'chat',
	connectTimeout: 5000
}

module.exports = mysql;