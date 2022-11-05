const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const testCase = require("./controller/testcase");
const testCaseDetail = require("./controller/testcasedetail");

function initDB() {
  mongoose.connect(
    "mongodb://localhost:27017"
    // {
    //   user: "root", // 账号
    //   pass: "Elitesland123", // 密码
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  );
}
initDB();

app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use("/api/testcase", testCase.router);
app.use("/api/testcasedetail", testCaseDetail.router);
//监听端口
app.listen(8081, (err) => {
  if (err) {
    console.log(err);
    return null;
  }
  return console.log("starting");
});