/**
 * 测试函数
 */
const assert = require('assert');
const Validate = require('../index');
const rules = require('./rules');
const validator = new Validate(rules);

// 校验全部属性
validator
    .validate({})
    .then(error('valid-1'))
    .catch(catchError(rules.username[0].message));

validator
    .validate({password: '123'})
    .then(error('email'))
    .catch(catchError(rules.username[0].message));

validator
    .validate({username: '123', password: '123'})
    .then(error('email'))
    .catch(catchError(rules.username[1].message));


validator
    .validate({username: '123456'})
    .then(error('email'))
    .catch(catchError(rules.password[0].message));

// 只校验存在属性
validator
    .validExist({username: '123456'});


validator
    .validAttr({username: '123456'}, 'username');

validator.validAttr({email: '123456'}, 'email')
    .then(error('email'))
    .catch(catchError(rules.email[0].message));

let obj = validator.filter({email: '123', abc: 'ddd'});
assert.equal(obj.abc, undefined);


function catchError(msg) {
    return function(err) {
        console.log(err);
        try {
            assert.equal(err[0].message, msg);
        }
        catch(e) {
            console.error(err);
            console.error(e);
        }
    }
}

function error(msg) {
    return function() {
        console.error('Error:', msg || '...');
    }
}