// 引入joi模块
const Joi = require('joi');

// 定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(10).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2000).error(new Error('生日错了'))
};



async function run() {
    // 实施验证 返回promise对象
    try {
        await Joi.validate({
            username: 'ab',
            birth: 1900
        }, schema)
    } catch (er) {
        console.log(er.message);
        return;
    }
    console.log('验证通过');
}

run();