const {
    User
} = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    // 接收客户端传递过来的请求参数

    // 拿到的是post请求的参数
    const body = req.body;
    // 即将要修改的用户id
    const id = req.query.id;

    //res.send(body.password);
    let user = await User.findOne({
        _id: id
    })

    const isValid = await bcrypt.compare(body.password, user.password);
    // 密码比对
    if (isValid) {
        //密码比对成功
        // res.send('密码比对成功')
        // 将用户信息更新到数据库中
        await User.updateOne({
            _id: id
        }, {
            username: body.username,
            email: body.email,
            role: body.role,
            state: body.state,
        });

        // 将页面重定向到用户列表页面
        res.redirect('/admin/user')


    } else {
        // 密码比对失败
        // 触发错误处理中间件
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败,不能进行信息的修改',
            id: id,
        };
        next(JSON.stringify(obj));
    }

}