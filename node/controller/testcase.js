const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const getErrors = require("../utils/error");
const getSuccess = require("../utils/success");
const { formatQuery } = require("../utils/common");
const TestCase = mongoose.model(
  "TestCase",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    schema: {
      type: String,
      required: true,
    },
  })
);
router.get("/id/:id", (req, res) => {
  TestCase.findById(req.params.id, (err, ret) => {
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
    TestCase.updateOne({ _id: req.body._id }, req.body, (err, ret) => {
      if (err) {
        res.json(getErrors(500, err));
      } else {
        res.json(
          getSuccess({
            message: "更新成功",
          })
        );
      }
    });
  } else {
    TestCase.findOne({ name: req.body.name }, (err, ret) => {
      if (!ret) {
        const vo = new TestCase(req.body);
        vo.save((saveErr, saveRet) => {
          if (saveErr) {
            res.json(getErrors(500, saveRet));
          } else {
            res.json(
              getSuccess({
                data: saveRet._id,
              })
            );
          }
        });
      } else {
        res.send(
          getErrors(500, { message: `测试用例名称${req.body.name}已经存在` })
        );
      }
    });
  }
});
router.post("/search", (req, res) => {
  const data = req.body;
  TestCase.find()
    .skip(((data.current || 1) - 1) * data.size)
    .limit(parseInt(data.size || 20))
    .exec((err, doc) => {
      if (err) {
        res.json(getErrors(500, err));
      } else {
        res.json(
          getSuccess({
            data: {
              total: doc.length,
              result: doc,
            },
          })
        );
      }
    });
});

router.delete("/:id", (req, res) => {
  res.send("删除用户接口, 暂不开放");
});
module.exports = {
  router,
  TestCase,
};
