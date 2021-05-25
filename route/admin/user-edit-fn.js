// 引入用户集合的构造函数
const {
    User,
    validateUser
} = require('../../model/user')
// 引入加密模块
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {

    // 实施验证
    try {
        await validateUser(req.body);
    } catch (ex) {
        // 验证没有通过
        // ex.message
        // 重定向回用户添加页面
        // res.redirect(`/admin/user-edit?message=${ex.message}`);
        // console.log(ex.message);
        // JSON.stringify() 将对象类型转换为字符串数据类型
        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: ex.message,
        }));
    }
    // 验证通过 符合规则 执行到此行
    // 根据邮箱地址 查询用户是否存在
    let user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        // 如果用户已经存在 邮箱地址已经被别人占用
        // res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: '邮箱地址已经被占用',
        }));
        // 重定向相当于已经做了 res.end操作 所以必须return
    }
    // 用户没问题 可以做添加操作
    // 对密码进行加密处理
    // 1.生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 2.加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 将用户信息添加到数据库当中
    await User.create(req.body);
    // 将页面重定向回用户列表页面
    res.redirect('/admin/user');
}