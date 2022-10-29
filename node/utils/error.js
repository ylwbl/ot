function getErrors(code, error) {
    let res = {
        success: false,
        code,
        msg: '',
    }
    
    if(code === 404) {
        res.msg = 'Not Found'
    }

    switch(code) {
        case 404: 
            res.msg = 'Not Found';
        break
        default: 
            res.msg = 'Server Error'
        break;
    }
    if(error && error.message) {
        res.msg = error.message
    }
    return res
}

module.exports = getErrors