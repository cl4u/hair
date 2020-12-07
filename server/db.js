/*
 * @Description: 连接数据库的配置
 * @Author: rk
 * @Date: 2020-12-03 09:30:30
 */
// db.js
// 数据库连接配置
module.exports = {
  mysql: {
    host: "localhost", // 新建数据库连接时的 主机名或ID地址 内容
    user: "root",
    password: "",
    database: "apitest", // 数据库名
    port: "3306"
  }
}