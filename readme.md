# 字段校验工具
- 使用[async-validator](https://www.npmjs.com/package/async-validator)进行校验
- 返回Promise

## usage
```js
let Validate = require('@laomu/validate')
let rules = {
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
};

let validator = new Validate(rules);

validator
    .validate({username: '123', password: '123'})
    .catch(err => {
        console.log(err);
    });
/*** 将输出错误
[ { message: '请输入6到10位字符', field: 'username' },
  { message: '请输入6到10位字符', field: 'password' } ]
***/
```

### api
* new Validate(rules) 生成新的校验程序实例
* instance.validate(data) 校验数据，返回一个promise
* instance.validExist(data) 校验数据中存在的属性（可枚举并在rules中定义过）
* instance.validAttr(data, attr) 校验一个属性, 例如validAttrs(data, 'username')
* instance.validAttrs(data, attrs) 校验属性列表，例如validAttrs(data, ['username', 'password'])
