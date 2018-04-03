/* 不得包含空格等不可见字符 */
export function validatePasswordRule1(str) {
    const reg = /\S+/
    return reg.test(str)
}
/* 不得包含各种特殊字符(特殊符号、emoji、中文) */
export function validatePasswordRule2(str) {
    const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
        regEmoji = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/im,
        regZh = /[\u4e00-\u9fa5]/im;
    return !(regEn.test(str)||regCn.test(str)|| regEmoji.test(str)||regZh.test(str))
}
/* 必须包含一个大写一个小写一个数字的密码组合 */
export function validatePasswordRule3(str) {
    const reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*).{3,}$/;
    return reg.test(str)
}
/* 密码长度6-26位 */
export function validatePasswordRule4(str) {
    const reg = /^\S{6,26}$/
    return reg.test(str)
}