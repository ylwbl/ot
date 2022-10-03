var express = require('express');
var router = express.Router();
const {Wechat} = require('wechat-jssdk');
/* GET users listing. */
router.get('/', async (req, res, next) => {
  //从params中取出redirect uri
  let wechatConfig = {
    "wechatRedirectUrl": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc33ca3cce4ca0daa&redirect_uri=https://www.azurecube.net/wechat&response_type=code&scope=snsapi_base",
    //"wechatToken": "wechat_token", //not necessary required
    "appId": "wxc33ca3cce4ca0daa",
    "appSecret": "fe7635db94be2597fcb5205af0797d26", 
    
    //mini program config
  }
  const wx = new Wechat(wechatConfig);
  wx.jssdk.getSignature(req.query.url).then(signatureData => {
    console.log(signatureData)
    res.json(signatureData);
  }).catch(
    err => {
      res.json(err)
    }
  );
 
  // let a = {account: "1144951039@qq.com", password: "cy11449CY", type: "warframe", email: "1144951039@qq.com", mobile: 17805804790, remark: ""};
  // res.send(a);
});

router.post('/', function(req, res, next){
  
  
})

module.exports = router;