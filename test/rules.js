/**
 * @file 规则列表
 */

module.exports = {
    username: [
        {type: 'string', required: true, message: '请输入用户名'},
        {min: 6, max: 10, message: '请输入6到10位字符'},
    ],
    password: [
        {type: 'string', required: true, message: '请输入密码'},
        {min: 6, max: 10, message: '请输入6到10位字符'},
    ],
    email: [
        {type: 'email', message: '邮箱格式非法'}
    ]
}