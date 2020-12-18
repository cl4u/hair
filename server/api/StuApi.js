/*
 * @Description: 接口，对应数据简单的增、删、改、查
 * @Author: rk
 * @Date: 2020-12-03 09:30:18
 */
const models = require('../db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../sqlMap');
// 连接数据库
const conn = mysql.createConnection(models.mysql);
conn.connect();
const jsonWrite = function (res, ret) {
  if (typeof ret == 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 接口：增加信息
router.post('/addMember', (req, res) => {
  const sql = $sql.Stu.add
  const params = req.body
  console.log("添加", params);
  conn.query(sql,[params.member_name, params.telephone, params.balance,params.date],function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：查询全部
router.post('/search', (req, res) => {
  let sql = ''
  const params = req.body
  let obj = {}
  console.log(params);
  if (params.telephone) {
    obj.telephone = params.telephone
    sql = $sql.Stu.search
  } else {
    sql = $sql.Stu.show
    obj.telephone = ''
  }
  conn.query(sql, [obj.telephone], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：修改信息
router.post('/updateStu', (req, res) => {
  const sql = $sql.Stu.update
  const params = req.body
  console.log('修改', params)
  conn.query(sql, [params.telephone, params.balance, params.member_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：删除信息
router.post('/delStu', (req, res) => {
  const sql = $sql.Stu.del
  const params = req.body
  console.log('删除', params)
  conn.query(sql, [params.member_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：充值
router.post('/charge', (req, res) => {
  const sql = $sql.Stu.chargeUpdate
  const params = req.body
  console.log('修改', params)
  conn.query(sql, [params.recharge_amount, params.member_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：扣款
router.post('/deductibles', (req, res) => {
  const sql = $sql.Stu.deductiblesUpdate
  const params = req.body
  console.log('修改', params)
  conn.query(sql, [params.deductibles, params.type, params.date, params.member_id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 接口：登录
router.post('/login', (req, res) => {
  const sql = $sql.Stu.login
  const params = req.body
  conn.query(sql, [params.account, params.password], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router;