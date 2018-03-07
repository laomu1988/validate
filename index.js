/**
* @file 字段校验工具
*/
const Schema = require('async-validator');
Schema.prototype.pvalid = function (data) {
    return new Promise((resolve, reject) => {
        this.validate(data, (errors, fields) => {
            if (errors) {
                return reject(errors);
            }
            return resolve();
        });
    });
}

class Validator {
    constructor(rules) {
        this.rules = rules;
        this.schema = new Schema(rules);
    }
    /**
     * 校验数据是否符合rules规则
     * @param {Object} data 
     */
    validate(data) {
        return this.schema.pvalid(data);
    }

    /**
     * 只校验存在的属性，更新数据时使用
     * @param {*} data 
     */
    validExist(data) {
        let newRules = {};
        let rules = this.rules;
        for(var attr in data) {
            if(rules[attr]) {
                newRules[attr] = rules[attr];
            }
        }
        let valid = new Schema(newRules);
        return valid.pvalid(data);
    }


    /**
     * 校验某一个属性
     * @param {*} data 要校验的数据
     * @param {string} attr 要校验的属性名 
     */
    validAttr(data, attr) {
        let newRules = {};
        let rules = this.rules;
        if(rules[attr]) {
            newRules[attr] = rules[attr];
        }
        else {
            return Promise.resolve();
        }
        let valid = new Schema(newRules);
        return valid.pvalid(data);
    }

    /**
     * 校验多个属性
     * @param {*} data 要校验的数据
     * @param {array} attrs 要校验的属性名数组 
     */
    validAttrs(data, attrs) {
        let newRules = {};
        let rules = this.rules;
        attrs.forEach(attr => {
            if(rules[attr]) {
                newRules[attr] = rules[attr];
            }
        })
        let valid = new Schema(newRules);
        return valid.pvalid(data);
    }


    // 过滤属性，只有规则中定义的属性才会返回
    filter(data) {
        let rules = this.rules;
        let newData = {};
        for(let attr in data) {
            if(rules[attr]) {
                newData[attr] = data[attr];
            }
        }
        return newData;
    }
}

module.exports = Validator;