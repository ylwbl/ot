var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let a = {a:1,b:2};
  res.send(a);
});

module.exports = router;
