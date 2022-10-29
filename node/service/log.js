const log = require("../controller/log");

async function add(data) {
  const logVo = new log.Log(data);
  logVo.save((err, ret) => {
    if (err) {
      return err;
    } else {
      return true;
    }
  });
}
module.exports = {
  add
};
