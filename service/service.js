const requestTis = require('./requestUtil');
const apiConstant = require('./serviceNameList');
module.exports = {
    handleLogin(parameters){
        // let url = apiConstant.
        return requestTis(url,parameters);
    },
    forgetPassword (parameters) {
        return requestTis(url,parameters);
    },
    register (parameters) {
        return requestTis(url,parameters);
    },
    checkUserId(parameters) {
        return requestTis(url,parameters);
    },
    changePassword(parameters) {
        return requestTis(url,parameters);
    },
    roadInfoGeneral(parameters) {
        return requestTis(url,parameters);
    },
    roadEmergencyAll(parameters) {
        return requestTis(url,parameters);
    }
};