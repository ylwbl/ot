const express = require("express");
const cors = require('cors');

const router = express.Router();
const getErrors = require("../utils/error");
const getSuccess = require("../utils/success");
const user = require("./user");
const log = require("./log");
const auth = require('../utils/auth');
const client = require('../utils/client')
const logService = require('../service/log');
router.post("/login",cors(), async (req, res) => {
  user.User.findOne({ username: req.body.username }, (err, ret) => {
    if(!ret) {
      res.json(getErrors(500, {...err,message: err}))
    } else {
      if(req.body.password === ret.password) {
        logService.add({
          userId: ret._id,
          username: ret.username,
          loginTime: new Date(),
          clientIp: req.ip
        })
        res.cookie(`Authorization`, auth.createToken({username: req.body.username}))
        res.json(getSuccess({
          message: '登陆成功'
        }))
      } else {
        res.json(getErrors(500, {
          message: '密码错误'
        }))
      }
    }
  })
});
module.exports = {
  router
};
