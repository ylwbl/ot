const jwt = require("jsonwebtoken");
const screat = "Eliteslandylwbl";
function createToken(payload) {
  //产生token
  payload.currentTime = Date.now(); //创建时间
  //可加其他字段
  return jwt.sign(payload, screat, { expiresIn: 7200 }); //设置过期时间7200s
}

//验证token
function checkToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, screat, (err, data) => {
      if (err) reject({
        message: "token 验证失败"
      });
      else resolve(data);
    });
  });
}

module.exports = {
  createToken,
  checkToken
};
