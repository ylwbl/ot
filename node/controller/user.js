const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const getErrors = require("../utils/error");
const getSuccess = require("../utils/success");
const authUtils = require("../utils/auth");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    nickname: String,
    email: {
      type: String,
      required: true
    },
    enabled: Boolean
  })
);
router.get("/findIdOne/:id", (req, res) => {
  User.findById(req.params.id, (err, ret) => {
    if (err) {
      res.json(getErrors(404, err));
    } else {
      res.json(ret);
    }
  });
});
// 有id为更新,无id为新增
router.post("/", (req, res) => {
  if (req.body._id) {
    User.updateOne({ _id: req.body._id }, req.body, (err, ret) => {
      if (err) {
        res.json(getErrors(500, err));
      } else {
        res.json(
          getSuccess({
            message: "更新成功"
          })
        );
      }
    });
  } else {
    User.findOne({ username: req.body.username }, (err, ret) => {
      if (!ret) {
        const userVo = new User(req.body);
        userVo.save((saveErr, saveRet) => {
          if (saveErr) {
            res.json(getErrors(500, saveRet));
          } else {
            res.json(
              getSuccess({
                data: saveRet._id
              })
            );
          }
        });
      } else {
        res.send(
          getErrors(500, { message: `用户名${req.body.username}已经存在` })
        );
      }
    });
  }
});
router.post("/search", (req, res) => {
  const data = req.body;
  User.countDocuments(data, (err, count) => {
    if (err) {
      res.json(getErrors(500, err));
    } else {
      User.find(data)
        .skip((data.current || 1 - 1) * data.size)
        .limit(parseInt(data.size || 20))
        .exec((err, doc) => {
          if (err) {
            res.json(getErrors(500, err));
          } else {
            res.json(
              getSuccess({
                data: {
                  total: count,
                  result: doc
                }
              })
            );
          }
        });
    }
  });
});

router.put("/trigger/:id", (req, res) => {
  User.findById({ _id: req.params.id }, (err, ret) => {
    if (err) {
      res.json(getErrors(404));
    } else {
      User.updateOne(
        { _id: req.params.id },
        { enabled: !ret.enabled },
        (triggerErr) => {
          if (triggerErr) {
            res.json(getErrors(500, triggerErr));
          } else {
            res.json(
              getSuccess({
                message: "更新成功"
              })
            );
          }
        }
      );
    }
  });
});
router.delete("/:id", (req, res) => {
  res.send("删除用户接口, 暂不开放");
});
router.put("/changePwd", async (req, res) => {
  if (!req.cookies || !req.cookies.Authorization) {
    res.json(getErrors(500, { message: "没有权限调用此接口" }));
  } else {
    const data = await authUtils.checkToken(req.cookies.Authorization).catch(e => {
      res.json(getErrors(500, e))
    });
    if (data) {
      User.findOne({ username: data.username }, (err, ret) => {
        if (!ret) {
          res.json(getErrors(404));
        } else {
          if (ret.password === req.body.pwd) {
            User.updateOne(
              {
                username: data.username
              },
              { password: req.body.newPwd },
              (triggerErr) => {
                if (triggerErr) {
                  res.json(getErrors(500, triggerErr));
                } else {
                  res.json(
                    getSuccess({
                      message: "更新密码成功"
                    })
                  );
                }
              }
            );
          } else {
            res.json(getErrors(500, { message: "旧密码错误" }));
          }
        }
      });
    }
  }
});
module.exports = {
  router,
  User
};
