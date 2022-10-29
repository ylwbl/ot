const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const getErrors = require("../utils/error");
const getSuccess = require("../utils/success");
const Log = mongoose.model(
  "Log",
  new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
      type: String,
      required: true
    },
    loginTime: {
        type: Date,
        required: true
    },
    clientIp: String
  })
);

router.post("/search", (req, res) => {
  const data = req.body
  Log.countDocuments(data, (err, count) => {
    if(err) {
      res.json(getErrors(500, err))
    } else {
      Log.find(data).skip((data.current || 1 - 1) * data.size).limit(parseInt(data.size || 20)).exec((err, doc) => {
        if(err) {
          res.json(getErrors(500, err))
        } else {
          res.json(getSuccess({
            data: {
              total: count,
              result: doc
            }
          }))
        }
      })
    }
  })
});

module.exports = {
  Log,
  router
}