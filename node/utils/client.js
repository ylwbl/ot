var getClientIp = function (req) {
    var ipStr = req.ip || '';
    var ipReg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipStr.split(',').length > 0) {
        ipStr = ipStr.split(',')[0]
    }
    var ip = ipReg.exec(ipStr);
    return ip[0];
};
module.exports = {
    getClientIp
}