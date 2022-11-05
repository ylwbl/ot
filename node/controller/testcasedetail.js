const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const getErrors = require("../utils/error");
const getSuccess = require("../utils/success");
const { formatQuery } = require("../utils/common");

const TestCaseDetail = mongoose.model(
  "TestCaseDetail",
  new mongoose.Schema({
    testcase: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["ADD", "UPDATE", "DELETE"]
    },
    key: {
      type: String,
      required: true
    },
    value: {
      type: String,  
      required: true
    },
    updatePerson: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      default: 1
    }
  })
);
router.get("/id/:id", (req, res) => {
  TestCaseDetail.findById(req.params.id, (err, ret) => {
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
    TestCaseDetail.updateOne({ _id: req.body._id }, req.body, (err, ret) => {
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
    TestCaseDetail.findOne({ name: req.body.name }, (err, ret) => {
      if (!ret) {
        const vo = new TestCaseDetail(req.body);
        vo.save((saveErr, saveRet) => {
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
          getErrors(500, { message: `测试用例名称${req.body.name}已经存在` })
        );
      }
    });
  }
});
router.post("/search", (req, res) => {
  const data = req.body;
  TestCaseDetail.find()
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
              result: doc
            }
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
  TestCaseDetail
};
