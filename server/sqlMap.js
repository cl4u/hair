/*
 * @Description: 连接到数据库后，我们就要对数据进行sql语句操作，在sqlMap.js里配置
 * @Author: rk
 * @Date: 2020-12-03 09:30:55
 */
const sqlMap = {
  Stu: {
    add: "insert into member(member_name,telephone,balance,date) values (?,?,?,0)",
    show: "select * from member",
    del: "delete from member where member_id = ?",
    update: "update member set telephone = ?,balance = ? where member_id = ?",
    chargeUpdate: "update member set balance = balance + ? where member_id = ?",
    deductiblesUpdate: "update member set balance = balance - ?, type = ?, date = ? where member_id = ?",
    search: "select * from member where telephone = ?",
    login: "select account,password from user where account = ?  and password = ?"
  }
}
module.exports = sqlMap;