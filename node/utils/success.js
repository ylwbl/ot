function getSuccess(success) {
    let res = {
        success: true,
        code: 200,
        status: 200,
        msg: '操作成功',
    }
    if(success && success.message) {
        res.msg = success.message
    }
    if(success && success.data) {
        res.data = success.data
    }
    return res
}

module.exports = getSuccess