import {validatePasswordRule2,validatePasswordRule3} from './loginUtils';

export function accountRule (rule, value, callback) {
    const error = '不得包含特殊字符',
        error1 = '长度在6-26位之间',
        error2 = '需要包含大小写字母和一个数字',
        error3 = '必填项不得为空';
    let payload = this,
        defaultMessage = 'password validate failed',
        errorMessage;
    if (!value.length) {
        errorMessage = new Error(error3 || defaultMessage);
    } else if(/\s/.test(value)|| !validatePasswordRule2(value)){
        errorMessage = new Error(error || defaultMessage);
    }else if(!validatePasswordRule3(value)){
        errorMessage = new Error(error2 || defaultMessage);
    }else if(!/^.{6,26}$/.test(value)){
        errorMessage = new Error(error1|| defaultMessage);
    }
    callback(errorMessage);
}

export function passwordRule1(rule, value, callback) {
    const error = '不得包含特殊字符',
          error1 = '长度在6-16位之间',
          error2 = '需要包含大小写字母和一个数字',
          error3 = '必填项不得为空';
    let payload = this,
        defaultMessage = 'password validate failed',
        errorMessage;
    if (!value.length) {
        errorMessage = new Error(error3 || defaultMessage);
    } else if(/\s/.test(value)|| !validatePasswordRule2(value)){
        errorMessage = new Error(error || defaultMessage);
    }else if(!validatePasswordRule3(value)){
        errorMessage = new Error(error2 || defaultMessage);
    }else if(!/^.{6,16}$/.test(value)){
        errorMessage = new Error(error1|| defaultMessage);
    }
    callback(errorMessage);
}

export function confirmPassRule(rule,value, callback) {
    const errorMessage = '两次密码不一致';
    let payload = this,
        defaultMessage = 'password validate failed',
        error,
        newPassword = payload.newPassword();
    if(newPassword !== value) {
        error = new Error( errorMessage|| defaultMessage);
    }
    callback(error);
}